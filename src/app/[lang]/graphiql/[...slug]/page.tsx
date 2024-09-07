import GraphQLClient from '@/pagesComponents/GraphQL/GraphQLClient/GraphQLClient';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'GraphQL Client',
  description: 'About GraphQL Client',
  icons: {
    icon: '/favicon.png',
  },
};

const GraphQLClientPage: React.FC = () => {
  return <GraphQLClient />;
};

export default GraphQLClientPage;
