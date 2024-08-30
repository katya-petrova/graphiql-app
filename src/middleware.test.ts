import { describe, it, expect, vi } from 'vitest';
import { NextRequest, NextResponse } from 'next/server';
import { i18nCookieName, middleware } from './middleware';
import Negotiator from 'negotiator';
import { match } from '@formatjs/intl-localematcher';

vi.mock('negotiator');
vi.mock('@formatjs/intl-localematcher');

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
    } as unknown as NextRequest;

    (Negotiator as any).mockImplementation(() => ({
      languages: vi.fn().mockReturnValue(['ru', 'en']),
    }));
    (match as any).mockReturnValue('ru');

    const response = middleware(request);

    expect(response).toBeInstanceOf(NextResponse);
    expect(response?.headers.get('Location')).toBe('http://localhost/ru/');
  });

  it('should not redirect and set the locale cookie when the path includes a locale', () => {
    const request = {
      nextUrl: {
        pathname: '/ru/some-page',
      },
      cookies: {
        has: vi.fn(),
      },
      headers: {
        get: vi.fn(),
      },
    } as unknown as NextRequest;

    const response = middleware(request);

    expect(response.cookies.get(i18nCookieName)).toEqual({
      name: i18nCookieName,
      path: '/',
      value: 'ru',
    });

    expect(response.status).toBe(200);
    expect(response).toBeInstanceOf(NextResponse);
  });

  it('should not redirect for public files', () => {
    const request = {
      nextUrl: {
        pathname: '/file.js',
      },
      cookies: {
        has: vi.fn(),
      },
      headers: {
        get: vi.fn(),
      },
    } as unknown as NextRequest;

    const response = middleware(request);

    expect(response).toBeInstanceOf(NextResponse);
  });
});
