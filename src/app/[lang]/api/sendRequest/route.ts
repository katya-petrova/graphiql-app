import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const { method, endpoint, headers, body } = await request.json();

  try {
    const res = await fetch(endpoint, {
      method,
      headers: Object.fromEntries(headers),
      body: method !== 'GET' && method !== 'HEAD' ? body : undefined,
    });

    const data = await res.json();
    const responseHeaders = Object.fromEntries(res.headers.entries());

    return NextResponse.json({
      status: res.status,
      statusText: res.statusText,
      headers: responseHeaders,
      data,
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    } else {
      return NextResponse.json(
        { error: 'An unknown error occurred' },
        { status: 500 }
      );
    }
  }
}
