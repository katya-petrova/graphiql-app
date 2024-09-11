import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import Signin from './Signin';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useRouter } from 'next/navigation';
import { logInWithEmailAndPassword } from '@/utils/firebase/authService';
import { toast } from 'react-toastify';
import { TranslationProvider } from '@/context/TranslationContext';
import en from '@/utils/translation/dictionaries/en.json';

vi.mock('react-firebase-hooks/auth', () => ({
  useAuthState: vi.fn(),
}));

vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
  }),
}));

vi.mock('@/utils/firebase/authService', () => ({
  logInWithEmailAndPassword: vi.fn(),
}));

vi.mock('react-toastify', () => ({
  toast: {
    error: vi.fn(),
  },
}));

const mockUseAuthState = useAuthState as jest.Mock;
const mockPush = vi.mocked(useRouter)().push as unknown as jest.Mock;
const mockLogIn = logInWithEmailAndPassword as jest.Mock;
const mockToastError = toast.error as jest.Mock;

describe('Signin Component', () => {
  beforeEach(() => {
    mockUseAuthState.mockClear();
    mockPush.mockClear();
    mockLogIn.mockClear();
    mockToastError.mockClear();
  });

  it('handles login form submission and calls logInWithEmailAndPassword', async () => {
    mockUseAuthState.mockReturnValue([null, false]);
    mockLogIn.mockResolvedValue({});

    render(
      <TranslationProvider t={en}>
        <Signin />
      </TranslationProvider>
    );

    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: 'password123' },
    });

    fireEvent.click(screen.getByRole('button', { name: /Sign In/i }));

    await waitFor(() => {
      expect(mockLogIn).toHaveBeenCalledWith('test@example.com', 'password123');
    });
  });

  it('handles login errors and logs them', async () => {
    mockUseAuthState.mockReturnValue([null, false]);
    mockLogIn.mockRejectedValue(new Error('Login failed'));

    console.log = vi.fn();

    render(
      <TranslationProvider t={en}>
        <Signin />
      </TranslationProvider>
    );

    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: 'password123' },
    });

    fireEvent.click(screen.getByRole('button', { name: /Sign In/i }));

    await waitFor(() => {
      expect(console.log).toHaveBeenCalledWith(new Error('Login failed'));
    });
  });
});
