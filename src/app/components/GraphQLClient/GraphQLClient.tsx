'use client';

import React, { useState, useEffect } from 'react';
import { ApolloProvider, gql } from '@apollo/client';
import useGraphQLClient from '@/utils/graphqjClient/useGraphQLClient';

const GraphQLClient: React.FC = () => {
  const defaultQuery = `
query GetCountry($code: ID!) {
  country(code: $code) {
    name
    native
    capital
    emoji
    currency
    languages {
      code
      name
    }
  }
}
  `;

  const [query, setQuery] = useState<string>(defaultQuery);
  const [variables, setVariables] = useState<string>('{"code": "US"}'); // Default variable set here
  const [sdlUrl, setSdlUrl] = useState<string>('https://api.github.com/?sdl');
  const [queryResult, setQueryResult] = useState<any>(null);
  const [sdlData, setSdlData] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [url, setUrl] = useState<string>('https://countries.trevorblades.com'); // Keep URL in state
  const [headers, setHeaders] = useState<string>('');

  const {
    client,
    setUrl: updateClientUrl,
    setHeaders: updateClientHeaders,
  } = useGraphQLClient(url, headers);

  useEffect(() => {
    // Update client when URL or headers change
    updateClientUrl(url);
    updateClientHeaders(headers);
  }, [url, headers, updateClientUrl, updateClientHeaders]);

  const handleQuery = async () => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await client.query({
        query: gql`
          ${query}
        `,
        variables: variables ? JSON.parse(variables) : {},
      });
      setQueryResult(data);
    } catch (err) {
      setError('Ошибка при получении данных');
    } finally {
      setLoading(false);
    }
  };

  const handleSdlRequest = async () => {
    try {
      const response = await fetch(sdlUrl, {
        method: 'GET',
        headers: JSON.parse(headers || '{}'),
      });
      if (!response.ok) {
        throw new Error('Failed to fetch SDL data');
      }
      const sdlText = await response.text();
      setSdlData(sdlText);
    } catch (err) {
      setError('Ошибка при получении SDL данных');
    }
  };

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newUrl = e.target.value;
    setUrl(newUrl);
    setSdlUrl(`${newUrl}?sdl`);
  };

  const handleSdlUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSdlUrl(e.target.value);
  };

  const handleQueryChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setQuery(e.target.value);
  };

  const handleVariablesChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setVariables(e.target.value);
  };

  const handleHeadersChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setHeaders(e.target.value);
  };

  return (
    <ApolloProvider client={client}>
      <div className="p-4 bg-gray-800 text-yellow-400 min-h-screen">
        <h1 className="text-3xl font-bold mb-4">GraphQL Client</h1>
        <div className="mb-4">
          <label className="block mb-2">
            GraphQL API URL:
            <input
              type="text"
              value={url} // Use local state for URL
              onChange={handleUrlChange}
              placeholder="https://example.com/graphql"
              className="w-full p-2 bg-gray-900 text-yellow-400 rounded"
            />
          </label>
        </div>
        <div className="mb-4">
          <label className="block mb-2">
            SDL Endpoint URL:
            <input
              type="text"
              value={sdlUrl}
              onChange={handleSdlUrlChange}
              placeholder="https://example.com/graphql?sdl"
              className="w-full p-2 bg-gray-900 text-yellow-400 rounded"
            />
          </label>
        </div>
        <div className="mb-4">
          <label className="block mb-2">
            GraphQL Query:
            <textarea
              rows={8}
              value={query}
              onChange={handleQueryChange}
              placeholder="Введите свой GraphQL запрос"
              className="w-full p-2 bg-gray-900 text-yellow-400 rounded"
            />
          </label>
        </div>
        <div className="mb-4">
          <label className="block mb-2">
            Variables (JSON format):
            <textarea
              rows={4}
              value={variables}
              onChange={handleVariablesChange}
              placeholder={`{"id": "1", "name": "example"}`}
              className="w-full p-2 bg-gray-900 text-yellow-400 rounded"
            />
          </label>
        </div>
        <div className="mb-4">
          <label className="block mb-2">
            Headers (JSON format):
            <textarea
              rows={4}
              value={headers}
              onChange={handleHeadersChange}
              placeholder={`{"Authorization": "Bearer token"}`}
              className="w-full p-2 bg-gray-900 text-yellow-400 rounded"
            />
          </label>
        </div>
        <button
          onClick={handleQuery}
          className="px-4 py-2 bg-yellow-400 text-gray-800 font-bold rounded"
        >
          Выполнить запрос
        </button>
        <button
          onClick={handleSdlRequest}
          className="ml-4 px-4 py-2 bg-yellow-400 text-gray-800 font-bold rounded"
        >
          Получить SDL
        </button>
        <div className="mt-6">
          <h2 className="text-2xl font-bold">API URL:</h2>
          <p className="text-yellow-400">{url}</p>
          <h2 className="text-2xl font-bold mt-4">SDL Endpoint URL:</h2>
          <p className="text-yellow-400">{sdlUrl}</p>
          <h2 className="text-2xl font-bold mt-4">GraphQL Query:</h2>
          <pre className="bg-gray-900 p-2 rounded text-yellow-400">{query}</pre>
          <h2 className="text-2xl font-bold mt-4">Variables:</h2>
          <pre className="bg-gray-900 p-2 rounded text-yellow-400">
            {variables}
          </pre>
          <h2 className="text-2xl font-bold mt-4">Headers:</h2>
          <pre className="bg-gray-900 p-2 rounded text-yellow-400">
            {headers}
          </pre>
          <h2 className="text-2xl font-bold mt-4">Результат запроса</h2>
          {loading && <p>Loading...</p>}
          {error && <p style={{ color: 'red' }}>{error}</p>}
          {queryResult && (
            <pre className="bg-gray-900 p-2 rounded text-yellow-400">
              {JSON.stringify(queryResult, null, 2)}
            </pre>
          )}
        </div>
        {sdlData && (
          <div className="mt-6">
            <h2 className="text-2xl font-bold">SDL Documentation</h2>
            <pre className="bg-gray-900 p-4 rounded text-yellow-400">
              {sdlData}
            </pre>
          </div>
        )}
      </div>
    </ApolloProvider>
  );
};

export default GraphQLClient;
