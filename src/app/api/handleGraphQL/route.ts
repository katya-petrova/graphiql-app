import { NextResponse } from 'next/server';
import atob from 'atob';

export async function GET(request: Request) {
  const url = new URL(request.url);
  const endpointUrlBase64encoded = url.searchParams.get(
    'endpointUrlBase64encoded'
  );
  const bodyBase64encoded = url.searchParams.get('bodyBase64encoded');

  if (!endpointUrlBase64encoded || !bodyBase64encoded) {
    return NextResponse.json(
      { error: 'Missing query parameters' },
      { status: 400 }
    );
  }

  try {
    const endpointUrl = atob(endpointUrlBase64encoded);
    const body = JSON.parse(atob(bodyBase64encoded));

    const response = await fetch(endpointUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    const result = await response.json();
    return NextResponse.json(result, { status: response.status });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
