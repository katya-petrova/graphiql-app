import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import Image from 'next/image';
import { Link } from '../Link';
import { LanguageSwitcher } from '../LanguageSwitcher';

type HeaderProps = {
  isSignedIn: boolean;
  setIsSignedIn?: Dispatch<SetStateAction<boolean>>;
  setHeaderHeight: (height: string) => void;
};

export const Header_Height = '80px';

export const Header = ({
  isSignedIn,
  setIsSignedIn,
  setHeaderHeight,
}: HeaderProps) => {
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    setHeaderHeight(Header_Height);

    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [setHeaderHeight]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 content-center px-3 bg-blue-600 text-white transition-all duration-300 z-50 ${
        isSticky ? 'py-1.5' : 'py-5'
      }`}
    >
      <nav className="w-full text-center flex justify-between items-center">
        <Link href="/">
          <Image
            src="/graphql-logo.svg"
            alt="GraphQL Logo"
            className="dark:invert"
            width={32}
            height={32}
          />
        </Link>
        <LanguageSwitcher />
        {isSignedIn ? (
          <Link onClick={() => setIsSignedIn?.(false)} href="/">
            Sign out
          </Link>
        ) : (
          <Link onClick={() => setIsSignedIn?.(true)} href="/sign-up">
            Sign in
          </Link>
        )}
      </nav>
    </header>
  );
};
