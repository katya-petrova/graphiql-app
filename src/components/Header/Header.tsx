import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useAuth } from '@/context/AuthContext';
import { toast } from 'react-toastify';
import { logout } from '@/utils/firebase/authService';
import { Dictionary } from '@/utils/translation/getDictionary';
import { Link } from '../Link';
import { LanguageSwitcher } from '../LanguageSwitcher';
import { Button } from '../Button/Button';

export const Header_Height = '60px';

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
      <nav className="px-2 md:px-3 w-full text-center flex justify-between items-center">
        <Link href="/">
          <Image
            src="/logos/graphql-logo.svg"
            alt="GraphQL Logo"
            className="invert"
            width={32}
            height={32}
          />
        </Link>
        <LanguageSwitcher />
        {isSignedIn ? (
          <Button
            variant="secondary"
            onClick={handleSignOut}
            className="rounded-md"
          >
            {t.links.signOut}
          </Button>
        ) : (
          <div className="flex space-x-2">
            <Link variant="secondary" href="/signin">
              {t.links.signIn}
            </Link>
            <Link variant="secondary" href="/signup">
              {t.links.signUp}
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
};
