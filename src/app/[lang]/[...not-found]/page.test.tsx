import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import NotFound from './page';
import { getDictionary } from '@/utils/translation/getDictionary';

describe('NotFound Page', () => {
  const mockT = {
    title: '404 Page not found',
    description: 'Could not found requested resource',
    links: {
      home: 'Home',
    },
  };

  beforeEach(() => {
    (getDictionary as jest.Mock).mockResolvedValue({ notFound: mockT });
  });

  vi.mock('@/utils/translation/getDictionary', () => ({
    getDictionary: vi.fn(),
  }));

  it('renders the title and description correctly', async () => {
    const NotFoundPage = await NotFound({ params: { lang: 'en' } });
    render(NotFoundPage);

    expect(screen.getByText('404 Page not found')).toBeInTheDocument();
    expect(
      screen.getByText('Could not found requested resource')
    ).toBeInTheDocument();
  });

  it('renders the home link correctly', async () => {
    const NotFoundPage = await NotFound({ params: { lang: 'en' } });
    render(NotFoundPage);

    const homeLink = screen.getByText('Home');
    expect(homeLink).toBeInTheDocument();
    expect(homeLink.closest('a')).toHaveAttribute('href', '/');
  });
});
