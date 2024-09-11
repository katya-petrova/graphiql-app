import React, { useState, useEffect } from 'react';
import gql from 'graphql-tag';
import { print } from 'graphql';
import UrlInput from '../../../components/UrlInput/UrlInput';
import TextAreaInput from '../../../components/TextAreaInput/TextAreaInput';
import HeaderInput from '../HeaderInput/HeaderInput';
import { Button } from '../../../components/Button/Button';
import { toast } from 'react-toastify';
import { Dictionary } from '@/utils/translation/getDictionary';

interface Header {
  key: string;
  value: string;
}

interface QueryFormProps {
  url: string;
  sdlUrl: string;
  query: string;
  variables: string;
  headers: string;
  onUrlChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSdlUrlChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onQueryChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onVariablesChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onHeadersChange: (headers: string) => void;
  onQueryExecute: () => void;
  t: Dictionary['graphiql'];
}

const QueryForm: React.FC<QueryFormProps> = ({
  url,
  sdlUrl,
  query,
  variables,
  headers,
  onUrlChange,
  onSdlUrlChange,
  onQueryChange,
  onVariablesChange,
  onHeadersChange,
  onQueryExecute,
  t,
}) => {
  const [headerKey, setHeaderKey] = useState('');
  const [headerValue, setHeaderValue] = useState('');
  const [headerList, setHeaderList] = useState<Header[]>([]);

  useEffect(() => {
    try {
      const parsedHeaders: Header[] = JSON.parse(headers) || [];
      if (Array.isArray(parsedHeaders)) {
        setHeaderList(parsedHeaders);
      }
    } catch {
      setHeaderList([]);
    }
  }, [headers]);

  const handleAddHeader = () => {
    if (headerKey && headerValue) {
      const newHeaderList = [
        ...headerList,
        { key: headerKey, value: headerValue },
      ];
      setHeaderList(newHeaderList);
      setHeaderKey('');
      setHeaderValue('');
      onHeadersChange(JSON.stringify(newHeaderList));
    }
  };

  const handleRemoveHeader = (index: number) => {
    const newHeaderList = headerList.filter((_, i) => i !== index);
    setHeaderList(newHeaderList);
    onHeadersChange(JSON.stringify(newHeaderList));
  };

  const handlePrettify = () => {
    try {
      const parsedQuery = gql(query);
      const beautifiedQuery = print(parsedQuery);
      onQueryChange({
        target: { value: beautifiedQuery },
      } as React.ChangeEvent<HTMLTextAreaElement>);
    } catch (error) {
      if (error instanceof Error) {
        toast.error(`${t.errorMessages.formatting}: ${error.message}`);
      } else {
        toast.error(t.errorMessages.unknown);
      }
    }
  };

  return (
    <div>
      <UrlInput
        label={`${t.endpointUrl}:`}
        value={url}
        onChange={onUrlChange}
        placeholder="https://example.com/graphql"
      />
      <UrlInput
        label="SDL URL:"
        value={sdlUrl}
        onChange={onSdlUrlChange}
        placeholder="https://example.com/graphql?sdl"
      />

      <HeaderInput
        keyValue={{ key: headerKey, value: headerValue }}
        onKeyChange={(e) => setHeaderKey(e.target.value)}
        onValueChange={(e) => setHeaderValue(e.target.value)}
        onAdd={handleAddHeader}
        t={t}
      />

      <ul>
        {headerList.length > 0 ? (
          headerList.map((header, index) => (
            <li key={index} className="mb-2 flex items-center space-x-2">
              <span className="mr-2">
                {header.key}: {header.value}
              </span>
              <Button onClick={() => handleRemoveHeader(index)}>
                {t.remove}
              </Button>
            </li>
          ))
        ) : (
          <li></li>
        )}
      </ul>

      <TextAreaInput
        label={`${t.query}:`}
        value={query}
        onChange={onQueryChange}
        placeholder={t.queryPlaceholder}
        rows={8}
      />

      <Button onClick={handlePrettify} className="mt-2 mb-4">
        {t.prettifyQuery}
      </Button>

      <TextAreaInput
        label={`${t.variables}:`}
        value={variables}
        onChange={onVariablesChange}
        placeholder={`{"id": "1", "name": "example"}`}
        rows={1}
      />

      <div className="mt-4">
        <Button onClick={onQueryExecute}>{t.sendRequest}</Button>
      </div>
    </div>
  );
};

export default QueryForm;
