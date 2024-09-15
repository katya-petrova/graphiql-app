import { describe, it, expect, vi } from 'vitest';
import { getLangFromUrlOrCookie } from './getCurrentLanguage';

describe('getLangFromUrlOrCookie', () => {
  it('should return the language set in the URL', () => {
    const result = getLangFromUrlOrCookie('/fr/home');
    expect(result).toBe('fr');
  });

  it('should return the language set in the cookies when URL does not define language', () => {
    vi.stubGlobal('document', { cookie: 'i18nlang=es' });
    const result = getLangFromUrlOrCookie('/');
    expect(result).toBe('es');
  });

  it('should default to English if neither URL nor cookies define the language', () => {
    vi.stubGlobal('document', { cookie: '' });
    const result = getLangFromUrlOrCookie('/');
    expect(result).toBe('en');
  });

  it('should ignore other cookies and look only for i18nlang', () => {
    vi.stubGlobal('document', { cookie: 'anothercookie=test; i18nlang=de' });
    const result = getLangFromUrlOrCookie('/');
    expect(result).toBe('de');
  });
});
