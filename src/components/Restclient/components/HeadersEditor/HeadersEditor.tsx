import React, { useState } from 'react';

type HeadersEditorProps = {
  headers: [string, string][];
  setHeaders: (headers: [string, string][]) => void;
};

const HeadersEditor: React.FC<HeadersEditorProps> = ({
  headers,
  setHeaders,
}) => {
  const [key, setKey] = useState('');
  const [value, setValue] = useState('');

  const addHeader = () => {
    setHeaders([...headers, [key, value]]);
    setKey('');
    setValue('');
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Header Key"
        value={key}
        onChange={(e) => setKey(e.target.value)}
        className="border p-2 m-1"
      />
      <input
        type="text"
        placeholder="Header Value"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="border p-2 m-1"
      />
      <button
        onClick={addHeader}
        className="bg-blue-500 text-white py-1 px-3 rounded"
      >
        Add Header
      </button>
      <ul>
        {headers.map(([k, v], index) => (
          <li key={index}>
            {k}: {v}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HeadersEditor;
