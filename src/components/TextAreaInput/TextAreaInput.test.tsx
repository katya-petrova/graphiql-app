import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import TextAreaInput from './TextAreaInput';

describe('TextAreaInput Component', () => {
  const label = 'Description';
  const placeholder = 'Enter text here';
  const rows = 4;

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders the label and textarea correctly', () => {
    render(
      <TextAreaInput
        label={label}
        value=""
        onChange={() => {}}
        placeholder={placeholder}
        rows={rows}
      />
    );

    expect(screen.getByLabelText(label)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(placeholder)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(placeholder)).toHaveAttribute(
      'rows',
      rows.toString()
    );
  });

  it('renders with the correct initial value', () => {
    const initialValue = 'Initial value';
    render(
      <TextAreaInput
        label={label}
        value={initialValue}
        onChange={() => {}}
        placeholder={placeholder}
        rows={rows}
      />
    );

    expect(screen.getByPlaceholderText(placeholder)).toHaveValue(initialValue);
  });

  it('applies the correct classes and attributes', () => {
    render(
      <TextAreaInput
        label={label}
        value=""
        onChange={() => {}}
        placeholder={placeholder}
        rows={rows}
      />
    );

    const textarea = screen.getByPlaceholderText(placeholder);

    expect(textarea).toHaveClass(
      'w-full p-2 border border-gray-300 bg-white text-gray-700 rounded'
    );
  });
});
