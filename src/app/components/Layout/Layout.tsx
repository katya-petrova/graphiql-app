'use client';
import { useState } from 'react';
import { Header, Header_Height } from '../Header';
import { Footer } from '../Footer';

export const Layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [headerHeight, setHeaderHeight] = useState(Header_Height);

  return (
    <div className="min-h-screen flex flex-col justify-between">
      <Header
        setHeaderHeight={setHeaderHeight}
        isSignedIn={isSignedIn}
        setIsSignedIn={setIsSignedIn}
      />
      <main
        style={{ marginTop: headerHeight }}
        className="flex flex-col items-center justify-between p-12 md:p-24"
      >
        {children}
      </main>

      <Footer />
    </div>
  );
};
