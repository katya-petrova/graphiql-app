'use client';
import { useState } from 'react';
import { AuthProvider } from '@/context/AuthContext';
import { Dictionary } from '@/utils/translation/getDictionary';
import { Header, Header_Height } from '../Header';
import { Footer } from '../Footer';
import { TranslationProvider } from '@/context/TranslationContext';

type LayoutProps = {
  children: React.ReactNode;
  t: Dictionary;
};

export const Layout = ({ children, t }: LayoutProps) => {
  const [headerHeight, setHeaderHeight] = useState(Header_Height);

  return (
    <AuthProvider>
      <TranslationProvider t={t}>
        <div className="min-h-screen flex flex-col justify-between">
          <Header t={t['auth']} setHeaderHeight={setHeaderHeight} />
          <main
            style={{ marginTop: headerHeight }}
            className="flex flex-col flex-grow items-center justify-between p-6 md:p-10"
          >
            {children}
          </main>

          <Footer />
        </div>
      </TranslationProvider>
    </AuthProvider>
  );
};
