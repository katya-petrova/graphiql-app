import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import MainPage from './MainPage';
import { useAuth } from '@/context/AuthContext';
import en from '@/utils/translation/dictionaries/en.json';

vi.mock('@/context/AuthContext', () => ({
  useAuth: vi.fn(),
}));

vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
  }),
  usePathname: () => '/en/',
}));

const mockUseAuth = useAuth as jest.Mock;

describe('MainPage Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('displays welcome message and links if signed in', async () => {
    mockUseAuth.mockReturnValue({
      isSignedIn: true,
      user: { name: 'Test User' },
    });

    render(<MainPage t={{ main: en.main, auth: en.auth }} />);

    expect(
      screen.getByText('Welcome to our platform. Choose the tool you need:')
    ).toBeInTheDocument();
    expect(screen.getByText('RESTful Client')).toBeInTheDocument();
    expect(screen.getByText('GraphiQL')).toBeInTheDocument();
    expect(screen.getByText('History')).toBeInTheDocument();
  });

  it('displays sign-in prompt if not signed in', async () => {
    mockUseAuth.mockReturnValue({ isSignedIn: false, user: null });

    render(<MainPage t={{ main: en.main, auth: en.auth }} />);

    expect(
      screen.getByText('Please sign in to access the platform.')
    ).toBeInTheDocument();
  });
});
