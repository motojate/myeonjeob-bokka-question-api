import { Body, Controller, Post } from '@nestjs/common';
import { ManageService } from './manage.service';
import { Prisma } from '@prisma/client';

@Controller('manage')
export class ManageController {
  constructor(private readonly historyService: ManageService) {}

  @Post('/create')
  createHistory(@Body() historyDto: Prisma.QuestionLearningManageCreateInput) {
    return this.historyService.create(historyDto);
  }
}
