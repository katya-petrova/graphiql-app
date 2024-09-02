import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '@/app/globals.css';
import { getDictionary, Locale } from '@/utils/translation/getDictionary';
import { Layout } from '@/components/Layout';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'REST/GraphiQL Client',
  description: 'About REST/GraphiQL Client',
  icons: {
    icon: '/favicon.png',
  },
};

export async function generateStaticParams() {
  return [{ lang: 'en' }, { lang: 'ru' }];
}

type RootLayoutProps = Readonly<{
  children: React.ReactNode;
  params: { lang: Locale };
}>;

export default async function RootLayout({
  children,
  params: { lang },
}: RootLayoutProps) {
  const { auth } = await getDictionary(lang);
  return (
    <html lang={lang}>
      <body className={inter.className}>
        <div className="min-h-screen flex flex-col justify-between">
          <Layout t={auth}>{children}</Layout>
        </div>
      </body>
    </html>
  );
}
