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
      className="px-5 py-2 leading-8 rounded-md hover:bg-gray-600"
      onClick={onClick}
    >
      {children}
    </_Link>
  );
};
