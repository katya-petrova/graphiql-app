import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { Header } from './Header';
import { useAuth } from '@/context/AuthContext';
import { logout } from '@/utils/firebase/authService';

vi.mock('next/image', () => ({
  __esModule: true,
  default: ({ src, alt }: { src: string; alt: string }) => (
    <img src={src} alt={alt} />
  ),
}));

vi.mock('../Link', () => ({
  Link: ({ href, children }: { href: string; children: React.ReactNode }) => (
    <a href={href}>{children}</a>
  ),
}));

vi.mock('../LanguageSwitcher', () => ({
  LanguageSwitcher: () => <div>Language Switcher</div>,
}));

vi.mock('@/context/AuthContext', () => ({
  useAuth: vi.fn(),
}));

vi.mock('@/utils/firebase/authService', () => ({
  logout: vi.fn(),
}));

const mockUseAuth = vi.mocked(useAuth);
const mockLogout = vi.mocked(logout);

describe('Header Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders the header with default state', () => {
    mockUseAuth.mockReturnValue({
      isSignedIn: false,
      user: null,
    });

    render(<Header setHeaderHeight={vi.fn()} />);

    expect(screen.getByAltText('GraphQL Logo')).toBeInTheDocument();
    expect(screen.getByText('Language Switcher')).toBeInTheDocument();
    expect(screen.getByText('Sign in')).toBeInTheDocument();
    expect(screen.getByText('Sign up')).toBeInTheDocument();
    expect(screen.queryByText('Sign out')).toBeNull();
  });

  it('renders Sign out button if user is signed in', () => {
    mockUseAuth.mockReturnValue({
      isSignedIn: true,
      user: null,
    });

    render(<Header setHeaderHeight={vi.fn()} />);

    expect(screen.getByText('Sign out')).toBeInTheDocument();
    expect(screen.queryByText('Sign in')).toBeNull();
    expect(screen.queryByText('Sign up')).toBeNull();
  });

  it('calls logout function on Sign out button click', async () => {
    mockUseAuth.mockReturnValue({
      isSignedIn: true,
      user: null,
    });

    render(<Header setHeaderHeight={vi.fn()} />);

    fireEvent.click(screen.getByText('Sign out'));

    await act(async () => {
      expect(mockLogout).toHaveBeenCalled();
    });
  });

  it('applies sticky class when scrolling', () => {
    mockUseAuth.mockReturnValue({
      isSignedIn: false,
      user: null,
    });

    render(<Header setHeaderHeight={vi.fn()} />);

    act(() => {
      window.scrollY = 60;
      window.dispatchEvent(new Event('scroll'));
    });

    expect(screen.getByRole('banner')).toHaveClass('py-1');
  });
});
