import React from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';
import { json } from '@codemirror/lang-json';
import { okaidia } from '@uiw/codemirror-theme-okaidia';
import { useTranslation } from '@/context/TranslationContext';

type ApiResponse = {
  status: number;
  data: Record<string, unknown> | null;
  headers: Record<string, string>;
  error?: string;
};

type ResponseViewerProps = {
  response: ApiResponse | null;
};

const ResponseViewer: React.FC<ResponseViewerProps> = ({ response }) => {
  const { rest } = useTranslation();

  if (!response) return null;

  const formattedData = response.data
    ? JSON.stringify(response.data, null, 2)
    : '';

  const getStatusColor = (status: number) => {
    if (status >= 200 && status < 300) return 'text-green-500';
    if (status >= 300 && status < 400) return 'text-blue-500';
    if (status >= 400 && status < 500) return 'text-orange-500';
    if (status >= 500) return 'text-red-500';
    return 'text-gray-700';
  };

  const statusColor = getStatusColor(response.status);

  return (
    <div className="bg-gray-100 p-4 border border-gray-300 rounded-lg">
      {response.error ? (
        <div className="text-red-500 mt-4 flex flex-col items-center">
          <ExclamationTriangleIcon className="h-10 w-10" />
          <h4>{rest.error}:</h4>
          <p>{response.error}</p>
        </div>
      ) : (
        <>
          <h3 className="font-semibold">{rest.response}</h3>
          <p className={`font-semibold ${statusColor}`}>
            {rest.status}: {response.status}
          </p>

          <CodeMirror
            value={formattedData}
            height="300px"
            theme={okaidia}
            extensions={[json()]}
            readOnly={true}
            className="mt-2 rounded-lg border border-gray-300 overflow-hidden"
            style={{ width: '700px' }}
          />
        </>
      )}
    </div>
  );
};

export default ResponseViewer;
