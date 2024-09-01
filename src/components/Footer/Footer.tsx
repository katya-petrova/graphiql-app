import Image from 'next/image';

export const Footer = () => {
  return (
    <footer className="bg-blue-600 text-white py-2 md:py-3">
      <div className="px-2 md:px-3 w-full text-center flex justify-between items-center">
        <div className="developers flex gap-4">
          <a className="rounded-md" href="https://github.com/katya-petrova/">
            <Image
              src="/logos/github-logo.svg"
              alt="GitHub Logo"
              className="dark:invert"
              width={32}
              height={32}
            />
          </a>
          <a className="rounded-md" href="https://github.com/guz86/">
            <Image
              src="/logos/github-logo.svg"
              alt="GitHub Logo"
              className="dark:invert"
              width={32}
              height={32}
            />
          </a>
          <a className="rounded-md" href="https://github.com/krsisabi/">
            <Image
              src="/logos/github-logo.svg"
              alt="GitHub Logo"
              className="dark:invert"
              width={32}
              height={32}
            />
          </a>
        </div>

        <p className="text-sm md:text-base">© 2024 GraphiQL</p>

        <a className="px-5 rounded-md" href="https://rs.school/">
          <Image
            src="/logos/rss-logo.svg"
            alt="RSS Logo"
            width={32}
            height={32}
            priority
          />
        </a>
      </div>
    </footer>
  );
};
