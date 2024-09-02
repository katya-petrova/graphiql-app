import React, { useState, useEffect } from 'react';
import UrlInput from '../../UrlInput/UrlInput';
import TextAreaInput from '../../TextAreaInput/TextAreaInput';
import HeaderInput from '../HeaderInput/HeaderInput';
import { Button } from '../../Button/Button';

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

      <HeaderInput
        keyValue={{ key: headerKey, value: headerValue }}
        onKeyChange={(e) => setHeaderKey(e.target.value)}
        onValueChange={(e) => setHeaderValue(e.target.value)}
        onAdd={handleAddHeader}
      />

      <ul>
        {headerList.length > 0 ? (
          headerList.map((header, index) => (
            <li key={index} className="mb-2 flex items-center space-x-2">
              <span className="mr-2">
                {header.key}: {header.value}
              </span>
              <Button onClick={() => handleRemoveHeader(index)}>Remove</Button>
            </li>
          ))
        ) : (
          <li></li>
        )}
      </ul>

      <TextAreaInput
        label="Query:"
        value={query}
        onChange={onQueryChange}
        placeholder="Enter your GraphQL query"
        rows={8}
      />
      <TextAreaInput
        label="Variables:"
        value={variables}
        onChange={onVariablesChange}
        placeholder={`{"id": "1", "name": "example"}`}
        rows={4}
      />

      <div className="mt-4">
        <Button onClick={onQueryExecute}>Send Request</Button>
      </div>
    </div>
  );
};

export default QueryForm;
