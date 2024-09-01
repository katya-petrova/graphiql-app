import { describe, it, expect, vi } from 'vitest';
import { getDictionary, Locale } from './getDictionary';

vi.mock('../../../public/dictionaries/en.json', () => ({
  default: { greeting: 'Hello' },
}));

vi.mock('../../../public/dictionaries/ru.json', () => ({
  default: { greeting: 'Привет' },
}));

describe('getDictionary', async () => {
  it('should return the English dictionary when locale is "en"', async () => {
    const locale: Locale = 'en';
    const dictionary = await getDictionary(locale);

    expect(dictionary).toEqual({ greeting: 'Hello' });
  });

  it('should return the Russian dictionary when locale is "ru"', async () => {
    const locale: Locale = 'ru';
    const dictionary = await getDictionary(locale);

    expect(dictionary).toEqual({ greeting: 'Привет' });
  });
});
