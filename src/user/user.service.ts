import { Injectable } from '@nestjs/common';
import { PrismaException } from 'src/shared/exceptions/prisma.exception';
import { PrismaService } from 'src/shared/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async findUser(dto: { userSeq: string }) {
    try {
      return this.prisma.user.findUnique({
        where: {
          userSeq: dto.userSeq,
        },
      });
    } catch (e) {
      throw new PrismaException(e);
    }
  }

  async initUser(dto: { userSeq: string }) {
    try {
      return this.prisma.user.create({
        data: {
          userSeq: dto.userSeq,
          rank: {
            create: {
              tier: 'BRONZE',
            },
          },
        },
      });
    } catch (e) {
      throw new PrismaException(e);
    }
  }
}
