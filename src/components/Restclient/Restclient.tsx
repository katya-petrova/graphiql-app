'use client';
import React, { useState, useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { auth } from '@/utils/firebase/firebaseConfig';
import MethodSelector from './components/MethodSelector/MethodSelector';
import EndpointInput from './components/EndpointInput/EndpointInput';
import HeadersEditor from './components/HeadersEditor/HeadersEditor';
import BodyEditor from './components/BodyEditor/BodyEditor';
import ResponseViewer from './components/ResponseViewer/ResponseViewer';

const Restclient: React.FC = () => {
  const [user] = useAuthState(auth);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [method, setMethod] = useState('GET');
  const [endpoint, setEndpoint] = useState('');
  const [headers, setHeaders] = useState<[string, string][]>([]);
  const [body, setBody] = useState('');
  const [response, setResponse] = useState(null);

  const getLangFromUrlOrCookie = (pathname: string) => {
    const pathParts = pathname.split('/');
    const urlLang = pathParts[1];

    if (urlLang) {
      return urlLang;
    }
    const cookies = document.cookie.split(';');
    for (let cookie of cookies) {
      const [key, value] = cookie.trim().split('=');
      if (key === 'i18nlang') {
        return value;
      }
    }
    return 'en';
  };

  useEffect(() => {
    const pathParts = pathname.split('/');
    const method = pathParts[3] || 'GET';
    const endpointBase64 = pathParts[4] || '';
    const bodyBase64 = pathParts[5] || '';

    setMethod(method);
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
  }, [pathname, searchParams]);

  const updateUrl = () => {
    const lang = getLangFromUrlOrCookie(pathname); // Use pathname from hook
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

    window.history.replaceState(null, '', newUrl);
  };

  useEffect(() => {
    updateUrl();
  }, [endpoint]);

  useEffect(() => {
    updateUrl();
  }, [method, headers]);

  const handleRequest = async () => {
    updateUrl();

    const lang = getLangFromUrlOrCookie(pathname);

    try {
      const res = await fetch(`/${lang}/api/sendRequest/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ method, endpoint, headers, body }),
      });

      const data = await res.json();
      setResponse(data);
    } catch (error) {
      console.error('Request Error:', error);
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
