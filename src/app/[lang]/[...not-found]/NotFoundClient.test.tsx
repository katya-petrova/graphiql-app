import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import NotFoundClient from './NotFoundClient';
import { useRouter } from 'next/navigation';
import { Dictionary } from '@/utils/translation/getDictionary';

describe('NotFoundClient Component', () => {
  const mockRouterBack = vi.fn();
  const mockT: Dictionary['notFound'] = {
    title: '404 Page not found',
    description: 'Could not found requested resource',
    links: {
      home: 'Home',
    },
  };

  it('renders the title and description correctly', () => {
    render(<NotFoundClient t={mockT} />);

    expect(screen.getByText('404 Page not found')).toBeInTheDocument();
    expect(
      screen.getByText('Could not found requested resource')
    ).toBeInTheDocument();
  });

  it('renders the home link correctly', () => {
    render(<NotFoundClient t={mockT} />);

    const homeLink = screen.getByText('Home');
    expect(homeLink).toBeInTheDocument();
    expect(homeLink.closest('a')).toHaveAttribute('href', '/');
  });
});
