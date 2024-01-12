import { Injectable } from '@nestjs/common';
import { Friend, Prisma } from '@prisma/client';
import { Observable } from 'rxjs';
import { CrudService } from 'src/shared/abstracts/crud.abstarct';

@Injectable()
export class FriendService extends CrudService<
  Friend,
  Prisma.FriendCreateInput,
  Prisma.FriendUpdateInput
> {
  create(dto: Prisma.FriendCreateInput): Observable<Friend> {
    throw new Error('Method not implemented.');
  }
  findAll(): Observable<Pick<Friend, 'friendUserSeq'>[]> {
    throw new Error('Method not implemented.');
  }
  findOne(id: number): Observable<{
    friendUserSeq: string;
    userSeq: string;
    createdAt: Date;
    updatedAt: Date;
  }> {
    throw new Error('Method not implemented.');
  }
  update(
    id: number,
    dto: Prisma.FriendUpdateInput,
  ): Observable<{
    friendUserSeq: string;
    userSeq: string;
    createdAt: Date;
    updatedAt: Date;
  }> {
    throw new Error('Method not implemented.');
  }
  delete(id: number): Observable<{
    friendUserSeq: string;
    userSeq: string;
    createdAt: Date;
    updatedAt: Date;
  }> {
    throw new Error('Method not implemented.');
  }
}
