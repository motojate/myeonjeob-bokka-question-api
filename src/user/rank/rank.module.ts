import { Module } from '@nestjs/common';
import { RankService } from './rank.service';
import { RankController } from './rank.controller';
import { UserModule } from '../user.module';

@Module({
  imports: [UserModule],
  providers: [RankService],
  controllers: [RankController],
})
export class RankModule {}
