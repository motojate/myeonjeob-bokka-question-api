import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from 'src/user/user.service';
import { PrismaService } from 'src/shared/prisma/prisma.service';

describe('UserService', () => {
  let userService: UserService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    // 모의 PrismaService 생성
    const mockPrismaService = {
      user: {
        findUnique: jest.fn().mockImplementation((dto) => {
          if (dto.where.userSeq === 'existing-user-seq') {
            return Promise.resolve({ name: 'existing-user-name' });
          } else {
            return Promise.resolve(null);
          }
        }),
      },
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        { provide: PrismaService, useValue: mockPrismaService },
      ],
    }).compile();

    userService = module.get<UserService>(UserService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('should find an existing username', async () => {
    const userSeq = 'existing-user-seq';
    const result = await userService.findUserName({ userSeq }).toPromise();
    expect(result).toEqual({ name: 'existing-user-name' });
  });

  // 여기에 더 많은 테스트 케이스를 추가할 수 있습니다.
});
