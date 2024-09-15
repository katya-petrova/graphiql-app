import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import Welcome from './Welcome';
import { useAuth } from '@/context/AuthContext';
import en from '@/utils/translation/dictionaries/en.json';

vi.mock('@/context/AuthContext', () => ({
  useAuth: vi.fn(),
}));

const mockUseAuth = vi.mocked(useAuth);

describe('Welcome Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('displays the welcome text', () => {
    mockUseAuth.mockReturnValue({
      isSignedIn: false,
      user: null,
    });

    render(<Welcome t={en} />);

    expect(screen.getByText('Welcome to GraphiQL!')).toBeInTheDocument();
    expect(
      screen.getByText(
        'Here, you can explore the world of GraphQL APIs with ease. Experiment with different endpoints, craft and test your queries, manage variables and headers, and see the results of your work instantly.'
      )
    ).toBeInTheDocument();
  });

  it('links to /signin if not signed in', () => {
    mockUseAuth.mockReturnValue({
      isSignedIn: false,
      user: null,
    });

    render(<Welcome t={en} />);

    const link = screen.getByRole('link', { name: /sign in/i });
    expect(link).toHaveAttribute('href', '/signin');
  });

  it('links to /main if signed in', () => {
    mockUseAuth.mockReturnValue({
      isSignedIn: true,
      user: null,
    });

    render(<Welcome t={en} />);

    const link = screen.getByRole('link', { name: /Get started/i });
    expect(link).toHaveAttribute('href', '/main');
  });
});
