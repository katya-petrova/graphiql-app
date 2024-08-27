import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Error from './error';

describe('Error component', () => {
  it('should render the error message and button', () => {
    const mockReset = vi.fn();

    render(<Error reset={mockReset} />);

    expect(
      screen.getByText('Ooops... Something went wrong')
    ).toBeInTheDocument();

    const button = screen.getByRole('button', { name: /try again/i });
    expect(button).toBeInTheDocument();
  });

  it('should call reset function when button is clicked', () => {
    const mockReset = vi.fn();

    render(<Error reset={mockReset} />);

    const button = screen.getByRole('button', { name: /try again/i });
    fireEvent.click(button);

    expect(mockReset).toHaveBeenCalledTimes(1);
  });
});
