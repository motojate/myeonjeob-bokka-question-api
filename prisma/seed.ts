import { PrismaClient, Tier } from '@prisma/client';

const prisma = new PrismaClient();

const TIER_INIT_DATA: { tier: Tier; tierName: string }[] = [
  {
    tier: 'BRONZE',
    tierName: '브론즈',
  },
  {
    tier: 'SILVER',
    tierName: '실버',
  },
  {
    tier: 'GOLD',
    tierName: '골드',
  },
  {
    tier: 'DIAMOND',
    tierName: '다이아몬드',
  },
  {
    tier: 'MASTER',
    tierName: '마스터',
  },
];

async function main() {
  await prisma.rankTier.createMany({
    data: TIER_INIT_DATA,
    skipDuplicates: true,
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
