'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Link } from '@/components/Link';
import { Dictionary } from '@/utils/translation/getDictionary';
import { useAuth } from '@/context/AuthContext';

type HistoryProps = { t: Dictionary['history'] };

type RequestHistoryItem = {
  request_url: string;
  link: string;
  time: string;
};

export const History = ({ t }: HistoryProps) => {
  const [historyItems, setHistoryItems] = useState<RequestHistoryItem[]>([]);

  const { isSignedIn } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isSignedIn) {
      router.push('/signin');
    }
  }, [isSignedIn, router]);

  useEffect(() => {
    const storedHistoryItems = localStorage.getItem('requestHistory');
    if (storedHistoryItems) {
      const parsedHistoryItems: RequestHistoryItem[] =
        JSON.parse(storedHistoryItems);

      const sortedHistoryItems = parsedHistoryItems.sort(
        (a, b) => new Date(b.time).getTime() - new Date(a.time).getTime()
      );

      setHistoryItems(sortedHistoryItems);
    }
  }, []);

  if (historyItems.length === 0) {
    return (
      <div className="flex flex-col flex-grow items-center min-w-[400px] justify-center">
        {t.message.map((p, i) => (
          <p className="text-lg mb-2 text-gray-100" key={i}>
            {p}
          </p>
        ))}
        <div className="flex flew-wrap gap-8 mt-8">
          <Link variant="primary" className="w-52" href="rest-client">
            {t.links.rest}
          </Link>
          <Link variant="primary" className="w-52" href="graphiql">
            {t.links.graphiQL}
          </Link>
        </div>
      </div>
    );
  }
  return (
    <section className="flex flex-col">
      <h1 className="text-xl text-center">{t.title}</h1>
      <ul className="flex flex-col max-h-[600px] overflow-y-auto px-8 py-4 gap-3 mt-10 border rounded-lg">
        {historyItems.map((item, index) => (
          <li key={index}>
            <Link variant="default" href={item.link}>
              {item.request_url}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
};
