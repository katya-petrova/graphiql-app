import { ComponentProps } from 'react';

type ButtonProps = ComponentProps<'button'> & {
  variant?: keyof typeof variants;
};

const baseClass =
  'px-3 py-1 text-sm md:px-4 md:py-2 md:text-base border rounded transition-all ease-in-out duration-150';

const variants = {
  primary: 'bg-blue-500 text-white hover:bg-blue-600',
  secondary:
    'border-gray-100 hover:border-gray-300 text-gray-100 hover:text-gray-300 hover:bg-transparent',
};

const Button = ({
  onClick,
  children,
  type = 'button',
  className,
  variant = 'primary',
  ...rest
}: ButtonProps) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`${baseClass} ${variants[variant]} ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
};

export { Button };
