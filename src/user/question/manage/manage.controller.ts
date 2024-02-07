import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { ManageService } from './manage.service';
import { Prisma } from '@prisma/client';
import { TokenGuard } from 'src/shared/guards/token.guard';
import { AuthenticationExpressRequest } from 'src/shared/types/common.type';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('manage')
@Controller('manage')
export class ManageController {
  constructor(private readonly historyService: ManageService) {}

  @Post('create')
  @UseGuards(TokenGuard)
  @ApiResponse({ status: 200, description: '학습 이력 저장' })
  createHistory(
    @Req() req: AuthenticationExpressRequest,
    @Body() historyDto: Prisma.QuestionLearningManageCreateInput,
  ) {
    return this.historyService.create(historyDto);
  }
}
