import { render, screen } from '@testing-library/react';
import RestclientPage from './page';
import { describe, it, expect } from 'vitest';
import { vi } from 'vitest';

vi.mock('@/components/Restclient', () => ({
  default: () => <div>Restclient Component</div>,
}));

describe('SigninPage', () => {
  it('renders the Restclient component', () => {
    render(<RestclientPage />);
    const restclientComponent = screen.getByText(/Restclient Component/i);
    expect(restclientComponent).toBeInTheDocument();
  });
});
