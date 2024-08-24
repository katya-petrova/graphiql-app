import React, { ReactNode } from 'react';

interface FormProps {
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  children: ReactNode;
}

const Form: React.FC<FormProps> = ({ onSubmit, children }) => {
  return (
    <div className="flex justify-center items-center">
      <form
        onSubmit={onSubmit}
        className="bg-white p-8 rounded-lg shadow-lg space-y-4 text-black w-full max-w-md"
      >
        {children}
      </form>
    </div>
  );
};

export { Form };
