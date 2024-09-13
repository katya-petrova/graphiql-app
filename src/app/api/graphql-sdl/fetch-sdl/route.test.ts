import { vi } from 'vitest';
import { POST } from './route';

describe('POST handler', () => {
  beforeEach(() => {
    globalThis.fetch = vi.fn();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should return SDL data on successful fetch', async () => {
    const mockSDLData = { data: { __schema: {} } };
    globalThis.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockSDLData),
      })
    ) as unknown as typeof fetch;

    const request = new Request('https://example.com', {
      method: 'POST',
      body: JSON.stringify({ sdlUrl: 'https://valid-url.com', headers: {} }),
    });

    const response = await POST(request);

    const result = await response.json();
    expect(response.status).toBe(200);
    expect(result).toEqual(mockSDLData.data);
  });

  it('should return 500 when fetch fails with status', async () => {
    globalThis.fetch = vi.fn(() =>
      Promise.resolve({
        ok: false,
        statusText: 'Internal Server Error',
      })
    ) as unknown as typeof fetch;

    const request = new Request('https://example.com', {
      method: 'POST',
      body: JSON.stringify({ sdlUrl: 'https://invalid-url.com', headers: {} }),
    });

    const response = await POST(request);
    const result = await response.json();

    expect(response.status).toBe(500);
    expect(result.message).toBe(
      'Failed to fetch SDL data: Internal Server Error'
    );
  });

  it('should return 500 when no SDL data is found', async () => {
    globalThis.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({}),
      })
    ) as unknown as typeof fetch;

    const request = new Request('https://example.com', {
      method: 'POST',
      body: JSON.stringify({ sdlUrl: 'https://valid-url.com', headers: {} }),
    });

    const response = await POST(request);
    const result = await response.json();

    expect(response.status).toBe(500);
    expect(result.message).toBe('No SDL data found');
  });

  it('should return 500 when fetch throws an error', async () => {
    globalThis.fetch = vi.fn(() => {
      throw new Error('Network error');
    });

    const request = new Request('https://example.com', {
      method: 'POST',
      body: JSON.stringify({ sdlUrl: 'https://valid-url.com', headers: {} }),
    });

    const response = await POST(request);
    const result = await response.json();

    expect(response.status).toBe(500);
    expect(result.message).toBe('Network error');
  });
});
