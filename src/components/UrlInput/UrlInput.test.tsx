import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import UrlInput from './UrlInput';

describe('UrlInput Component', () => {
  it('renders the label and input correctly', () => {
    const label = 'URL';
    const value = 'https://example.com';
    const placeholder = 'Enter URL';

    render(
      <UrlInput
        label={label}
        value={value}
        onChange={vi.fn()}
        placeholder={placeholder}
      />
    );

    expect(screen.getByText(label)).toBeInTheDocument();
    const inputElement = screen.getByPlaceholderText(
      placeholder
    ) as HTMLInputElement;
    expect(inputElement).toBeInTheDocument();
    expect(inputElement.value).toBe(value);
  });
});
