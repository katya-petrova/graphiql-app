import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import QueryResult from './QueryResult';
import { toast } from 'react-toastify';

vi.mock('../../Loader/Loader', () => ({
  default: () => <div>Loading...</div>,
}));

vi.mock('react-toastify', () => ({
  toast: {
    error: vi.fn(),
  },
}));

describe('QueryResult Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders loading state correctly', () => {
    render(
      <QueryResult
        queryResult={null}
        error={null}
        statusCode={null}
        loading={true}
      />
    );

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('displays error message using toast when there is an error', async () => {
    const errorMessage = 'Something went wrong';

    render(
      <QueryResult
        queryResult={null}
        error={errorMessage}
        statusCode={null}
        loading={false}
      />
    );

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith(errorMessage);
    });
  });

  it('renders status code when statusCode is provided', () => {
    render(
      <QueryResult
        queryResult={null}
        error={null}
        statusCode={404}
        loading={false}
      />
    );

    expect(screen.getByText('Status: 404')).toBeInTheDocument();
  });

  it('does not render query result or status code when they are not provided', () => {
    render(
      <QueryResult
        queryResult={null}
        error={null}
        statusCode={null}
        loading={false}
      />
    );

    expect(screen.queryByText(/Status:/)).toBeNull();
    expect(screen.queryByText(/{.*}/)).toBeNull();
  });
});
