import { describe, it, expect, vi } from 'vitest';
import { NextRequest, NextResponse } from 'next/server';
import { i18nCookieName, middleware } from './middleware';

vi.mock('negotiator', () => ({
  default: vi.fn().mockImplementation(() => ({
    mediaType: vi.fn(),
    mediaTypes: vi.fn(),
    language: vi.fn().mockReturnValue('ru'),
    languages: vi.fn().mockReturnValue(['ru', 'en']),
    charset: vi.fn(),
    charsets: vi.fn(),
    encoding: vi.fn(),
    encodings: vi.fn(),
  })),
}));

vi.mock('@formatjs/intl-localematcher', () => ({
  match: vi.fn().mockReturnValue('ru'),
}));

describe('middleware', () => {
  it('should redirect based on Accept-Language header when no cookie is present', () => {
    const request = {
      nextUrl: new URL('http://localhost/'),
      cookies: {
        has: vi.fn().mockReturnValue(false),
      },
      headers: {
        get: vi.fn().mockReturnValue('ru-RU,ru;q=0.9,en;q=0.8'),
      },
      geo: {},
      ip: '',
    } as unknown as NextRequest;

    const response = middleware(request);

    expect(response).toBeInstanceOf(NextResponse);
    expect(response.headers.get('Location')).toBe('http://localhost/ru/');
  });

  it('should not redirect and set the locale cookie when the path includes a locale', () => {
    const request = {
      nextUrl: new URL('http://localhost/ru/some-page'),
      cookies: {
        has: vi.fn(),
        get: vi.fn(() => undefined),
      },
      headers: {
        get: vi.fn(),
      },
      geo: {},
      ip: '',
    } as unknown as NextRequest;

    const response = middleware(request);

    expect(response.cookies.get(i18nCookieName)).toEqual({
      name: i18nCookieName,
      value: 'ru',
      path: '/',
    });

    expect(response.status).toEqual(200);
    expect(response).toBeInstanceOf(NextResponse);
  });

  it('should not redirect for public files', () => {
    const request = {
      nextUrl: new URL('http://localhost/file.js'),
      cookies: {
        has: vi.fn(),
      },
      headers: {
        get: vi.fn(),
      },
      geo: {},
      ip: '',
    } as unknown as NextRequest;

    const response = middleware(request);

    expect(response).toBeInstanceOf(NextResponse);
  });
});
