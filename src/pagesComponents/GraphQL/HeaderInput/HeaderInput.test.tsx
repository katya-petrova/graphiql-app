import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import HeaderInput from './HeaderInput';
import en from '@/utils/translation/dictionaries/en.json';

vi.mock('../../Button/Button', () => ({
  Button: ({ onClick, children }: any) => (
    <button onClick={onClick}>{children}</button>
  ),
}));

describe('HeaderInput Component', () => {
  const mockOnKeyChange = vi.fn();
  const mockOnValueChange = vi.fn();
  const mockOnAdd = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders input fields and button', () => {
    render(
      <HeaderInput
        keyValue={{ key: '', value: '' }}
        onKeyChange={mockOnKeyChange}
        onValueChange={mockOnValueChange}
        onAdd={mockOnAdd}
        t={en.graphiql}
      />
    );

    expect(screen.getByPlaceholderText('Header Key')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Header Value')).toBeInTheDocument();
    expect(screen.getByText('Add Header')).toBeInTheDocument();
  });

  it('calls onAdd when the Add Header button is clicked', () => {
    render(
      <HeaderInput
        keyValue={{ key: '', value: '' }}
        onKeyChange={mockOnKeyChange}
        onValueChange={mockOnValueChange}
        onAdd={mockOnAdd}
        t={en.graphiql}
      />
    );

    fireEvent.click(screen.getByText('Add Header'));

    expect(mockOnAdd).toHaveBeenCalled();
  });
});
