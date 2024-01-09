import { Injectable } from '@nestjs/common';
import { from, map } from 'rxjs';
import { PrismaService } from 'src/shared/prisma/prisma.service';

@Injectable()
export class RankService {
  constructor(private readonly prisma: PrismaService) {}

  findRank(dto: { userSeq: string }) {
    return from(
      this.prisma.rank.findUnique({ where: { userSeq: dto.userSeq } }),
    ).pipe(
      map((data) => {
        if (!data)
          return this.prisma.rank.create({
            data: { userSeq: dto.userSeq },
            select: {
              tier: true,
              score: true,
              reBirth: true,
            },
          });
        else
          return {
            tier: data.tier,
            score: data.score,
            reBirth: data.reBirth,
          };
      }),
    );
  }
}
