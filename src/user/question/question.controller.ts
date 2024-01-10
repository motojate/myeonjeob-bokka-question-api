import { Controller, Get, Query, Req, UseGuards } from '@nestjs/common';
import { TokenGuard } from 'src/shared/guards/token.guard';
import { AuthenticationExpressRequest } from 'src/shared/types/common.type';
import { QuestionService } from './question.service';
import { forkJoin, map } from 'rxjs';

@Controller('question')
export class QuestionController {
  constructor(private readonly questionService: QuestionService) {}
  @Get()
  @UseGuards(TokenGuard)
  getQuestion(
    @Req() req: AuthenticationExpressRequest,
    @Query('count') count: number,
  ) {
    return forkJoin({
      question: this.questionService.getQuestion(count, req.userSeq),
    });
  }
}
