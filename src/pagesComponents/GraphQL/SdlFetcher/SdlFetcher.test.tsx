import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { toast } from 'react-toastify';
import SdlFetcher from './SdlFetcher';

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
        onError={vi.fn()}
      />
    );

    const button = screen.getByText('Request SDL');
    expect(button).toBeInTheDocument();
  });

  it('calls fetchSdlData on button click and handles success', async () => {
    const mockOnSdlDataFetch = vi.fn();
    const mockOnError = vi.fn();

    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        text: () => Promise.resolve('SDL data'),
      })
    ) as unknown as typeof fetch;

    render(
      <SdlFetcher
        sdlUrl="https://example.com/sdl"
        headers={{}}
        onSdlDataFetch={mockOnSdlDataFetch}
        onError={mockOnError}
      />
    );

    fireEvent.click(screen.getByText('Request SDL'));

    await waitFor(() => {
      expect(mockOnSdlDataFetch).toHaveBeenCalledWith('SDL data');
      expect(mockOnError).not.toHaveBeenCalled();
      expect(toast.error).not.toHaveBeenCalled();
    });
  });
});
