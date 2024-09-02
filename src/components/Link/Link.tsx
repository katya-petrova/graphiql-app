import _Link from 'next/link';
import { ComponentProps } from 'react';

type LinkProps = ComponentProps<typeof _Link> & {
  variant?: keyof typeof variants;
  external?: boolean;
};

const baseClass =
  'border px-3 py-1 text-sm md:px-5 md:py-2 md:text-base rounded-md text-center transition ease-in-out duration-150';

const variants = {
  default: '',
  primary:
    'border-blue-500 hover:border-blue-700 text-blue-500 hover:text-blue-700 hover:bg-transparent',
  secondary:
    'border-gray-100 hover:border-gray-300 text-gray-100 hover:text-gray-300 hover:bg-transparent',
};

export const Link = ({
  href,
  children,
  onClick,
  className,
  variant = 'default',
  external,
  ...rest
}: LinkProps) => {
  return (
    <_Link
      href={href}
      className={`${variant === 'default' ? '' : baseClass} ${variants[variant]} ${className ? className : ''}`}
      onClick={onClick}
      target={external ? '_blank' : undefined}
      rel={external ? 'noopener noreferrer' : undefined}
      {...rest}
    >
      {children}
    </_Link>
  );
};
