import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import Restclient from './Restclient';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useRouter } from 'next/navigation';
import { logout } from '@/utils/firebase/authService';

// Мокаем зависимости
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
    // Сброс мокаций перед каждым тестом
    mockUseAuthState.mockClear();
    mockPush.mockClear();
    mockLogout.mockClear();
  });

  it('renders the Rest Client title and button', () => {
    // Настраиваем, что пользователь есть
    mockUseAuthState.mockReturnValue([{}]);

    render(<Restclient />);

    expect(screen.getByText('Rest Client')).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /Sign Out/i })
    ).toBeInTheDocument();
  });

  it('calls logout function when Sign Out button is clicked', async () => {
    // Настраиваем, что пользователь есть
    mockUseAuthState.mockReturnValue([{}]);

    render(<Restclient />);

    fireEvent.click(screen.getByRole('button', { name: /Sign Out/i }));

    await waitFor(() => {
      expect(mockLogout).toHaveBeenCalled();
    });
  });
});
