'use client';

import React, { useState, useEffect } from 'react';
import { ApolloProvider, gql } from '@apollo/client';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useGraphQLClient from '@/utils/graphqjClient/useGraphQLClient';
import QueryResult from '../QueryResult/QueryResult';
import SdlDocumentation from '../SdlDocumentation/SdlDocumentation';
import QueryForm from '../QueryForm/QueryForm';
import SdlFetcher from '../SdlFetcher/SdlFetcher';
import ToastContainer from '../../ToastContainer/ToastContainer';
import { useRouter } from 'next/navigation';
import atob from 'atob';

const GraphQLClient: React.FC = () => {
  const defaultQuery = `query GetCountry($code: ID!) {
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
  }`;

  const [query, setQuery] = useState<string>(defaultQuery);
  const [variables, setVariables] = useState<string>('{"code": "US"}');
  const [sdlUrl, setSdlUrl] = useState<string>('https://api.github.com/?sdl');
  const [queryResult, setQueryResult] = useState<any>(null);
  const [sdlData, setSdlData] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [statusCode, setStatusCode] = useState<number | null>(null);
  const [url, setUrl] = useState<string>('https://countries.trevorblades.com');
  const [headersArray, setHeadersArray] = useState<
    { key: string; value: string }[]
  >([]);
  const router = useRouter();

  const convertHeadersArrayToObject = (
    headersArray: { key: string; value: string }[]
  ) => {
    return headersArray.reduce<Record<string, string>>((acc, header) => {
      acc[header.key] = header.value;
      return acc;
    }, {});
  };

  const {
    client,
    setUrl: updateClientUrl,
    setHeaders: updateClientHeaders,
  } = useGraphQLClient(url, convertHeadersArrayToObject(headersArray));

  useEffect(() => {
    updateClientUrl(url);
    updateClientHeaders(convertHeadersArrayToObject(headersArray));
  }, [url, headersArray, updateClientUrl, updateClientHeaders]);

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const endpointUrlBase64encoded = queryParams.get(
      'endpointUrlBase64encoded'
    );
    const bodyBase64encoded = queryParams.get('bodyBase64encoded');

    if (endpointUrlBase64encoded && bodyBase64encoded) {
      const endpointUrl = atob(endpointUrlBase64encoded);
      const body = JSON.parse(atob(bodyBase64encoded));
      setUrl(endpointUrl);
      setQuery(body.query);
      setVariables(JSON.stringify(body.variables));

      handleQuery();
    }
  }, []);

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
      setStatusCode(200);
      toast.success('Query executed successfully!');

      const endpointUrlBase64 = btoa(url);
      const bodyBase64 = btoa(JSON.stringify({ query, variables }));
      router.push(
        `/graphiql?endpointUrlBase64encoded=${endpointUrlBase64}&bodyBase64encoded=${bodyBase64}`
      );
    } catch (err) {
      setError('Error fetching data');
      setStatusCode(500);
      toast.error('Error executing the query!');
    } finally {
      setLoading(false);
    }
  };

  const handleSdlDataFetch = (data: string) => {
    setSdlData(data);
    toast.success('SDL data fetched successfully!');
  };

  const handleError = (message: string) => {
    setError(message);
    setStatusCode(500);
    toast.error('Error: ' + message);
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

  const handleHeadersChange = (headersString: string) => {
    try {
      const headersArray = JSON.parse(headersString) as {
        key: string;
        value: string;
      }[];
      setHeadersArray(headersArray);
    } catch (error) {
      toast.error('Invalid headers format');
    }
  };

  return (
    <ApolloProvider client={client}>
      <div className="p-4 bg-white rounded text-gray-700 min-h-screen">
        <h1 className="text-3xl font-bold mb-4">GraphQL Client</h1>
        <QueryForm
          url={url}
          sdlUrl={sdlUrl}
          query={query}
          variables={variables}
          headers={JSON.stringify(headersArray)}
          onUrlChange={handleUrlChange}
          onSdlUrlChange={handleSdlUrlChange}
          onQueryChange={handleQueryChange}
          onVariablesChange={handleVariablesChange}
          onHeadersChange={handleHeadersChange}
          onQueryExecute={handleQuery}
        />
        <QueryResult
          queryResult={queryResult}
          error={error}
          statusCode={statusCode}
          loading={loading}
        />
        <SdlFetcher
          sdlUrl={sdlUrl}
          headers={convertHeadersArrayToObject(headersArray)}
          onSdlDataFetch={handleSdlDataFetch}
          onError={handleError}
        />
        <SdlDocumentation sdlData={sdlData} />
        <ToastContainer />
      </div>
    </ApolloProvider>
  );
};

export default GraphQLClient;
