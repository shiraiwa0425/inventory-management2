import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

const prisma = new PrismaClient()

export async function login(username: string, password: string) {
  const admin = await prisma.admin.findUnique({
    where: { username },
  })

  if (!admin) {
    throw new Error('ユーザー名またはパスワードが正しくありません')
  }

  const isValid = await bcrypt.compare(password, admin.password_hash)
  if (!isValid) {
    throw new Error('ユーザー名またはパスワードが正しくありません')
  }

  return {
    id: admin.id,
    username: admin.username,
    name: admin.name,
  }
}

export async function getSession() {
  const cookieStore = cookies()
  const session = cookieStore.get('session')

  if (!session) {
    return null
  }

  try {
    const admin = await prisma.admin.findUnique({
      where: { id: parseInt(session.value) },
      select: {
        id: true,
        username: true,
        name: true,
      },
    })

    return admin
  } catch (error) {
    return null
  }
}

export async function requireAuth() {
  const session = await getSession()
  if (!session) {
    redirect('/login')
  }
  return session
} 