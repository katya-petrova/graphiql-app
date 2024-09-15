import 'server-only';
import en from '@/utils/translation/dictionaries/en.json';

export type Locale = keyof typeof dictionaries;
export type Dictionary =
  typeof import('@/utils/translation/dictionaries/en.json');

const dictionaries = {
  en: (): Promise<typeof en> =>
    import('@/utils/translation/dictionaries/en.json').then(
      (module) => module.default
    ),
  ru: (): Promise<typeof en> =>
    import('@/utils/translation/dictionaries/ru.json').then(
      (module) => module.default
    ),
};

export const getDictionary = async (locale: string) => {
  if (!Object.keys(dictionaries).includes(locale)) return dictionaries['en']();
  return dictionaries[locale as Locale]();
};
