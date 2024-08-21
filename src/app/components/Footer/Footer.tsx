import Image from 'next/image';

export const Footer = () => {
  return (
    <footer className="bg-blue-600 text-white py-3">
      <div className="px-3 w-full text-center flex justify-between">
        <a className="px-5 rounded-md" href="https://github.com/">
          <Image
            src="/github-logo.svg"
            alt="GitHub Logo"
            className="dark:invert"
            width={32}
            height={32}
          />
        </a>
        <p className="leading-8">© 2024 GraphiQL</p>
        <a className="px-5 rounded-md" href="https://rs.school/">
          <Image
            src="/rss-logo.svg"
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
