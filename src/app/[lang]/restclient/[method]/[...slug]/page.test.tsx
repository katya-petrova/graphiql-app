import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import SigninPage from './page';

vi.mock('@/pagesComponents/Restclient//RestClient', () => ({
  default: vi.fn(() => <div>Mocked RestClient</div>),
}));

describe('SigninPage', () => {
  it('should render without crashing', () => {
    render(<SigninPage />);
    expect(screen.getByText('Mocked RestClient')).toBeInTheDocument();
  });
});
