'use client';

import { useState, useEffect } from 'react';
import { ApolloProvider, gql } from '@apollo/client';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useGraphQLClient from '@/utils/graphqlClient/useGraphQLClient';
import { usePathname, useSearchParams } from 'next/navigation';
import { getLangFromUrlOrCookie } from '@/utils/getCurrentLanguage/getCurrentLanguage';
import ToastContainer from '@/components/ToastContainer/ToastContainer';
import QueryForm from '../QueryForm/QueryForm';
import QueryResult from '../QueryResult/QueryResult';
import SdlFetcher from '../SdlFetcher/SdlFetcher';
import SdlDocumentation from '../SdlDocumentation/SdlDocumentation';
import { Dictionary } from '@/utils/translation/getDictionary';
import { saveRestRequestToHistory } from '@/utils/RestfulClientServices/historyService/historyService';
import { RequestHistoryItem } from '@/pagesComponents/Restclient/RestClient';

const GraphQLClient: React.FC<{ t: Dictionary['graphiql'] }> = ({ t }) => {
  const [query, setQuery] = useState<string>('');
  const [variables, setVariables] = useState<string>('');
  const [url, setUrl] = useState<string>('');
  const [sdlUrl, setSdlUrl] = useState<string>('');
  const [queryResult, setQueryResult] = useState<string>('');
  const [sdlData, setSdlData] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [statusCode, setStatusCode] = useState<number | null>(null);
  const [headersArray, setHeadersArray] = useState<
    { key: string; value: string }[]
  >([]);
  const searchParams = useSearchParams();

  const pathname = usePathname();
  const [endpoint, setEndpoint] = useState('');
  const [body, setBody] = useState<string>('');
  const [history, setHistory] = useState<RequestHistoryItem[]>([]);

  useEffect(() => {
    const pathParts = pathname.split('/');
    const endpointBase64 = pathParts[3] || '';
    const bodyBase64 = pathParts[4] || '';

    setEndpoint(endpointBase64 ? atob(endpointBase64) : '');
    setBody(bodyBase64 ? atob(bodyBase64) : '');
  }, [pathname]);

  const handleBodyChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setBody(e.target.value);
  };

  const encodeBase64 = (str: string) => {
    return btoa(encodeURIComponent(str));
  };

  const handleBodyBlur = () => {
    const bodyBase64 = encodeBase64(body);
    const lang = getLangFromUrlOrCookie(pathname);
    const newUrl = `/${lang}/graphiql/${btoa(url)}/${bodyBase64}?${new URLSearchParams(convertHeadersArrayToObject(headersArray)).toString()}`;

    if (newUrl !== window.location.pathname + window.location.search) {
      window.history.replaceState(null, '', newUrl);
    }
  };

  useEffect(() => {
    try {
      const parsedObject = JSON.parse(body || '{}');
      const { query, variables } = parsedObject;

      if (query) setQuery(query);
      if (variables) setVariables(variables);
      if (endpoint) setUrl(endpoint);
    } catch (error) {
      console.error('Invalid JSON in body:', error);
    }
  }, [body, endpoint]);

  useEffect(() => {
    const headersArray: { key: string; value: string }[] = [];
    searchParams.forEach((value, key) => {
      headersArray.push({ key, value });
    });
    setHeadersArray(headersArray);
  }, [searchParams]);

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
    const savedHistory = JSON.parse(
      localStorage.getItem('requestHistory') || '[]'
    );
    setHistory(savedHistory);
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
      toast.success(t.successfulMessages.query);
    } catch {
      setStatusCode(500);
      toast.error(t.errorMessages.executing);
    } finally {
      setLoading(false);
    }
  };

  const handlePush = () => {
    const lang = getLangFromUrlOrCookie(pathname);
    const endpointUrlBase64 = btoa(url);

    let bodyBase64;

    try {
      bodyBase64 = btoa(
        JSON.stringify({ query, variables })
      );
    } catch (error) {
      toast.error(`Error encoding request body: ${error}`);
      return;
    }

    const newUrl = `/${lang}/graphiql/${endpointUrlBase64}/${bodyBase64}?${new URLSearchParams(convertHeadersArrayToObject(headersArray)).toString()}`;

    if (newUrl !== window.location.pathname + window.location.search) {
      window.history.replaceState(null, '', newUrl);
    }

    handleQuery();

    saveRestRequestToHistory(newUrl, 'GRAPHQL', url, history, setHistory);
  };

  const handleSdlDataFetch = (data: string) => {
    setSdlData(data);
    toast.success(t.successfulMessages.SDL);
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

      const lang = getLangFromUrlOrCookie(pathname);
      const endpointUrlBase64 = btoa(url);

      if (!endpointUrlBase64) return;

      const bodyBase64 = btoa(JSON.stringify({ query, variables }));

      const newSearchParams = new URLSearchParams(
        convertHeadersArrayToObject(headersArray)
      );
      const newUrl = `/${lang}/graphiql/${endpointUrlBase64}/${bodyBase64}?${newSearchParams.toString()}`;

      if (newUrl !== window.location.pathname + window.location.search) {
        window.history.replaceState(null, '', newUrl);
      }
    } catch (error) {
      toast.error(t.errorMessages.header);
      toast.error(`${(error as Error).message}`);
    }
  };

  return (
    <ApolloProvider client={client}>
      <div className="w-[782px] p-4 bg-white rounded text-gray-700 min-h-screen">
        <h1 className="text-3xl font-bold mb-4">{t.title}</h1>
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
          onBodyChange={handleBodyChange}
          onBodyBlur={handleBodyBlur}
          onQueryExecute={handlePush}
          t={t}
        />
        <QueryResult
          queryResult={queryResult}
          error={error}
          statusCode={statusCode}
          loading={loading}
          t={t}
        />
        <SdlFetcher
          sdlUrl={sdlUrl}
          headers={convertHeadersArrayToObject(headersArray)}
          onSdlDataFetch={handleSdlDataFetch}
          t={t}
        />
        <SdlDocumentation t={t} sdlData={sdlData} />
        <ToastContainer />
      </div>
    </ApolloProvider>
  );
};

export default GraphQLClient;
