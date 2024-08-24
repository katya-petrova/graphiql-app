import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Layout } from './components/Layout';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'GraqhiQL Client',
  description: 'REST API GraphQL client',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen flex flex-col justify-between">
          <Layout>{children}</Layout>
        </div>
      </body>
    </html>
  );
}
