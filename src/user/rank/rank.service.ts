import { Injectable } from '@nestjs/common';
import { PrismaException } from 'src/shared/exceptions/prisma.exception';
import { PrismaService } from 'src/shared/prisma/prisma.service';

@Injectable()
export class RankService {
  constructor(private readonly prisma: PrismaService) {}

  async findUserRank(dto: { userSeq: string }) {
    try {
      const userRank = await this.prisma.rank.findUnique({
        where: {
          userSeq: dto.userSeq,
        },
        include: {
          rankTier: true,
        },
      });
      const ranks = await this.prisma.rank.findMany({
        where: {
          tier: userRank.tier,
        },
        include: {
          rankTier: true,
        },
      });
      return {
        userTier: userRank,
        ranks: ranks,
      };
    } catch (e) {
      throw new PrismaException(e);
    }
  }
}
