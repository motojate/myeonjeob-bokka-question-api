import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './shared/prisma/prisma.module';
import { RankModule } from './user/rank/rank.module';

@Module({
  imports: [PrismaModule, RankModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
