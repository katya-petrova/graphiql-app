import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import GraphQLClient from './GraphQLClient';
import { MockedProvider } from '@apollo/client/testing';
import { ToastContainer } from 'react-toastify';

vi.mock('../QueryResult/QueryResult', () => ({
  __esModule: true,
  default: ({ queryResult, error, statusCode, loading }: any) => (
    <div data-testid="query-result">
      {loading && <div>Loading...</div>}
      {error && <div>Error: {error}</div>}
      {statusCode && <div>Status: {statusCode}</div>}
      {queryResult && <pre>{JSON.stringify(queryResult)}</pre>}
    </div>
  ),
}));

vi.mock('../SdlDocumentation/SdlDocumentation', () => ({
  __esModule: true,
  default: ({ sdlData }: any) => (
    <div data-testid="sdl-documentation">
      {sdlData ? <pre>{sdlData}</pre> : 'No SDL Data'}
    </div>
  ),
}));

vi.mock('../QueryForm/QueryForm', () => ({
  __esModule: true,
  default: ({
    onUrlChange,
    onSdlUrlChange,
    onQueryChange,
    onVariablesChange,
    onHeadersChange,
    onQueryExecute,
  }: any) => (
    <div>
      <input placeholder="Endpoint URL" onChange={onUrlChange} />
      <input placeholder="SDL URL" onChange={onSdlUrlChange} />
      <textarea placeholder="Query" onChange={onQueryChange} />
      <textarea placeholder="Variables" onChange={onVariablesChange} />
      <textarea
        placeholder="Headers"
        onChange={(e) => onHeadersChange(e.target.value)}
      />
      <button onClick={onQueryExecute}>Send Request</button>
    </div>
  ),
}));

vi.mock('../SdlFetcher/SdlFetcher', () => ({
  __esModule: true,
  default: ({ sdlUrl, headers, onSdlDataFetch, onError }: any) => (
    <div>
      <button onClick={() => onSdlDataFetch('Fake SDL Data')}>Fetch SDL</button>
    </div>
  ),
}));

vi.mock('../../ToastContainer/ToastContainer', () => ({
  __esModule: true,
  default: () => <ToastContainer />,
}));

describe('GraphQLClient Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders the component with all children', () => {
    render(
      <MockedProvider>
        <GraphQLClient />
      </MockedProvider>
    );

    expect(screen.getByText('GraphQL Client')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Endpoint URL')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('SDL URL')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Query')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Variables')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Headers')).toBeInTheDocument();
    expect(screen.getByText('Send Request')).toBeInTheDocument();
    expect(screen.getByText('Fetch SDL')).toBeInTheDocument();
  });

  it('handles input changes and fetches data', async () => {
    render(
      <MockedProvider>
        <GraphQLClient />
      </MockedProvider>
    );

    fireEvent.change(screen.getByPlaceholderText('Endpoint URL'), {
      target: { value: 'https://new-url.com' },
    });
    fireEvent.change(screen.getByPlaceholderText('SDL URL'), {
      target: { value: 'https://new-sdl-url.com' },
    });
    fireEvent.change(screen.getByPlaceholderText('Query'), {
      target: { value: 'query Test { test }' },
    });
    fireEvent.change(screen.getByPlaceholderText('Variables'), {
      target: { value: '{"key": "value"}' },
    });
    fireEvent.change(screen.getByPlaceholderText('Headers'), {
      target: { value: '[{"key": "Authorization", "value": "Bearer token"}]' },
    });

    fireEvent.click(screen.getByText('Send Request'));

    await waitFor(() => {
      expect(screen.getByText('Loading...')).toBeInTheDocument();
    });
  });

  it('fetches SDL data and displays it', async () => {
    render(
      <MockedProvider>
        <GraphQLClient />
      </MockedProvider>
    );

    fireEvent.click(screen.getByText('Fetch SDL'));

    await waitFor(() => {
      expect(screen.getByTestId('sdl-documentation')).toHaveTextContent(
        'Fake SDL Data'
      );
    });
  });

  it('displays errors correctly', async () => {
    render(
      <MockedProvider>
        <GraphQLClient />
      </MockedProvider>
    );

    const queryError = 'Error executing the query!';
    vi.spyOn(console, 'error').mockImplementation(() => {});
    await waitFor(() => {
      expect(
        screen.getByText(queryError)
      ).toBeInTheDocument();
    });
  });
});
