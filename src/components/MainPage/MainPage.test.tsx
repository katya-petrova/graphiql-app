import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import MainPage from './MainPage';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';

vi.mock('@/context/AuthContext', () => ({
  useAuth: vi.fn(),
}));

vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
  }),
}));

const mockUseAuth = useAuth as jest.Mock;
const mockPush = vi.mocked(useRouter)().push as jest.Mock;

describe('MainPage Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('displays welcome message and links if signed in', () => {
    mockUseAuth.mockReturnValue({
      isSignedIn: true,
      user: { name: 'Test User' },
    });

    render(<MainPage />);

    expect(
      screen.getByText('Welcome to our platform. Choose the tool you need:')
    ).toBeInTheDocument();
    expect(screen.getByText('RESTful Client')).toBeInTheDocument();
    expect(screen.getByText('GraphiQL')).toBeInTheDocument();
    expect(screen.getByText('History')).toBeInTheDocument();
  });

  it('displays sign-in prompt if not signed in', () => {
    mockUseAuth.mockReturnValue({ isSignedIn: false, user: null });

    render(<MainPage />);

    expect(
      screen.getByText('Please sign in to access the platform.')
    ).toBeInTheDocument();
  });
});
