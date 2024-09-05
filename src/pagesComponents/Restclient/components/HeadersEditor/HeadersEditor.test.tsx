import { render, fireEvent, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import HeadersEditor from './HeadersEditor';

describe('HeadersEditor Component', () => {
  it('adds a header when valid key and value are provided', () => {
    const setHeaders = vi.fn();
    const updateUrl = vi.fn();
    render(<HeadersEditor headers={[]} setHeaders={setHeaders} updateUrl={updateUrl} />);

    fireEvent.change(screen.getByPlaceholderText('Header Key'), { target: { value: 'Content-Type' } });
    fireEvent.change(screen.getByPlaceholderText('Header Value'), { target: { value: 'application/json' } });
    fireEvent.click(screen.getByText(/Add Header/i));

    expect(setHeaders).toHaveBeenCalledWith([['Content-Type', 'application/json']]);
    expect(updateUrl).toHaveBeenCalled();
  });

  it('shows an error when attempting to add a header without key or value', () => {
    render(<HeadersEditor headers={[]} setHeaders={() => {}} updateUrl={() => {}} />);

    fireEvent.click(screen.getByText(/Add Header/i));
    expect(screen.getByText('Both key and value are required.')).toBeInTheDocument();
  });

  it('shows error when a header key or value is invalid on addition', () => {
    render(<HeadersEditor headers={[]} setHeaders={() => {}} updateUrl={() => {}} />);

    fireEvent.change(screen.getByPlaceholderText('Header Key'), { target: { value: 'Invalid@Key' } });
    fireEvent.change(screen.getByPlaceholderText('Header Value'), { target: { value: 'somevalue' } });
    fireEvent.click(screen.getByText(/Add Header/i));

    expect(screen.getByText('Header key must contain only Latin letters, digits, dashes, underscores, or slashes.')).toBeInTheDocument();
  });

  it('edits an existing header', () => {
    const setHeaders = vi.fn();
    const updateUrl = vi.fn();
    const initialHeaders: [string, string][] = [['User-Agent', 'test']];
    render(<HeadersEditor headers={initialHeaders} setHeaders={setHeaders} updateUrl={updateUrl} />);

    fireEvent.click(screen.getByLabelText('Edit header 0'));
    fireEvent.change(screen.getAllByRole('textbox')[0], { target: { value: 'User-Agent' } });
    fireEvent.change(screen.getAllByRole('textbox')[1], { target: { value: 'test updated' } });
    fireEvent.click(screen.getByText(/Save/i));

    expect(setHeaders).toHaveBeenCalledWith([['User-Agent', 'test']]);
    expect(updateUrl).toHaveBeenCalled();
  });


  it('removes a header', () => {
    const setHeaders = vi.fn();
    const updateUrl = vi.fn();
    const initialHeaders: [string, string][] = [['User-Agent', 'test']];
    render(<HeadersEditor headers={initialHeaders} setHeaders={setHeaders} updateUrl={updateUrl} />);

    fireEvent.click(screen.getByLabelText('Remove header 0'));

    expect(setHeaders).toHaveBeenCalledWith([]);
    expect(updateUrl).toHaveBeenCalled();
  });
});