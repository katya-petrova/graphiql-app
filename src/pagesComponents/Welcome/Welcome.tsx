'use client';

import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { Dictionary } from '@/utils/translation/getDictionary';

type WelcomeProps = { t: Dictionary['welcome'] };

const Welcome = ({ t }: WelcomeProps) => {
  const { isSignedIn } = useAuth();

  return (
    <>
      <section className="max-w-2xl text-base md:text-lg text-gray-400 space-y-6">
        <h1>{t.title}</h1>
        {t.description.map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </section>
      <div className="flex justify-center mt-20">
        <Link
          href={isSignedIn ? '/main' : '/signin'}
          className="border border-blue-500 rounded px-4 py-2 hover:border-blue-700 text-blue-500 hover:text-blue-700 transition ease-in-out duration-150 hover:bg-transparent w-64 text-center"
        >
          {t.link}
        </Link>
      </div>
    </>
  );
};

export default Welcome;
