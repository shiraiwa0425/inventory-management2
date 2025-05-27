import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  const password = 'admin123'
  const passwordHash = await bcrypt.hash(password, 10)

  const admin = await prisma.admin.upsert({
    where: { username: 'admin' },
    update: {},
    create: {
      username: 'admin',
      password_hash: passwordHash,
      name: '管理者',
    },
  })

  console.log('管理者ユーザーを作成しました:')
  console.log('ユーザー名: admin')
  console.log(`パスワード: ${password}`)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  }) 