import { Injectable } from '@nestjs/common';
import { Prisma, QuestionLearningManage } from '@prisma/client';
import { Observable, from } from 'rxjs';
import { CrudService } from 'src/shared/abstracts/crud.abstarct';
import { PrismaService } from 'src/shared/prisma/prisma.service';

@Injectable()
export class ManageService extends CrudService<
  QuestionLearningManage,
  Prisma.QuestionLearningManageCreateInput,
  Prisma.QuestionLearningManageUpdateInput
> {
  create(dto: Prisma.QuestionLearningManageCreateInput): Observable<{
    userSeq: string;
    questionSeq: string;
    score: number;
    retryCount: number;
    isShow: boolean;
    createdAt: Date;
    updatedAt: Date;
  }> {
    throw new Error('Method not implemented.');
  }
  findAll(): Observable<
    {
      userSeq: string;
      questionSeq: string;
      score: number;
      retryCount: number;
      isShow: boolean;
      createdAt: Date;
      updatedAt: Date;
    }[]
  > {
    throw new Error('Method not implemented.');
  }
  findOne(id: number): Observable<{
    userSeq: string;
    questionSeq: string;
    score: number;
    retryCount: number;
    isShow: boolean;
    createdAt: Date;
    updatedAt: Date;
  }> {
    throw new Error('Method not implemented.');
  }
  update(
    id: number,
    dto: Prisma.QuestionLearningManageUpdateInput,
  ): Observable<{
    userSeq: string;
    questionSeq: string;
    score: number;
    retryCount: number;
    isShow: boolean;
    createdAt: Date;
    updatedAt: Date;
  }> {
    throw new Error('Method not implemented.');
  }
  delete(id: number): Observable<{
    userSeq: string;
    questionSeq: string;
    score: number;
    retryCount: number;
    isShow: boolean;
    createdAt: Date;
    updatedAt: Date;
  }> {
    throw new Error('Method not implemented.');
  }
  constructor(private readonly prisma: PrismaService) {
    super();
  }
}