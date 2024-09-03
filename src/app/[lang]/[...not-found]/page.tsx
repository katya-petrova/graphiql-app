// page.tsx
import { getDictionary, Locale } from '@/utils/translation/getDictionary';
import { Link } from '@/components/Link';

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
          variant="primary"
          className="mt-8 md:mt-16 px-8 md:px-20"
        >
          {notFound.links.home}
        </Link>
      </div>
    </div>
  );
}
