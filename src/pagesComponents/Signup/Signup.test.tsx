import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import Signup from './Signup';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useRouter } from 'next/navigation';
import { registerWithEmailAndPassword } from '@/utils/firebase/authService';
import { validateSignupForm } from '@/utils/validation/validateSignupForm';
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
  registerWithEmailAndPassword: vi.fn(),
}));

vi.mock('@/utils/validation/validateSignupForm', () => ({
  validateSignupForm: vi.fn(),
}));

vi.mock('react-toastify', () => ({
  toast: {
    error: vi.fn(),
  },
}));

const mockUseAuthState = useAuthState as jest.Mock;
const mockPush = vi.mocked(useRouter)().push as unknown as jest.Mock;
const mockRegister = registerWithEmailAndPassword as jest.Mock;
const mockValidateSignupForm = validateSignupForm as jest.Mock;
const mockToastError = toast.error as jest.Mock;

describe('Signup Component', () => {
  beforeEach(() => {
    mockUseAuthState.mockClear();
    mockPush.mockClear();
    mockRegister.mockClear();
    mockValidateSignupForm.mockClear();
    mockToastError.mockClear();
  });

  it('handles successful registration', async () => {
    mockUseAuthState.mockReturnValue([null, false]);

    mockValidateSignupForm.mockReturnValue({ isValid: true, errors: {} });
    mockRegister.mockResolvedValue({});

    render(
      <TranslationProvider t={en}>
        <Signup />
      </TranslationProvider>
    );

    fireEvent.change(screen.getByLabelText(/name/i), {
      target: { value: 'John Doe' },
    });
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'john.doe@example.com' },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: 'securepassword' },
    });

    fireEvent.click(screen.getByRole('button', { name: /Sign Up/i }));

    await waitFor(() => {
      expect(mockRegister).toHaveBeenCalledWith(
        'John Doe',
        'john.doe@example.com',
        'securepassword'
      );
    });
  });

  it('shows error toast if offline', async () => {
    global.navigator = { onLine: false } as unknown as Navigator;

    mockUseAuthState.mockReturnValue([null, false]);
    mockValidateSignupForm.mockReturnValue({ isValid: true, errors: {} });

    render(
      <TranslationProvider t={en}>
        <Signup />
      </TranslationProvider>
    );

    fireEvent.change(screen.getByLabelText(/name/i), {
      target: { value: 'John Doe' },
    });
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'john.doe@example.com' },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: 'securepassword' },
    });

    fireEvent.click(screen.getByRole('button', { name: /Sign Up/i }));

    await waitFor(() => {
      expect(mockToastError).toHaveBeenCalledWith(
        'You are currently offline. Please check your internet connection.'
      );
    });
  });
});
