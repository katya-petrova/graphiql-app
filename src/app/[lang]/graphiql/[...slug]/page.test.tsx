import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import GraphQLClient from './page';

vi.mock('@/pagesComponents/GraphQL/GraphQLClient/GraphQLClient', () => ({
  default: vi.fn(() => <div>Mocked GraphQLClient</div>),
}));

describe('GraphQLClientPage', () => {
  it('should render without crashing', async () => {
    const GraphQLClientPage = await GraphQLClient({ params: { lang: 'en' } });
    render(GraphQLClientPage);
    expect(screen.getByText('Mocked GraphQLClient')).toBeInTheDocument();
  });
});
