import { Module } from '@nestjs/common';
import { RankService } from './rank.service';
import { RankController } from './rank.controller';
import { PrismaService } from 'src/shared/prisma/prisma.service';
import { UserService } from '../user.service';

@Module({
  providers: [RankService, PrismaService, UserService],
  controllers: [RankController],
})
export class RankModule {}
