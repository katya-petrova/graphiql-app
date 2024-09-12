import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { toast } from 'react-toastify';
import SdlFetcher from './SdlFetcher';
import en from '@/utils/translation/dictionaries/en.json';

vi.mock('../../Button/Button', () => ({
  Button: ({ onClick }: { onClick: () => void }) => (
    <button onClick={onClick}>Request SDL</button>
  ),
}));

vi.mock('../../Loader/Loader', () => ({
  default: () => <div>Loading...</div>,
}));

vi.mock('react-toastify', () => ({
  toast: {
    error: vi.fn(),
  },
}));

describe('SdlFetcher Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders the button and shows loader when loading', () => {
    render(
      <SdlFetcher
        sdlUrl="https://example.com/sdl"
        headers={{}}
        onSdlDataFetch={vi.fn()}
        t={en.graphiql}
      />
    );

    const button = screen.getByText('Request SDL');
    expect(button).toBeInTheDocument();
  });


  it('handles fetch errors', async () => {
    const mockOnSdlDataFetch = vi.fn();

    globalThis.fetch = vi.fn(() =>
      Promise.resolve({
        ok: false,
        status: 404,
        text: () => Promise.resolve(''),
      })
    ) as unknown as typeof fetch;

    render(
      <SdlFetcher
        sdlUrl="https://example.com/sdl"
        headers={{}}
        onSdlDataFetch={mockOnSdlDataFetch}
        t={en.graphiql}
      />
    );

    fireEvent.click(screen.getByText('Request SDL'));

    await waitFor(() => {
      expect(mockOnSdlDataFetch).not.toHaveBeenCalled();
      expect(toast.error).toHaveBeenCalledWith('SDL document not found');
    });
  });
});
