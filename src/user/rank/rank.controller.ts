import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { TokenGuard } from 'src/shared/guards/token.guard';
import { Request as ExpressRequest } from 'express';
import { RankService } from './rank.service';

@Controller('rank')
export class RankController {
  constructor(private readonly rankService: RankService) {}
  @Get()
  @UseGuards(TokenGuard)
  findRank(@Req() req: ExpressRequest & { userSeq: string }) {
    return this.rankService.findRank({ userSeq: req.userSeq });
  }
}
