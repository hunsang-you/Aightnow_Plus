import { NextResponse } from 'next/server';

export async function GET() {
  const authURL = `${process.env.LLAMA_API_URL}auth/token`;
  const authBody = {
    username: process.env.LLAMA_USER_NAME!,
    password: process.env.LLAMA_PASSWORD!,
  };

  const param = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams(authBody),
  };

  try {
    const response = await fetch(authURL, param);
    const authData = await response.json();
    return NextResponse.json(authData);
  } catch (error) {
    console.error('Fetch failed', error);
    return NextResponse.json(
      { error: 'API 호출 실패' },
      { status: 500 },
    );
  }
}
