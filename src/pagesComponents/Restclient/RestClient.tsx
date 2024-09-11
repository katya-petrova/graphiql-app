'use client';
import React, { useState, useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import MethodSelector from './components/MethodSelector/MethodSelector';
import EndpointInput from './components/EndpointInput/EndpointInput';
import HeadersEditor from './components/HeadersEditor/HeadersEditor';
import BodyEditor from './components/BodyEditor/BodyEditor';
import VariablesSection from './components/VariablesSection/VariablesSection';
import ResponseViewer from './components/ResponseViewer/ResponseViewer';
import { toast } from 'react-toastify';
import { getLangFromUrlOrCookie } from '@/utils/getCurrentLanguage/getCurrentLanguage';
import { saveRestRequestToHistory } from '@/utils/RestfulClientServices/historyService/historyService';
import { replaceVariablesInBody } from '@/utils/RestfulClientServices/requestService/requestService';
import {
  getFromLocalStorage,
  saveToLocalStorage,
} from '@/utils/RestfulClientServices/storageService/storageService';
import {
  decodeBase64,
  buildNewUrl,
} from '@/utils/RestfulClientServices/urlService/urlService';

export type RequestHistoryItem = {
  request_url: string;
  link: string;
  time: string;
};
const Restclient: React.FC = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [method, setMethod] = useState('GET');
  const [endpoint, setEndpoint] = useState('');
  const [headers, setHeaders] = useState<[string, string][]>([]);
  const [body, setBody] = useState('');
  const [response, setResponse] = useState(null);
  const [history, setHistory] = useState<RequestHistoryItem[]>([]);
  const [variables, setVariables] = useState<{ key: string; value: string }[]>(
    []
  );
  const [initialLoad, setInitialLoad] = useState(true);

  useEffect(() => {
    const pathParts = pathname.split('/');
    setMethod(pathParts[3] || 'GET');
    setEndpoint(decodeBase64(pathParts[4] || ''));
    setBody(decodeBase64(pathParts[5] || ''));

    const parsedHeaders: [string, string][] = [];
    for (const [key, value] of new URLSearchParams(
      searchParams.toString()
    ).entries()) {
      parsedHeaders.push([key, decodeURIComponent(value)]);
    }
    setHeaders(parsedHeaders);

    setVariables(
      getFromLocalStorage<{ key: string; value: string }[]>('variables', [])
    );
    setHistory(getFromLocalStorage<RequestHistoryItem[]>('requestHistory', []));

    setInitialLoad(false);
  }, [pathname, searchParams]);

  const updateUrl = () => {
    const lang = getLangFromUrlOrCookie(pathname);
    const newUrl = buildNewUrl(lang, method, endpoint, body, headers);

    if (newUrl !== window.location.pathname + window.location.search) {
      window.history.replaceState(null, '', newUrl);
    }

    return newUrl;
  };

  useEffect(() => {
    if (!initialLoad) {
      updateUrl();
      saveToLocalStorage('variables', variables);
    }
  }, [method, endpoint, headers, body, variables, initialLoad]);

  const handleRequest = async () => {
    const updatedBody = replaceVariablesInBody(body, variables);
    const newUrl = updateUrl();

    try {
      const res = await fetch(`/api/sendRequest/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ method, endpoint, headers, body: updatedBody }),
      });

      const data = await res.json();
      setResponse(data);

      saveRestRequestToHistory(newUrl, method, endpoint, history, setHistory);
    } catch (error) {
      toast.error(`Request Error: ${error}`);
    }
  };

  return (
    <div className="w-[782px] mx-auto p-6 bg-white shadow-md rounded-lg space-y-6 text-gray-800">
      <MethodSelector method={method} setMethod={setMethod} />
      <EndpointInput
        endpoint={endpoint}
        setEndpoint={setEndpoint}
        updateUrl={updateUrl}
      />
      <HeadersEditor
        headers={headers}
        setHeaders={setHeaders}
        updateUrl={updateUrl}
      />
      <VariablesSection
        variables={variables}
        setVariables={setVariables}
        updateBodyWithVariables={() =>
          setBody(replaceVariablesInBody(body, variables))
        }
      />
      <BodyEditor
        body={body}
        setBody={setBody}
        updateUrl={updateUrl}
        variables={variables}
      />
      <button
        onClick={handleRequest}
        className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300"
      >
        Send Request
      </button>
      <ResponseViewer response={response} />
    </div>
  );
};

export default Restclient;
