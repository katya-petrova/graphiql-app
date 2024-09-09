import Image from 'next/image';
import { Link } from '../Link';

export const Footer = () => {
  return (
    <footer className="bg-blue-600 text-white px-2 md:px-5 py-2 md:py-3">
      <div className="flex justify-between sm:grid sm:grid-cols-3 px-2 md:px-3 w-full text-center items-center">
        <div className="developers flex gap-2 md:gap-4">
          <Link
            className="rounded-full hover:opacity-80 transition-all"
            href="https://github.com/katya-petrova/"
            external
          >
            <Image
              src="/logos/github-logo.svg"
              alt="GitHub Logo"
              className="dark:invert"
              width={32}
              height={32}
            />
          </Link>
          <Link
            className="rounded-full hover:opacity-80 transition-all"
            href="https://github.com/guz86/"
            external
          >
            <Image
              src="/logos/github-logo.svg"
              alt="GitHub Logo"
              className="dark:invert"
              width={32}
              height={32}
            />
          </Link>
          <Link
            className="rounded-full hover:opacity-80 transition-all"
            href="https://github.com/krsisabi/"
            external
          >
            <Image
              src="/logos/github-logo.svg"
              alt="GitHub Logo"
              className="dark:invert"
              width={32}
              height={32}
            />
          </Link>
        </div>

        <p className="text-sm md:text-base">© 2024 GraphiQL</p>

        <Link
          className="rounded-full justify-self-end hover:opacity-80 transition-all"
          href="https://rs.school/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            src="/logos/rss-logo.svg"
            alt="RSS Logo"
            width={32}
            height={32}
            priority
          />
        </Link>
      </div>
    </footer>
  );
};
