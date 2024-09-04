import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, vi } from 'vitest';
import Restclient from './RestClient';

vi.mock('next/navigation', () => ({
  usePathname: () => '/en/restclient/GET/',
  useSearchParams: () => new URLSearchParams(),
}));

vi.mock('@/utils/getCurrentLanguage/getCurrentLanguage', () => ({
  getLangFromUrlOrCookie: () => 'en',
}));

vi.mock('@/utils/historyService/historyService', () => ({
  saveRestRequestToHistory: vi.fn(),
}));

describe('Restclient Component', () => {
  it('renders without crashing', () => {
    render(<Restclient />);
    const button = screen.getByText(/Send Request/i);
    expect(button).toBeInTheDocument();
  });

  it('updates method when MethodSelector is changed', () => {
    render(<Restclient />);
    const methodSelect = screen.getByRole('combobox');
    fireEvent.change(methodSelect, { target: { value: 'POST' } });
    expect(methodSelect).toHaveValue('POST');
  });
  
  it('updates endpoint when EndpointInput is changed', () => {
    render(<Restclient />);
    const input = screen.getByPlaceholderText('Enter endpoint');
    fireEvent.change(input, { target: { value: 'https://api.example.com' } });
    expect(input).toHaveValue('https://api.example.com');
  });
  
  it('updates headers when HeadersEditor is changed', () => {
    render(<Restclient />);
    const headersInput = screen.getByPlaceholderText('Header Key');
    fireEvent.change(headersInput, { target: { value: 'Content-Type' } });
    expect(headersInput).toHaveValue('Content-Type');
  });
});
