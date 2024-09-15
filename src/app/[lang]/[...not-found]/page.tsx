// page.tsx
import { getDictionary, Locale } from '@/utils/translation/getDictionary';
import Link from 'next/link';

export default async function NotFound({
  params: { lang },
}: {
  params: { lang: string };
}) {
  const locale: Locale = ['en', 'ru'].includes(lang) ? (lang as Locale) : 'en';
  const { notFound } = await getDictionary(locale);

  return (
    <div className="flex flex-col justify-center items-center">
      <h2 className="text-2xl">{notFound.title}</h2>
      <p className="mt-6">{notFound.description}</p>
      <div className="flex gap-4 mb-auto">
        <Link
          href={'/'}
          className="grow-0 mt-8 border border-blue-500 rounded px-4 py-2 hover:border-blue-700 text-blue-500 hover:text-blue-700 transition ease-in-out duration-150 hover:bg-transparent text-center"
        >
          {notFound.links.home}
        </Link>
      </div>
    </div>
  );
}
