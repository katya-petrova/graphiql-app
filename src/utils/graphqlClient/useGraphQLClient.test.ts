import { renderHook, act } from '@testing-library/react';
import { ApolloClient } from '@apollo/client';
import useGraphQLClient from './useGraphQLClient';

describe('useGraphQLClient', () => {
  it('initializes ApolloClient with given URL and headers', () => {
    const initialUrl = 'https://initial-url.com/graphql';
    const initialHeaders = { Authorization: 'Bearer token' };

    const { result } = renderHook(() =>
      useGraphQLClient(initialUrl, initialHeaders)
    );

    expect(result.current.client).toBeInstanceOf(ApolloClient);

    expect(result.current.headers).toEqual(initialHeaders);
  });

  it('updates ApolloClient when URL or headers change', () => {
    const initialUrl = 'https://initial-url.com/graphql';
    const initialHeaders = { Authorization: 'Bearer token' };
    const newUrl = 'https://new-url.com/graphql';
    const newHeaders = { Authorization: 'Bearer new-token' };

    const { result } = renderHook(() =>
      useGraphQLClient(initialUrl, initialHeaders)
    );

    act(() => {
      result.current.setUrl(newUrl);
      result.current.setHeaders(newHeaders);
    });

    expect(result.current.headers).toEqual(newHeaders);
  });
});
