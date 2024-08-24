import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Form } from './Form';

describe('Form Component', () => {
  it('renders children correctly', () => {
    render(
      <Form onSubmit={() => {}}>
        <input type="text" placeholder="Enter text" />
      </Form>
    );
    expect(screen.getByPlaceholderText('Enter text')).toBeInTheDocument();
  });

  it('calls onSubmit handler when the form is submitted', () => {
    const handleSubmit = vi.fn((e) => e.preventDefault());
    render(
      <Form onSubmit={handleSubmit}>
        <button type="submit">Submit</button>
      </Form>
    );

    fireEvent.submit(screen.getByRole('button', { name: 'Submit' }));

    expect(handleSubmit).toHaveBeenCalled();
  });
});
