import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { Observable, catchError, from, map, retry, throwError } from 'rxjs';
import { CrudService } from 'src/shared/abstracts/crud.abstarct';
import { PrismaService } from 'src/shared/prisma/prisma.service';

@Injectable()
export class UserService extends CrudService<User> {
  constructor(private readonly prisma: PrismaService) {
    super();
  }
  getAll(): Promise<User[]> {
    throw new Error('Method not implemented.');
  }
  getUnique(seq: string): Promise<{ userSeq: string }> {
    throw new Error('Method not implemented.');
  }
  create(dto: Partial<{ userSeq: string }>): Observable<{ userSeq: string }> {
    return from(
      this.prisma.user.create({
        data: {
          userSeq: dto.userSeq,
          rank: {
            create: {},
          },
        },
      }),
    ).pipe(
      retry(3),
      map((user) => user),
      catchError((err) => throwError(() => err)),
    );
  }
}
