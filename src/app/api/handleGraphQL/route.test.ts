import { describe, it, expect, vi } from 'vitest';
import fetchMock from 'fetch-mock';
import { GET } from './route';

vi.mock('next/server', () => ({
  NextResponse: {
    json: vi.fn().mockImplementation((body, opts = { status: 200 }) => ({
      json: async () => body,
      status: opts.status,
      statusText: opts.status === 200 ? 'OK' : 'Internal Server Error',
    })),
  },
}));

describe('GET function tests', () => {
  beforeEach(() => {
    fetchMock.restore();
  });

  it('should handle valid GET request and return fetched data', async () => {
    const mockUrl = 'https://example.com/';
    const mockBody = JSON.stringify({ key: 'value' });
    const encodedUrl = btoa(mockUrl);
    const encodedBody = btoa(mockBody);

    fetchMock.post(mockUrl, { response: { result: 'success' } });

    const request = new Request(
      `http://localhost/api?endpointUrlBase64encoded=${encodedUrl}&bodyBase64encoded=${encodedBody}`
    );

    const response = await GET(request);
    const jsonResponse = await response.json();

    expect(response.status).toBe(200);
    expect(jsonResponse).toEqual({ response: { result: 'success' } });
    expect(fetchMock.calls().length).toBe(1);
    expect(fetchMock.lastCall()![0]).toBe(mockUrl);
    expect(fetchMock.lastCall()![1]).toEqual({
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: mockBody,
    });
  });

  it('should return 400 if missing query parameters', async () => {
    const request = new Request('http://localhost/api');

    const response = await GET(request);
    const jsonResponse = await response.json();

    expect(response.status).toBe(400);
    expect(jsonResponse).toEqual({ error: 'Missing query parameters' });
  });

  it('should return 500 if fetch fails', async () => {
    const mockUrl = 'https://example.com';
    const encodedUrl = btoa(mockUrl);
    const encodedBody = btoa(JSON.stringify({ key: 'value' }));

    fetchMock.post(mockUrl, () => {
      throw new Error('Fetch error');
    });

    const request = new Request(
      `http://localhost/api?endpointUrlBase64encoded=${encodedUrl}&bodyBase64encoded=${encodedBody}`
    );

    const response = await GET(request);
    const jsonResponse = await response.json();

    expect(response.status).toBe(500);
    expect(jsonResponse).toEqual({ error: 'Internal Server Error' });
  });
});
