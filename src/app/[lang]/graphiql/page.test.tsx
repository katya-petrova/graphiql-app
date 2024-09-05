import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import SigninPage from './page';

vi.mock('@/components/GraphQL/GraphQLClient/GraphQLClient', () => ({
  default: vi.fn(() => <div>Mocked GraphQLClient</div>),
}));

describe('SigninPage', () => {
  it('should render without crashing', () => {
    render(<SigninPage />);
    expect(screen.getByText('Mocked GraphQLClient')).toBeInTheDocument();
  });
});
