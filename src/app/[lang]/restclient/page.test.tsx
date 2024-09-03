import { render, screen } from '@testing-library/react';
import RestclientPage from './[method]/[...slug]/page';
import { describe, it, expect } from 'vitest';
import { vi } from 'vitest';

vi.mock('@/pagesComponents/Restclient/Restclient', () => ({
  default: () => <div>Restclient Component</div>,
}));

describe('SigninPage', () => {
  it('renders the Restclient component', () => {
    render(<RestclientPage />);
    const restclientComponent = screen.getByText(/Restclient Component/i);
    expect(restclientComponent).toBeInTheDocument();
  });
});
