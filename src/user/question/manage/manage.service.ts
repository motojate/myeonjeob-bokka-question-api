import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { Observable } from 'rxjs';
import { PrismaService } from 'src/shared/prisma/prisma.service';

@Injectable()
export class ManageService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: Prisma.QuestionLearningManageCreateInput) {
    console.log(dto);
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
}
