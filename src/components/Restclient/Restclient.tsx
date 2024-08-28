'use client';
import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useRouter } from 'next/navigation';
import { auth } from '@/utils/firebase/firebaseConfig';
import MethodSelector from './components/MethodSelector/MethodSelector';
import EndpointInput from './components/EndpointInput/EndpointInput';
import HeadersEditor from './components/HeadersEditor/HeadersEditor';
import BodyEditor from './components/BodyEditor/BodyEditor';
import ResponseViewer from './components/ResponseViewer/ResponseViewer';

const Restclient: React.FC = () => {
  const [user] = useAuthState(auth);
  const router = useRouter();
  const [method, setMethod] = useState('GET');
  const [endpoint, setEndpoint] = useState('');
  const [headers, setHeaders] = useState<[string, string][]>([]);
  const [body, setBody] = useState('');
  const [response, setResponse] = useState(null);

  useEffect(() => {
    if (!user) router.push('/signin');
  }, [user, router]);

  const handleRequest = async () => {
    const encodedUrl = btoa(endpoint);
    const encodedBody = btoa(body);

    const queryParams = headers
      .map(
        ([key, value]) =>
          `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
      )
      .join('&');

    const requestUrl = `/${method}/${encodedUrl}?${queryParams}`;

    // Fetch response
    // const res = await fetch(requestUrl, {
    //   method,
    //   headers: headers.reduce((acc, [key, value]) => {
    //     acc[key] = value;
    //     return acc;
    //   }, {}),
    //   body: method !== 'GET' && method !== 'HEAD' ? body : undefined,
    // });

    // const data = await res.json();
    // setResponse(data);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg space-y-6 text-gray-800">
      <MethodSelector method={method} setMethod={setMethod} />
      <EndpointInput endpoint={endpoint} setEndpoint={setEndpoint} />
      <HeadersEditor headers={headers} setHeaders={setHeaders} />
      <BodyEditor body={body} setBody={setBody} />
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
