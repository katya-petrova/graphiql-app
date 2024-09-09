'use client';
import { useState } from 'react';
import { AuthProvider } from '@/context/AuthContext';
import { Dictionary } from '@/utils/translation/getDictionary';
import { Header, Header_Height } from '../Header';
import { Footer } from '../Footer';

type LayoutProps = {
  children: React.ReactNode;
  t: Dictionary['auth'];
};

export const Layout = ({ children, t }: LayoutProps) => {
  const [headerHeight, setHeaderHeight] = useState(Header_Height);

  return (
    <AuthProvider>
      <div className="min-h-screen flex flex-col justify-between">
        <Header t={t} setHeaderHeight={setHeaderHeight} />
        <main
          style={{ marginTop: headerHeight }}
          className="flex flex-col flex-grow items-center justify-between p-6 md:p-10"
        >
          {children}
        </main>

        <Footer />
      </div>
    </AuthProvider>
  );
};
