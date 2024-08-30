import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Layout } from './Layout';

vi.mock('../Header', () => ({
  Header: ({
    setHeaderHeight,
  }: {
    setHeaderHeight: (height: string) => void;
  }) => {
    setHeaderHeight('80px');
    return <header data-testid="header">Header</header>;
  },
  Header_Height: '80px',
}));

vi.mock('../Footer', () => ({
  Footer: () => <footer data-testid="footer">Footer</footer>,
}));

vi.mock('@/context/AuthContext', () => ({
  AuthProvider: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="auth-provider">{children}</div>
  ),
}));

describe('Layout', () => {
  it('renders the Header, Footer, and children', () => {
    render(
      <Layout>
        <div data-testid="child-content">Child Content</div>
      </Layout>
    );

    expect(screen.getByTestId('header')).toBeInTheDocument();

    expect(screen.getByTestId('footer')).toBeInTheDocument();

    expect(screen.getByTestId('child-content')).toBeInTheDocument();
  });

  it('applies the correct margin-top to main based on header height', () => {
    render(
      <Layout>
        <div>Child Content</div>
      </Layout>
    );

    const mainElement = screen.getByRole('main');
    expect(mainElement).toHaveStyle('margin-top: 80px');
  });

  it('wraps content with AuthProvider', () => {
    render(
      <Layout>
        <div>Child Content</div>
      </Layout>
    );

    expect(screen.getByTestId('auth-provider')).toBeInTheDocument();
  });
});
