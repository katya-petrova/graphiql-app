import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';
import SigninPage from './page';
import { vi } from 'vitest';

vi.mock('@/components/GraphQL/GraphQLClient/GraphQLClient', () => ({
  __esModule: true,
  default: () => <div>GraphQLClient</div>,
}));

describe('SigninPage Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders the GraphQLClient component', async () => {
    render(<SigninPage />);

    expect(screen.getByText('GraphQLClient')).toBeInTheDocument();
  });
});
