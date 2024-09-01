import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { method, endpoint, headers, body } = await request.json();

    if (!method || !endpoint) {
      throw new Error('Method and endpoint are required.');
    }

    let parsedBody: string | undefined = undefined;

    if (method !== 'GET' && method !== 'HEAD') {
      try {
        const bodyObject = JSON.parse(body);
        parsedBody = JSON.stringify(bodyObject);
      } catch {
        parsedBody = body;
      }
    }

    console.log('Parsed Body:', parsedBody);

    const res = await fetch(endpoint, {
      method,
      headers: Object.fromEntries(headers),
      body: parsedBody,
    });

    const responseData = await res.text();

    let data;
    try {
      data = JSON.parse(responseData);
    } catch {
      data = responseData;
    }

    const responseHeaders = Object.fromEntries(res.headers.entries());

    return NextResponse.json({
      status: res.status,
      statusText: res.statusText,
      headers: responseHeaders,
      data,
    });
  } catch (error: unknown) {
    let errorMessage = 'An unknown error occurred';
    if (error instanceof Error) {
      errorMessage = error.message;
      if (error.name === 'TypeError') {
        errorMessage = 'Network error or invalid URL.';
      }
    }

    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
