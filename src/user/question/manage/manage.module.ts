import { Module } from '@nestjs/common';
import { ManageController } from './manage.controller';
import { ManageService } from './manage.service';
import { PrismaService } from 'src/shared/prisma/prisma.service';

@Module({
  controllers: [ManageController],
  providers: [ManageService, PrismaService],
})
export class HistoryModule {}
