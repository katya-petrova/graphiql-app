import { renderHook, act } from '@testing-library/react';
import { onAuthStateChanged } from 'firebase/auth';
import { AuthProvider, useAuth } from '@/context/AuthContext';
import { vi, describe, it, expect, beforeEach } from 'vitest';

vi.mock('firebase/auth', () => ({
  onAuthStateChanged: vi.fn(),
}));

vi.mock('@/utils/firebase/firebaseConfig', () => ({
  auth: {},
}));

describe('AuthContext', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should sign in a user', () => {
    const mockUser = { uid: '123', email: 'test@example.com' };
    (onAuthStateChanged as jest.Mock).mockImplementation((auth, callback) => {
      callback(mockUser);
      return () => {};
    });

    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <AuthProvider>{children}</AuthProvider>
    );

    const { result } = renderHook(() => useAuth(), { wrapper });

    expect(result.current.isSignedIn).toBe(true);
    expect(result.current.user).toEqual(mockUser);
  });

  it('should sign out a user', () => {
    (onAuthStateChanged as jest.Mock).mockImplementation((auth, callback) => {
      callback(null);
      return () => {};
    });

    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <AuthProvider>{children}</AuthProvider>
    );

    const { result } = renderHook(() => useAuth(), { wrapper });

    expect(result.current.isSignedIn).toBe(false);
    expect(result.current.user).toBeNull();
  });
});
