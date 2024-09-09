import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import GraphQLClientPage from './page';

vi.mock('@/pagesComponents/GraphQL/GraphQLClient/GraphQLClient', () => ({
  default: vi.fn(() => <div>Mocked GraphQLClient</div>),
}));

describe('GraphQLClient', () => {
  it('should render without crashing', () => {
    render(<GraphQLClientPage />);
    expect(screen.getByText('Mocked GraphQLClient')).toBeInTheDocument();
  });
});
