import { Controller, Get, Query, Req, UseGuards } from '@nestjs/common';
import { TokenGuard } from 'src/shared/guards/token.guard';
import { AuthenticationExpressRequest } from 'src/shared/types/common.type';
import { QuestionService } from './question.service';
import { BaseResponse } from 'src/shared/responses/base.response';

@Controller('question')
export class QuestionController {
  constructor(private readonly questionService: QuestionService) {}

  @Get('re-view')
  @UseGuards(TokenGuard)
  async getQuestion(
    @Req() req: AuthenticationExpressRequest,
    @Query('count') count: number,
  ) {
    const result = await this.questionService.getReviewQuestion(
      count,
      req.userSeq,
    );
    if (result.length) return BaseResponse.success<string>(result);
    else return BaseResponse.emptyData(null);
  }
}
