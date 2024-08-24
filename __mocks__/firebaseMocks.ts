import { vi } from 'vitest';

export const mockAuth = {};
export const mockLogout = vi.fn();
export const mockUseAuthState = vi.fn();
export const mockPush = vi.fn();

vi.mock('@/utils/firebase/firebaseConfig', () => ({
  auth: mockAuth,
}));

vi.mock('@/utils/firebase/authService', () => ({
  logout: mockLogout,
}));

vi.mock('react-firebase-hooks/auth', () => ({
  useAuthState: mockUseAuthState,
}));

vi.mock('next/navigation', () => ({
  useRouter: () => ({ push: mockPush }),
}));
