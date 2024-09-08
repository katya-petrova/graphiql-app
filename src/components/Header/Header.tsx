import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useAuth } from '@/context/AuthContext';
import { toast } from 'react-toastify';
import { logout } from '@/utils/firebase/authService';
import { Dictionary } from '@/utils/translation/getDictionary';
import { Link } from '../Link';
import { LanguageSwitcher } from '../LanguageSwitcher';
import { Button } from '../Button';

export const Header_Height = '82px';

type HeaderProps = {
  setHeaderHeight: (height: string) => void;
  t: Dictionary['auth'];
};

export const Header = ({ setHeaderHeight, t }: HeaderProps) => {
  const [isSticky, setIsSticky] = useState(false);
  const { isSignedIn } = useAuth();

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
    return () => window.removeEventListener('scroll', handleScroll);
  }, [setHeaderHeight]);

  const handleSignOut = async () => {
    try {
      logout();
    } catch (error) {
      toast.error(` Sign out error: ${error}`);
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 content-center px-2 md:px-5 bg-blue-600 text-white transition-all duration-300 z-50 ${isSticky ? 'py-1 md:py-1.5' : 'py-3 md:py-5'}`}
    >
      <nav className="flex gap-2 px-2 md:px-3 w-full text-center sm:grid sm:grid-cols-3 justify-between items-center">
        <Link
          className={`${isSticky ? 'max-w-7' : 'max-w-8'} rounded-full hover:opacity-80 transition-all`}
          href="/"
        >
          <Image
            src="/logos/graphql-logo.svg"
            alt="GraphQL Logo"
            className="invert transition-all duration-300 rounded-full"
            width={isSticky ? 28 : 32}
            height={isSticky ? 28 : 32}
          />
        </Link>
        <LanguageSwitcher isSlim={isSticky} />
        <div className="justify-self-end flex gap-2 md:gap-4">
          {isSignedIn ? (
            <>
              <Link
                variant="secondary"
                href="/main"
                className={`sm:min-w-[80px] md:min-w-[100px] ${isSticky ? 'py-1 md:py-1' : ''}`}
              >
                {t.links.main}
              </Link>
              <Button
                variant="secondary"
                onClick={handleSignOut}
                className={`rounded-md sm:min-w-[80px] md:min-w-[100px] duration-300 ${isSticky ? 'py-1 md:py-1' : ''}`}
              >
                {t.links.signOut}
              </Button>
            </>
          ) : (
            <>
              <Link
                variant="secondary"
                href="/signin"
                className={`sm:min-w-[80px] md:min-w-[100px] duration-300 ${isSticky ? 'py-1 md:py-1' : ''}`}
              >
                {t.links.signIn}
              </Link>
              <Link
                variant="secondary"
                href="/signup"
                className={`sm:min-w-[80px] md:min-w-[100px] duration-300 ${isSticky ? 'py-1 md:py-1' : ''}`}
              >
                {t.links.signUp}
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};
