import { Injectable } from '@nestjs/common';
import { PrismaException } from 'src/shared/exceptions/prisma.exception';
import { PrismaService } from 'src/shared/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async findUserName(dto: { userSeq: string }) {
    return this.prisma.user.findUnique({
      where: {
        userSeq: dto.userSeq,
      },
      select: {
        name: true,
      },
    });
  }

  async initUser(dto: { name: string; userSeq: string }) {
    try {
      return this.prisma.user.create({
        data: {
          userSeq: dto.userSeq,
          name: dto.name,
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
