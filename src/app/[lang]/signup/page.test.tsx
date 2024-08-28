import { render, screen } from '@testing-library/react';
import SignupPage from './page';
import { describe, it, expect } from 'vitest';
import { vi } from 'vitest';

vi.mock('@/components/Signup/Signup', () => ({
  default: () => <div>Signup Component</div>,
}));

vi.mock('@/components/ToastContainer/ToastContainer', () => ({
  default: () => <div>Toast Container</div>,
}));

describe('SignupPage', () => {
  it('renders the Signup component', () => {
    render(<SignupPage />);
    const signupComponent = screen.getByText(/Signup Component/i);
    expect(signupComponent).toBeInTheDocument();
  });

  it('renders the ToastContainer component', () => {
    render(<SignupPage />);
    const toastContainer = screen.getByText(/Toast Container/i);
    expect(toastContainer).toBeInTheDocument();
  });
});
