import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
async function main() {
  const tags = [
    {
      tagHex: '04:6b:2e:52:a1:40:80',
      name: 'Talon Grayson',
      lightRGB: '128,0,255'
    },
    {
      tagHex: '04:34:e4:02:2b:49:81',
      name: 'Dr Doom',
      lightRGB: '179,255,0'
    },
    {
      tagHex: '04:28:82:22:bf:48:80',
      name: 'Mega Man',
      lightRGB: '0,153,255'
    },
    {
      tagHex: '04:8b:43:ca:a4:6c:80',
      name: 'Guy Chapman',
      lightRGB: '128,246,255'
    },
    {
      tagHex: '04:1f:c5:e2:3c:35:80',
      name: 'Jack Sparrow',
      lightRGB: '255,0,0'
    },
    {
      tagHex: '04:8e:93:52:d8:6d:80',
      name: 'Poogie',
      lightRGB: '255,158,210'
    },
    {
      tagHex: '04:26:fa:52:ef:4a:81',
      name: 'Chester Hassenpfeffer',
      lightRGB: '255,174,0'
    },
    {
      tagHex: '04:e5:2a:fa:f9:43:80',
      name: 'Boba Fett',
      lightRGB: '255,77,0'
    },
    {
      tagHex: '04:9d:d0:52:ef:4a:80',
      name: 'Shot',
      lightRGB: '255,162,0'
    },
  ]

  tags.forEach(async (tag) => {
    await prisma.tags.upsert({
      where: { tagHex: tag.tagHex },
      update: tag,
      create: tag,
    })
  })
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })