import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { Observable, from } from 'rxjs';
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
    return from(
      this.prisma.user.create({
        data: {
          userSeq: dto.userSeq,
          rank: {
            create: {},
          },
        },
      }),
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
