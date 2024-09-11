import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import QueryForm from './QueryForm';
import en from '@/utils/translation/dictionaries/en.json';

vi.mock('../../UrlInput/UrlInput', () => ({
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

vi.mock('../../TextAreaInput/TextAreaInput', () => ({
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

vi.mock('../../Button/Button', () => ({
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

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('adds a new header', () => {
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
        t={en.graphiql}
      />
    );

    fireEvent.change(screen.getByPlaceholderText(/Header Key/), {
      target: { value: 'Authorization' },
    });

    fireEvent.change(screen.getByPlaceholderText(/Header Value/), {
      target: { value: 'Bearer token' },
    });

    fireEvent.click(screen.getByText(/Add Header/));

    expect(mockOnHeadersChange).toHaveBeenCalled();
  });

  it('removes a header', () => {
    render(
      <QueryForm
        url=""
        sdlUrl=""
        query=""
        variables=""
        headers='[{"key":"Authorization","value":"Bearer token"}]'
        onUrlChange={mockOnUrlChange}
        onSdlUrlChange={mockOnSdlUrlChange}
        onQueryChange={mockOnQueryChange}
        onVariablesChange={mockOnVariablesChange}
        onHeadersChange={mockOnHeadersChange}
        onQueryExecute={mockOnQueryExecute}
        t={en.graphiql}
      />
    );

    fireEvent.click(screen.getByText(/Remove/));

    expect(mockOnHeadersChange).toHaveBeenCalled();
  });

  it('executes query', () => {
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
        t={en.graphiql}
      />
    );

    fireEvent.click(screen.getByText(/Send Request/));

    expect(mockOnQueryExecute).toHaveBeenCalled();
  });
});
