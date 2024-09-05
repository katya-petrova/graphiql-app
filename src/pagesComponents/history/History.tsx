'use client';

import { Link } from '@/components/Link';
import { Dictionary } from '@/utils/translation/getDictionary';

type HistoryProps = { t: Dictionary['history'] };

export const History = ({ t }: HistoryProps) => {
  let links = [
    {
      type: 'GET',
      value: 'http://localhost:3000/v1/outlay-rows/entity/create',
    },
    {
      type: 'GET',
      value: 'http://localhost:3000/v1/outlay-rows/entity/create',
    },
    {
      type: 'GET',
      value: 'http://localhost:3000/v1/outlay-rows/entity/create',
    },
    {
      type: 'GET',
      value: 'http://localhost:3000/v1/outlay-rows/entity/create',
    },
    {
      type: 'GET',
      value: 'http://localhost:3000/v1/outlay-rows/entity/create',
    },
    {
      type: 'GET',
      value: 'http://localhost:3000/v1/outlay-rows/entity/create',
    },
    {
      type: 'GET',
      value: 'http://localhost:3000/v1/outlay-rows/entity/create',
    },
    {
      type: 'GET',
      value: 'http://localhost:3000/v1/outlay-rows/entity/create',
    },
    {
      type: 'GET',
      value: 'http://localhost:3000/v1/outlay-rows/entity/create',
    },
    {
      type: 'GET',
      value: 'http://localhost:3000/v1/outlay-rows/entity/create',
    },
    {
      type: 'GET',
      value: 'http://localhost:3000/v1/outlay-rows/entity/create',
    },
    {
      type: 'GET',
      value: 'http://localhost:3000/v1/outlay-rows/entity/create',
    },
    {
      type: 'GET',
      value: 'http://localhost:3000/v1/outlay-rows/entity/create',
    },
    {
      type: 'GET',
      value: 'http://localhost:3000/v1/outlay-rows/entity/create',
    },
    {
      type: 'GET',
      value: 'http://localhost:3000/v1/outlay-rows/entity/create',
    },
    {
      type: 'GET',
      value: 'http://localhost:3000/v1/outlay-rows/entity/create',
    },
    {
      type: 'GET',
      value: 'http://localhost:3000/v1/outlay-rows/entity/create',
    },
    {
      type: 'GET',
      value: 'http://localhost:3000/v1/outlay-rows/entity/create',
    },
    {
      type: 'GET',
      value: 'http://localhost:3000/v1/outlay-rows/entity/create',
    },
    {
      type: 'GET',
      value: 'http://localhost:3000/v1/outlay-rows/entity/create',
    },
    {
      type: 'GET',
      value: 'http://localhost:3000/v1/outlay-rows/entity/create',
    },
    {
      type: 'GET',
      value: 'http://localhost:3000/v1/outlay-rows/entity/create',
    },
  ];

  if (!links || links.length === 0) {
    return (
      <div className="flex flex-col items-center min-w-[400px] mt-40">
        {t.message.map((p, i) => (
          <p className="text-lg" key={i}>
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
      <ul className="flex flex-col max-h-[600px] overflow-y-scroll px-8 py-4 gap-3 mt-10 border rounded-lg">
        {links.map((link, index) => (
          <li className="" key={index}>
            <Link className="gap-4" variant="default" href={link.value}>
              <span>{link.type}</span>
              <span>{link.value}</span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
};
