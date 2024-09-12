import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import GraphQLClient from './GraphQLClient';
import { MockedProvider } from '@apollo/client/testing';
import en from '@/utils/translation/dictionaries/en.json';

vi.mock('@/utils/graphqlClient/useGraphQLClient', () => ({
  __esModule: true,
  default: vi.fn(() => ({
    client: {
      query: vi
        .fn()
        .mockResolvedValue({ data: { country: { name: 'United States' } } }),
    },
    setUrl: vi.fn(),
    setHeaders: vi.fn(),
  })),
}));

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
  default: ({ onSdlDataFetch, onError }: any) => (
    <div>
      <button onClick={() => onSdlDataFetch('Fake SDL Data')}>Fetch SDL</button>
      <button onClick={() => onError('Mock Error')}>Trigger Error</button>
    </div>
  ),
}));

vi.mock('@/components/ToastContainer/ToastContainer', () => ({
  __esModule: true,
  default: () => <div>ToastContainer Mock</div>,
}));

vi.mock('next/navigation', async (importOriginal) => {
  const actual: {
    useSearchParams: () => URLSearchParams;
    usePathname: () => string;
  } = await importOriginal();
  return {
    ...actual,
    usePathname: vi.fn().mockReturnValue('/'),
    useSearchParams: vi.fn().mockReturnValue(new URLSearchParams('')),
  };
});

describe('GraphQLClient Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders the component with all children', () => {
    render(
      <MockedProvider>
        <GraphQLClient t={en.graphiql} />
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
    expect(screen.getByText('ToastContainer Mock')).toBeInTheDocument();
  });

  it('fetches SDL data and displays it', async () => {
    render(
      <MockedProvider>
        <GraphQLClient t={en.graphiql} />
      </MockedProvider>
    );

    fireEvent.click(screen.getByText('Fetch SDL'));

    await waitFor(() => {
      expect(screen.getByTestId('sdl-documentation')).toHaveTextContent(
        'Fake SDL Data'
      );
    });
  });

  vi.mock('@/utils/graphqlClient/useGraphQLClient', () => ({
    __esModule: true,
    default: vi.fn(() => ({
      client: {
        query: vi.fn().mockImplementation(({ query, variables }) => {
          if (query.includes('error')) {
            return Promise.reject(new Error('GraphQL Error'));
          }
          return Promise.resolve({
            data: { country: { name: 'Mocked Country' } },
          });
        }),
      },
      setUrl: vi.fn(),
      setHeaders: vi.fn(),
    })),
  }));

  vi.mock('@/utils/graphqlClient/useGraphQLClient', () => ({
    __esModule: true,
    default: vi.fn(() => ({
      client: {
        query: vi
          .fn()
          .mockResolvedValue({ data: { country: { name: 'Mocked Country' } } }),
      },
      setUrl: vi.fn(),
      setHeaders: vi.fn(),
    })),
  }));
});


it('renders component and children correctly', () => {
  render(
    <MockedProvider>
      <GraphQLClient t={en.graphiql} />
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
  expect(screen.getByText('ToastContainer Mock')).toBeInTheDocument();
});



it('updates state on input changes', () => {
  render(
    <MockedProvider>
      <GraphQLClient t={en.graphiql} />
    </MockedProvider>
  );

  fireEvent.change(screen.getByPlaceholderText('Endpoint URL'), {
    target: { value: 'http://example.com' },
  });

  expect(screen.getByPlaceholderText('Endpoint URL')).toHaveValue('http://example.com');

  fireEvent.change(screen.getByPlaceholderText('Query'), {
    target: { value: '{ country { name } }' },
  });

  expect(screen.getByPlaceholderText('Query')).toHaveValue('{ country { name } }');
});


vi.mock('@/utils/graphqlClient/useGraphQLClient', () => ({
  __esModule: true,
  default: vi.fn(() => ({
    client: {
      query: vi.fn().mockImplementation(({ query, variables }) => {
        if (query.includes('error')) {
          return Promise.reject(new Error('GraphQL Error'));
        }
        return Promise.resolve({
          data: { country: { name: 'Mocked Country' } },
        });
      }),
    },
    setUrl: vi.fn(),
    setHeaders: vi.fn(),
  })),
}));

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
      <textarea placeholder="Headers" onChange={(e) => onHeadersChange(e.target.value)} />
      <button onClick={onQueryExecute}>Send Request</button>
    </div>
  ),
}));

vi.mock('../SdlFetcher/SdlFetcher', () => ({
  __esModule: true,
  default: ({ onSdlDataFetch, onError }: any) => (
    <div>
      <button onClick={() => onSdlDataFetch('Fake SDL Data')}>Fetch SDL</button>
      <button onClick={() => onError('Mock Error')}>Trigger Error</button>
    </div>
  ),
}));

vi.mock('@/components/ToastContainer/ToastContainer', () => ({
  __esModule: true,
  default: () => <div>ToastContainer Mock</div>,
}));

describe('GraphQLClient Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders the component with all children', () => {
    render(
      <MockedProvider>
        <GraphQLClient t={en.graphiql} />
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
    expect(screen.getByText('ToastContainer Mock')).toBeInTheDocument();
  });

  it('updates state on input changes', () => {
    render(
      <MockedProvider>
        <GraphQLClient t={en.graphiql} />
      </MockedProvider>
    );

    fireEvent.change(screen.getByPlaceholderText('Endpoint URL'), {
      target: { value: 'http://example.com' },
    });
    expect(screen.getByPlaceholderText('Endpoint URL')).toHaveValue('http://example.com');

    fireEvent.change(screen.getByPlaceholderText('Query'), {
      target: { value: '{ country { name } }' },
    });
    expect(screen.getByPlaceholderText('Query')).toHaveValue('{ country { name } }');
  });

  it('fetches SDL data and displays it', async () => {
    render(
      <MockedProvider>
        <GraphQLClient t={en.graphiql} />
      </MockedProvider>
    );

    fireEvent.click(screen.getByText('Fetch SDL'));

    await waitFor(() => {
      expect(screen.getByTestId('sdl-documentation')).toHaveTextContent('Fake SDL Data');
    });
  });


});