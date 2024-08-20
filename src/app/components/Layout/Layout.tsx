'use client';
import { useState } from 'react';
import { Header } from '../Header';
import { Footer } from '../Footer';

export const Layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const [isSignedIn, setIsSignedIn] = useState(false);

  return (
    <div className="min-h-screen flex flex-col justify-between">
      <Header isSignedIn={isSignedIn} setIsSignedIn={setIsSignedIn} />
      {children}
      <Footer />
    </div>
  );
};
