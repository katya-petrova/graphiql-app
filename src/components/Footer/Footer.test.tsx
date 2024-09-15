import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Footer } from './Footer';

vi.mock('next/image', () => ({
  __esModule: true,
  default: ({ src, alt }: { src: string; alt: string }) => (
    <img src={src} alt={alt} />
  ),
}));

describe('Footer Component', () => {
  it('renders GitHub links', () => {
    render(<Footer />);

    const githubLinks = screen.getAllByAltText('GitHub Logo');
    expect(githubLinks.length).toBe(3);
    expect(githubLinks[0].closest('a')).toHaveAttribute(
      'href',
      'https://github.com/katya-petrova/'
    );
    expect(githubLinks[1].closest('a')).toHaveAttribute(
      'href',
      'https://github.com/guz86/'
    );
    expect(githubLinks[2].closest('a')).toHaveAttribute(
      'href',
      'https://github.com/krsisabi/'
    );
  });

  it('renders the copyright text', () => {
    render(<Footer />);

    expect(screen.getByText('© 2024 GraphiQL')).toBeInTheDocument();
  });

  it('renders the RSS link', () => {
    render(<Footer />);

    const rssLogo = screen.getByAltText('RSS Logo');
    expect(rssLogo).toBeInTheDocument();
    expect(rssLogo.closest('a')).toHaveAttribute('href', 'https://rs.school/');
  });
});
