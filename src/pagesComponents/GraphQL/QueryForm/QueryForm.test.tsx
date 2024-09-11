import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import QueryForm from './QueryForm';

vi.mock('../../../components/UrlInput/UrlInput', () => ({
  default: ({ label, value, onChange, placeholder }: any) => (
    <div>
      <label>{label}</label>
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
    </div>
  ),
}));

vi.mock('../../../components/TextAreaInput/TextAreaInput', () => ({
  default: ({ label, value, onChange, placeholder, rows }: any) => (
    <div>
      <label>{label}</label>
      <textarea
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        rows={rows}
      />
    </div>
  ),
}));

vi.mock('../HeaderInput/HeaderInput', () => ({
  default: ({ keyValue, onKeyChange, onValueChange, onAdd }: any) => (
    <div>
      <input
        type="text"
        value={keyValue.key}
        onChange={onKeyChange}
        placeholder="Header Key"
      />
      <input
        type="text"
        value={keyValue.value}
        onChange={onValueChange}
        placeholder="Header Value"
      />
      <button onClick={onAdd}>Add Header</button>
    </div>
  ),
}));

vi.mock('../../../components/Button/Button', () => ({
  Button: ({ onClick, children }: any) => (
    <button onClick={onClick}>{children}</button>
  ),
}));

describe('QueryForm Component', () => {
  const mockOnUrlChange = vi.fn();
  const mockOnSdlUrlChange = vi.fn();
  const mockOnQueryChange = vi.fn();
  const mockOnVariablesChange = vi.fn();
  const mockOnHeadersChange = vi.fn();
  const mockOnQueryExecute = vi.fn();
  const mockOnBodyChange = vi.fn();
  const mockOnBodyBlur = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('executes query when Send Request button is clicked', () => {
    render(
      <QueryForm
        url=""
        sdlUrl=""
        query=""
        variables=""
        headers="[]"
        onUrlChange={mockOnUrlChange}
        onSdlUrlChange={mockOnSdlUrlChange}
        onQueryChange={mockOnQueryChange}
        onVariablesChange={mockOnVariablesChange}
        onHeadersChange={mockOnHeadersChange}
        onQueryExecute={mockOnQueryExecute}
        onBodyChange={mockOnBodyChange}
        onBodyBlur={mockOnBodyBlur}
      />
    );

    fireEvent.click(screen.getByText(/Send Request/));

    expect(mockOnQueryExecute).toHaveBeenCalled();
  });
});
