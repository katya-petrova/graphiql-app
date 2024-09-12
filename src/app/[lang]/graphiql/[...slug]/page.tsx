import { Suspense } from 'react';
import GraphQLClient from '@/pagesComponents/GraphQL/GraphQLClient/GraphQLClient';
import { Metadata } from 'next';
import { getDictionary } from '@/utils/translation/getDictionary';

export const metadata: Metadata = {
  title: 'GraphQL Client',
  description: 'About GraphQL Client',
  icons: {
    icon: '/favicon.png',
  },
};

type RestClientProps = {
  params: { lang: string };
};

const GraphQLClientPage: React.FC<RestClientProps> = async ({
  params: { lang },
}) => {
  const { graphiql } = await getDictionary(lang);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <GraphQLClient t={graphiql} />
    </Suspense>
  );
};

export default GraphQLClientPage;
