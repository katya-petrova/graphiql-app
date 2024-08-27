'use client';
import { Dictionary } from '@/utils/translation/getDictionary';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

type NotFoundClientProps = {
  t: Dictionary['notFound'];
};

export default function NotFoundClient({ t }: NotFoundClientProps) {
  const router = useRouter();

  return (
    <div className="flex flex-col justify-center items-center">
      <h2 className="text-2xl">{t.title}</h2>
      <p className="mt-6">{t.description}</p>
      <div className="flex gap-4 mb-auto">
        <Link
          href={'/'}
          className="grow-0 mt-8 border border-blue-500 rounded px-4 py-2 hover:border-blue-700 text-blue-500 hover:text-blue-700 transition ease-in-out duration-150 hover:bg-transparent text-center"
        >
          {t.links.home}
        </Link>
      </div>
    </div>
  );
}
