import React, { useState, useEffect } from 'react';
import gql from 'graphql-tag';
import { print } from 'graphql';
import UrlInput from '../../../components/UrlInput/UrlInput';
import TextAreaInput from '../../../components/TextAreaInput/TextAreaInput';
import HeaderInput from '../HeaderInput/HeaderInput';
import { Button } from '../../../components/Button/Button';
import { toast } from 'react-toastify';
import HeaderList from '../HeaderList/HeaderList';

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
  onBodyChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onBodyBlur: (e: React.FocusEvent<HTMLTextAreaElement>) => void;
  onHeadersChange: (headers: string) => void;
  onQueryExecute: () => void;
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
  onBodyChange,
  onBodyBlur,
}) => {
  const [headerKey, setHeaderKey] = useState('');
  const [headerValue, setHeaderValue] = useState('');
  const [headerList, setHeaderList] = useState<Header[]>([]);
  const [headersVisible, setHeadersVisible] = useState(false);

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
        toast.error(`Error formatting query: ${error.message}`);
      } else {
        toast.error('An unknown error occurred');
      }
    }
  };

  const toggleHeadersVisibility = () => {
    setHeadersVisible(!headersVisible);
  };

  return (
    <div>
      <UrlInput
        label="Endpoint URL:"
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

      <button
        className="bg-gray-200 text-gray-700 py-2 px-4 rounded mb-4"
        onClick={toggleHeadersVisibility}
      >
        {headersVisible ? 'Hide Headers' : 'Show Headers'}
      </button>

      {headersVisible && (
        <>
          <HeaderInput
            keyValue={{ key: headerKey, value: headerValue }}
            onKeyChange={(e) => setHeaderKey(e.target.value)}
            onValueChange={(e) => setHeaderValue(e.target.value)}
            onAdd={handleAddHeader}
          />

          <HeaderList
            headers={headerList}
            onRemoveHeader={handleRemoveHeader}
          />
        </>
      )}

      <TextAreaInput
        label="Query:"
        value={query}
        onChange={(e) => {
          onQueryChange(e);
          onBodyChange(e);
        }}
        onBlur={onBodyBlur}
        placeholder="Enter your GraphQL query"
        rows={8}
      />

      <Button onClick={handlePrettify} className="mt-2 mb-4">
        Prettify
      </Button>

      <TextAreaInput
        label="Variables:"
        value={variables}
        onChange={onVariablesChange}
        placeholder={`{"id": "1", "name": "example"}`}
        rows={1}
      />

      <div className="mt-4">
        <Button onClick={onQueryExecute}>Send Request</Button>
      </div>
    </div>
  );
};

export default QueryForm;
