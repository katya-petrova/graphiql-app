import { NextRequest, NextResponse } from 'next/server';
import Negotiator from 'negotiator';
import { match } from '@formatjs/intl-localematcher';

let locales = ['en', 'ru'];
let defaultLocale = 'en';
const cookieName = 'i18nlang';
const PUBLIC_FILE = /\.(.*)$/;

function getLocale(request: NextRequest) {
  if (request.cookies.has(cookieName)) {
    return request.cookies.get(cookieName)!.value;
  }

  const acceptLang = request.headers.get('Accept-Language');
  if (!acceptLang) return defaultLocale;
  const headers = { 'accept-language': acceptLang };
  const languages = new Negotiator({ headers }).languages();
  return match(languages, locales, defaultLocale);
}

export function middleware(request: NextRequest) {
  if (PUBLIC_FILE.test(request.nextUrl.pathname)) {
    return;
  }

  if (request.nextUrl.pathname.startsWith('/_next')) return NextResponse.next();

  const { pathname } = request.nextUrl;
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) return;

  const locale = getLocale(request);
  request.nextUrl.pathname = `/${locale}${pathname}`;
  const response = NextResponse.redirect(request.nextUrl);

  response.cookies.set(cookieName, locale);
  return response;
}

export const config = {
  matcher: ['/((?!_next).*)'],
};
