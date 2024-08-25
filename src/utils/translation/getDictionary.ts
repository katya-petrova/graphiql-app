import 'server-only';
import en from '../../../public/dictionaries/en.json';

export type Locale = 'en' | 'ru';
export type Dictionary = typeof import('../../../public/dictionaries/en.json');

const dictionaries = {
  en: (): Promise<typeof en> =>
    import('../../../public/dictionaries/en.json').then(
      (module) => module.default
    ),
  ru: (): Promise<typeof en> =>
    import('../../../public/dictionaries/ru.json').then(
      (module) => module.default
    ),
};

export const getDictionary = async (locale: Locale) => dictionaries[locale]();
