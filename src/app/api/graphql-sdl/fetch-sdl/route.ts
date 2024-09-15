import { getIntrospectionQuery } from 'graphql';

export async function POST(req: Request) {
  const { sdlUrl, headers } = await req.json();

  const introspectionQuery = getIntrospectionQuery();

  try {
    const response = await fetch(sdlUrl, {
      method: 'POST',
      headers: {
        ...headers,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: introspectionQuery,
      }),
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch SDL data: ${response.statusText}`);
    }

    const json = await response.json();

    if (!json.data) {
      throw new Error('No SDL data found');
    }

    return new Response(JSON.stringify(json.data), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ message: (error as Error).message }), {
      status: 500,
    });
  }
}
