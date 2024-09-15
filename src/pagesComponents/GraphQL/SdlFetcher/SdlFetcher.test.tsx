import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { toast } from 'react-toastify';
import SdlFetcher from './SdlFetcher';
import en from '@/utils/translation/dictionaries/en.json';

vi.mock('../../Button/Button', () => ({
  Button: ({
    onClick,
    disabled,
  }: {
    onClick: () => void;
    disabled: boolean;
  }) => (
    <button onClick={onClick} disabled={disabled}>
      Request SDL
    </button>
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

  it('renders the button and handles loading state', () => {
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
  it('displays a loader while fetching SDL data', async () => {
    globalThis.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ data: 'SDL Data' }),
      })
    ) as unknown as typeof fetch;

    render(
      <SdlFetcher
        sdlUrl="https://example.com/sdl"
        headers={{}}
        onSdlDataFetch={vi.fn()}
        t={en.graphiql}
      />
    );

    const button = screen.getByText('Request SDL');
    fireEvent.click(button);

    expect(screen.getByTestId('loader-container')).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.queryByTestId('loader-container')).not.toBeInTheDocument();
    });
  });

  it('shows error for invalid URL format', async () => {
    render(
      <SdlFetcher
        sdlUrl="invalid-url"
        headers={{}}
        onSdlDataFetch={vi.fn()}
        t={en.graphiql}
      />
    );

    const button = screen.getByText('Request SDL');
    fireEvent.click(button);

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith('Error: Invalid URL format');
    });
  });

  it('handles fetch errors correctly', async () => {
    globalThis.fetch = vi.fn(() =>
      Promise.resolve({
        ok: false,
        json: () => Promise.resolve({ message: 'SDL document not found' }),
      })
    ) as unknown as typeof fetch;

    render(
      <SdlFetcher
        sdlUrl="https://example.com/sdl"
        headers={{}}
        onSdlDataFetch={vi.fn()}
        t={en.graphiql}
      />
    );

    fireEvent.click(screen.getByText('Request SDL'));

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith('SDL document not found');
    });
  });
});
