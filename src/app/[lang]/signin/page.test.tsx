import { render, screen } from '@testing-library/react';
import SigninPage from './page';
import { describe, it, expect } from 'vitest';
import { vi } from 'vitest';

vi.mock('@/pagesComponents/Signin/Signin', () => ({
  default: () => <div>Signin Component</div>,
}));

vi.mock('@/components/ToastContainer/ToastContainer', () => ({
  default: () => <div>Toast Container</div>,
}));

describe('SigninPage', () => {
  it('renders the Signin component', () => {
    render(<SigninPage />);
    const signinComponent = screen.getByText(/Signin Component/i);
    expect(signinComponent).toBeInTheDocument();
  });

  it('renders the ToastContainer component', () => {
    render(<SigninPage />);
    const toastContainer = screen.getByText(/Toast Container/i);
    expect(toastContainer).toBeInTheDocument();
  });
});
