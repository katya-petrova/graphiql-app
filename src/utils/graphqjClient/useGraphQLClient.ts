import { useState, useEffect } from 'react';
import { ApolloClient, InMemoryCache } from '@apollo/client';

const useGraphQLClient = (
  initialUrl: string,
  initialHeaders: Record<string, string>
) => {
  const [url, setUrl] = useState<string>(initialUrl);
  const [headers, setHeaders] =
    useState<Record<string, string>>(initialHeaders);
  const [client, setClient] = useState(
    new ApolloClient({
      uri: url,
      cache: new InMemoryCache(),
      headers: headers,
    })
  );

  useEffect(() => {
    setClient(
      new ApolloClient({
        uri: url,
        cache: new InMemoryCache(),
        headers: headers,
      })
    );
  }, [url, headers]);

  return {
    client,
    setUrl,
    setHeaders,
    headers,
  };
};

export default useGraphQLClient;
