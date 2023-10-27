import { PrismaClient } from '@prisma/client'
import { hash } from 'bcrypt'

const prisma = new PrismaClient()

async function main() {
  const password = await hash('test@1234', 12)
  const user = await prisma.user.upsert({
    where: { email: 'rajanverma5410@gmail.com' },
    update: {},
    create: {
      email: 'rajanverma5410@gmail.com',
      name: 'Rajan Verma',
      password
    }
  })
}
main()
  .then(() => console.log('Seeded successfully'))
  .catch((e) =>  console.error(e))
  .finally(async() => {
     await prisma.$disconnect();
     process.exit(1)
  })
