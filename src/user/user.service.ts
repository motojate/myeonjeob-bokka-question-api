import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { Observable, catchError, from, mergeMap, of, throwError } from 'rxjs';
import { PrismaException } from 'src/shared/exceptions/prisma.exception';
import { PrismaService } from 'src/shared/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  findUser(dto: { userSeq: string }): Observable<User | null> {
    return from(
      this.prisma.user.findUnique({
        where: {
          userSeq: dto.userSeq,
        },
      }),
    );
  }

  initUser(dto: { userSeq: string }): Observable<User> {
    return this.findUser(dto).pipe(
      mergeMap((user) => {
        if (user) return of(user);
        return from(
          this.prisma.user.create({
            data: {
              userSeq: dto.userSeq,
              rank: {
                create: true,
              },
            },
          }),
        );
      }),
      catchError((err) => throwError(() => new PrismaException(err))),
    );
  }

  updateUserName(dto: { userSeq: string; name: string }): Observable<User> {
    return from(
      this.prisma.user.update({
        where: {
          userSeq: dto.userSeq,
        },
        data: {
          name: dto.name,
        },
      }),
    );
  }
}
