import React from 'react';

interface ButtonProps {
  onClick?: () => void;
  children: React.ReactNode;
  type?: 'button' | 'submit' | 'reset';
}

const Button: React.FC<ButtonProps> = ({
  onClick,
  children,
  type = 'button',
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className="px-4 py-2 border rounded bg-yellow-500 text-white hover:bg-yellow-600"
    >
      {children}
    </button>
  );
};

export { Button };
