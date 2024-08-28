import { getDictionary, Locale } from '@/utils/translation/getDictionary';
import NotFoundClient from './NotFoundClient';

export default async function NotFound({
  params: { lang },
}: {
  params: { lang: Locale };
}) {
  const t = await getDictionary(lang);

  return <NotFoundClient t={t} />;
}
