import React, { useState } from 'react';
import { XMarkIcon, PencilIcon } from '@heroicons/react/24/solid';
import './HederEditor.css';

type HeadersEditorProps = {
  headers: [string, string][];
  setHeaders: (headers: [string, string][]) => void;
  updateUrl: () => void;
};

const HeadersEditor: React.FC<HeadersEditorProps> = ({
  headers,
  setHeaders,
  updateUrl,
}) => {
  const [key, setKey] = useState('');
  const [value, setValue] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [editKey, setEditKey] = useState('');
  const [editValue, setEditValue] = useState('');

  const headerKeyPattern = /^[\w\-\/]+$/;
  const headerValuePattern = /^[\w\s\-\/\:\,\.]+$/;

  const addHeader = () => {
    if (!key || !value) {
      setError('Both key and value are required.');
      return;
    }
    if (!headerKeyPattern.test(key)) {
      setError(
        'Header key must contain only Latin letters, digits, dashes, underscores, or slashes.'
      );
      return;
    }
    if (!headerValuePattern.test(value)) {
      setError('Header value contains invalid characters.');
      return;
    }
    setHeaders([...headers, [key, value] as [string, string]]);
    setKey('');
    setValue('');
    setError(null);
    updateUrl();
  };

  const startEdit = (index: number) => {    
    setEditIndex(index);
    setEditKey(headers[index][0]);
    setEditValue(headers[index][1]);
  };

  const saveEdit = () => {
    if (!editKey || !editValue) {
      setError('Both key and value are required.');
      return;
    }    
    if (!headerKeyPattern.test(editKey)) {
      setError(
        'Header key must contain only Latin letters, digits, dashes, underscores, or slashes.'
      );
      return;
    }
    if (!headerValuePattern.test(editValue)) {
      setError('Header value contains invalid characters.');
      return;
    }
    const updatedHeaders: [string, string][] = headers.map((header, index) =>
      index === editIndex ? ([editKey, editValue] as [string, string]) : header
    );
    setHeaders(updatedHeaders);
    setEditIndex(null);
    setEditKey('');
    setEditValue('');
    setError(null);
    updateUrl();
  };

  const removeHeader = (index: number) => {
    setHeaders(headers.filter((_, i) => i !== index));
    updateUrl();
  };

  return (
    <div>
      <div>
        <input
          type="text"
          placeholder="Header Key"
          value={key}
          onChange={(e) => setKey(e.target.value)}
          className="border p-2 m-1 rounded-lg"
        />
        <input
          type="text"
          placeholder="Header Value"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="border p-2 m-1 rounded-lg"
        />
        <button
          onClick={addHeader}
          className="bg-blue-500 text-white py-2 px-3 rounded"
        >
          Add Header
        </button>
        {error && <p className="text-red-500">{error}</p>}
      </div>
      <ul>
        {headers.map(([k, v], index) => (
          <li key={index} className="flex justify-between items-center mb-1">
            {editIndex === index ? (
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={editKey}
                  onChange={(e) => setEditKey(e.target.value)}
                  className="border p-2"
                />
                <input
                  type="text"
                  value={editValue}
                  onChange={(e) => setEditValue(e.target.value)}
                  className="border p-2"
                />
                <button
                  onClick={saveEdit}
                  className="bg-green-500 text-white py-1 px-2 rounded"
                >
                  Save
                </button>
                <button
                  onClick={() => setEditIndex(null)}
                  className="bg-gray-500 text-white py-1 px-2 rounded"
                >
                  Cancel
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <span className="truncate">
                  {k}: {v}
                </span>
                <button
                  onClick={() => startEdit(index)}
                  aria-label={`Edit header ${index}`}
                  className="text-blue-500 hover:text-blue-700 transition"
                >
                  <PencilIcon className="h-5 w-5" />
                </button>
                <button
                  onClick={() => removeHeader(index)}
                  aria-label={`Remove header ${index}`}
                  className="text-red-500 hover:text-red-700 transition"
                >
                  <XMarkIcon className="h-5 w-5" />
                </button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HeadersEditor;