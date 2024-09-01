import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Link } from './Link';

describe('Link Component', () => {
  it('renders with the correct href and children', () => {
    render(<Link href="/test">Click Me</Link>);

    const link = screen.getByText('Click Me');
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/test');
  });

  it('calls onClick handler when clicked', () => {
    const handleClick = vi.fn();
    render(
      <Link href="/test" onClick={handleClick}>
        Click Me
      </Link>
    );

    const link = screen.getByText('Click Me');
    fireEvent.click(link);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('does not throw error when onClick is not provided', () => {
    render(<Link href="/test">Click Me</Link>);

    const link = screen.getByText('Click Me');
    fireEvent.click(link);
  });
});
