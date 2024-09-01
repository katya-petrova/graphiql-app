import _Link from 'next/link';
import { ReactNode } from 'react';

type LinkProps = {
  href: string;
  children: ReactNode;
  onClick?: () => void;
};

export const Link = ({ href, children, onClick }: LinkProps) => {
  return (
    <_Link
      href={href}
      className="px-3 py-1 text-sm  md:px-5 md:py-2 md:text-base rounded-md hover:bg-gray-600"
      onClick={onClick}
    >
      {children}
    </_Link>
  );
};
