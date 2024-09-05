import { describe, it, expect, vi } from 'vitest';
import { NextRequest } from 'next/server';
import fetchMock from 'fetch-mock';
import { POST } from './route';

vi.mock('next/server', () => ({
  NextRequest: vi.fn(),
  NextResponse: {
    json: vi.fn().mockImplementation((body, opts = { status: 200 }) => ({
      json: body,
      status: opts.status,
      statusText: opts.status === 200 ? 'OK' : 'Internal Server Error',
    })),
  },
}));

describe('POST function tests', () => {
  it('should handle valid POST request', async () => {
    const mockUrl = 'https://api.example.com/data';
    const mockBody = JSON.stringify({
      method: 'POST',
      endpoint: mockUrl,
      headers: [['Content-Type', 'application/json']],
      body: JSON.stringify({ key: 'value' }),
    });

    const request = {
      json: () => Promise.resolve(JSON.parse(mockBody)),
    } as unknown as NextRequest;

    fetchMock.post(mockUrl, { response: 'success' }, { overwriteRoutes: true });

    const response = await POST(request);

    expect(response).toEqual({
      json: {
        status: 200,
        statusText: 'OK',
        headers: { 'content-type': 'application/json', "content-length": "22", },
        data: { response: 'success' },
      },
      status: 200,
      statusText: 'OK',
    });

    fetchMock.restore();
  });

  it('should return error for bad request', async () => {
    const request = {
      json: () => Promise.resolve({
        method: '',
        endpoint: '',
      }),
    } as unknown as NextRequest;

    const response = await POST(request);

    expect(response).toEqual({
      json: { error: 'Method and endpoint are required.' },
      status: 500,
      statusText: 'Internal Server Error',
    });
  });
});