import { Injectable } from '@nestjs/common';
import axios from 'axios';
import dayjs from 'dayjs';
import { from, map } from 'rxjs';
import { PrismaService } from 'src/shared/prisma/prisma.service';

@Injectable()
export class QuestionService {
  constructor(private readonly prisma: PrismaService) {}

  private getQuestionFromQuestionApi(dto: {
    isReview: boolean;
    count: number;
    questionSeqList: string[];
  }) {
    return from(axios.post('', dto));
  }

  getQuestion(count: number, userSeq: string) {
    return from(this.getReviewQuestion(count, userSeq)).pipe(
      map((questionSeqList) => {
        const dto: {
          isReview: boolean;
          count: number;
          questionSeqList: string[];
        } = {
          isReview: true,
          count: count,
          questionSeqList: questionSeqList,
        };
        return this.getQuestionFromQuestionApi(dto);
      }),
    );
  }

  async getReviewQuestion(count: number, userSeq: string) {
    const getReviewQuestionCount = Math.ceil(count * 0.6);
    const result = await this.prisma.questionLearningManage.findMany({
      where: {
        userSeq,
        isShow: true,
      },
      take: getReviewQuestionCount,
    });

    // const result = this.prisma.$queryRaw<string[]>(Prisma.sql`
    // select question_seq from bk_mb_question_learning_manage
    // where user_seq=${userSeq} and is_show=true and
    // score < 30 + DATEDIFF(now(), DATE(updated_at)) * 0.2;
    // `);

    return result.reduce((acc: string[], item) => {
      const today = dayjs();
      const dayPassed = today.diff(dayjs(item.updatedAt), 'day');
      const adjustedScore = item.score - dayPassed * 0.2;
      if (adjustedScore < 30) acc.push(item.questionSeq);
      return acc;
    }, []);
  }
}
