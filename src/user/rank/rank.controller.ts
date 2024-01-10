import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { TokenGuard } from 'src/shared/guards/token.guard';
import { RankService } from './rank.service';
import { AuthenticationExpressRequest } from 'src/shared/types/common.type';

@Controller('rank')
export class RankController {
  constructor(private readonly rankService: RankService) {}
  @Get()
  @UseGuards(TokenGuard)
  findRank(@Req() req: AuthenticationExpressRequest) {
    return this.rankService.findRank({ userSeq: req.userSeq });
  }
}
