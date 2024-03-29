import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './shared/prisma/prisma.module';
import { RankModule } from './user/rank/rank.module';
import { ConfigModule } from '@nestjs/config';
import { HistoryModule } from './user/question/manage/manage.module';
import { QuestionModule } from './user/question/question.module';
import { FriendModule } from './user/friend/friend.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    PrismaModule,
    RankModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    HistoryModule,
    QuestionModule,
    FriendModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
