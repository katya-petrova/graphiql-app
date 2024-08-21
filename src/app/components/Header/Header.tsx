import { Dispatch, SetStateAction } from 'react';
import { Link } from '../Link';
import Image from 'next/image';

type HeaderProps = {
  isSignedIn: boolean;
  setIsSignedIn?: Dispatch<SetStateAction<boolean>>;
};

export const Header = ({ isSignedIn, setIsSignedIn }: HeaderProps) => {
  return (
    <header className="p-3 bg-blue-600 text-white">
      <nav className="w-full text-center flex justify-between">
        <Link href="/">
          <Image
            src="/graphql-logo.svg"
            alt="GraphQL Logo"
            className="dark:invert"
            width={32}
            height={32}
          />
        </Link>
        <button className="px-5 py-2 rounded-md hover:bg-gray-600">
          Language Toggle
        </button>
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
