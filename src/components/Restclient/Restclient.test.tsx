import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import Restclient from './Restclient';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useRouter } from 'next/navigation';
import { logout } from '@/utils/firebase/authService';

vi.mock('react-firebase-hooks/auth', () => ({
  useAuthState: vi.fn(),
}));

vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
  }),
}));

vi.mock('@/utils/firebase/authService', () => ({
  logout: vi.fn(),
}));

const mockUseAuthState = useAuthState as jest.Mock;
const mockPush = vi.mocked(useRouter)().push as unknown as jest.Mock;
const mockLogout = logout as jest.Mock;

describe('Restclient Component', () => {
  beforeEach(() => {
    mockUseAuthState.mockClear();
    mockPush.mockClear();
    mockLogout.mockClear();
  });

  it('renders the Rest Client title and button', () => {
    mockUseAuthState.mockReturnValue([{}]);

    render(<Restclient />);

    expect(screen.getByText('Add Header')).toBeInTheDocument();
  });
});
