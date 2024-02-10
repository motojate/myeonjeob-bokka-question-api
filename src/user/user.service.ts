import { Injectable } from '@nestjs/common';
import { Observable, from, map, mergeMap, of, retry, throwError } from 'rxjs';
import { USER_RANDOM_NAME } from 'src/shared/constants/data.constant';
import { InUsedUserNameException } from 'src/shared/exceptions/auth.exception';
import { PrismaService } from 'src/shared/prisma/prisma.service';
import { UserNameInterface } from 'src/shared/types/user.type';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  private generateUserName(): string {
    const randomName =
      USER_RANDOM_NAME[Math.floor(Math.random() * USER_RANDOM_NAME.length)];
    const randomNumber = Math.floor(Math.random() * 10000000);
    const formattedNumber = randomNumber.toString().padStart(7, '0');
    return `${randomName}${formattedNumber}`;
  }

  private checkUserNameUnique(userName: string): Observable<boolean> {
    return from(this.prisma.user.count({ where: { name: userName } })).pipe(
      map((count) => count === 0),
    );
  }

  findUserName(dto: { userSeq: string }): Observable<UserNameInterface> {
    return from(
      this.prisma.user.findUnique({
        where: {
          userSeq: dto.userSeq,
        },
        select: {
          name: true,
        },
      }),
    ).pipe(
      mergeMap((user) => {
        if (user) return of({ name: user.name });
        else return this.retryGenerateUserName(dto);
      }),
    );
  }

  private initUser(dto: {
    name: string;
    userSeq: string;
  }): Observable<UserNameInterface> {
    return from(
      this.prisma.user.create({
        data: {
          userSeq: dto.userSeq,
          name: dto.name,
          rank: {
            create: {
              tier: 'BRONZE',
            },
          },
        },
        select: {
          name: true,
        },
      }),
    );
  }

  private retryGenerateUserName(dto: {
    userSeq: string;
  }): Observable<UserNameInterface> {
    const maxRetries = 3;

    return of(null).pipe(
      mergeMap(() => {
        return this.createUniqueUserName(dto).pipe(retry(maxRetries));
      }),
    );
  }

  private createUniqueUserName(dto: {
    userSeq: string;
  }): Observable<UserNameInterface> {
    return of(dto).pipe(
      map((dto) => ({
        ...dto,
        name: this.generateUserName(),
      })),
      mergeMap((dtoWithName) => {
        return this.checkUserNameUnique(dtoWithName.name).pipe(
          mergeMap((isUnique) =>
            isUnique
              ? this.initUser({
                  name: dtoWithName.name,
                  userSeq: dto.userSeq,
                })
              : throwError(() => new InUsedUserNameException()),
          ),
        );
      }),
    );
  }
}
