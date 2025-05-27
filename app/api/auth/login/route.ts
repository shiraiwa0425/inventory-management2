import { NextResponse } from 'next/server'
import { login } from '@/lib/auth'
import { cookies } from 'next/headers'

export async function POST(request: Request) {
  try {
    console.log('APIリクエスト受信')
    const body = await request.json()
    console.log('リクエストボディ:', body)
    const admin = await login(body.username, body.password)
    console.log('ログイン成功:', admin)
    const cookieStore = cookies()
    cookieStore.set('session', admin.id.toString(), {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
    })

    return NextResponse.json(admin)
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json(
        { message: error.message },
        { status: 401 }
      )
    }
    return NextResponse.json(
      { message: '認証に失敗しました' },
      { status: 500 }
    )
  }
} 