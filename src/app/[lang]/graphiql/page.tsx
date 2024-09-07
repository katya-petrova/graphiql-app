import { Metadata } from 'next';
import GraphQLClient from '@/pagesComponents/GraphQL/GraphQLClient/GraphQLClient';

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
