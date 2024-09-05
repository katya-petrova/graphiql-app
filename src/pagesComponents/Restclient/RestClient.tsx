'use client';
import React, { useState, useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import MethodSelector from './components/MethodSelector/MethodSelector';
import EndpointInput from './components/EndpointInput/EndpointInput';
import HeadersEditor from './components/HeadersEditor/HeadersEditor';
import BodyEditor from './components/BodyEditor/BodyEditor';
import ResponseViewer from './components/ResponseViewer/ResponseViewer';
import { toast } from 'react-toastify';
import { getLangFromUrlOrCookie } from '@/utils/getCurrentLanguage/getCurrentLanguage';
import { saveRestRequestToHistory } from '@/utils/historyService/historyService';

const Restclient: React.FC = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [method, setMethod] = useState('GET');
  const [endpoint, setEndpoint] = useState('');
  const [headers, setHeaders] = useState<[string, string][]>([]);
  const [body, setBody] = useState('');
  const [response, setResponse] = useState(null);
  const [history, setHistory] = useState<any[]>([]);
  const [initialLoad, setInitialLoad] = useState(true);

  useEffect(() => {
    const pathParts = pathname.split('/');
    const initialMethod = pathParts[3] || 'GET';
    const endpointBase64 = pathParts[4] || '';
    const bodyBase64 = pathParts[5] || '';

    setMethod(initialMethod);
    setEndpoint(
      endpointBase64
        ? Buffer.from(endpointBase64, 'base64').toString('utf-8')
        : ''
    );
    setBody(
      bodyBase64 ? Buffer.from(bodyBase64, 'base64').toString('utf-8') : ''
    );

    const headerParams = new URLSearchParams(searchParams.toString());
    const parsedHeaders: [string, string][] = [];
    for (const [key, value] of headerParams.entries()) {
      parsedHeaders.push([key, decodeURIComponent(value)]);
    }
    setHeaders(parsedHeaders);

    const savedHistory = JSON.parse(
      localStorage.getItem('requestHistory') || '[]'
    );
    setHistory(savedHistory);

    setInitialLoad(false);
  }, []);

  const updateUrl = () => {
    const lang = getLangFromUrlOrCookie(pathname);
    const encodedEndpoint = Buffer.from(endpoint).toString('base64');
    const encodedBody = body ? Buffer.from(body).toString('base64') : '';
    let newUrl = `/${lang}/restclient/${method}/${encodedEndpoint}`;
    if (body) {
      newUrl += `/${encodedBody}`;
    }

    if (headers.length > 0) {
      const headerParams = headers
        .map(
          ([key, value]) =>
            `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
        )
        .join('&');
      newUrl += `?${headerParams}`;
    }

    if (newUrl !== window.location.pathname + window.location.search) {
      window.history.replaceState(null, '', newUrl);
    }

    return newUrl;
  };

  useEffect(() => {
    if (!initialLoad) {
      updateUrl();
    }
  }, [method, endpoint, headers, body, initialLoad]);

  const handleRequest = async () => {
    const newUrl = updateUrl();

    const lang = getLangFromUrlOrCookie(pathname);

    try {
      const res = await fetch(`/api/sendRequest/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ method, endpoint, headers, body }),
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
      <BodyEditor body={body} setBody={setBody} updateUrl={updateUrl} />
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
