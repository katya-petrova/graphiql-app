import React, { useState, useEffect } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { json } from '@codemirror/lang-json';
import { okaidia } from '@uiw/codemirror-theme-okaidia';
import { lintGutter } from '@codemirror/lint';
import { jsonLinter } from '@/utils/RestfulClientServices/codemirrorService/codemirrorService';

type BodyEditorProps = {
  body: string;
  setBody: (body: string) => void;
  updateUrl: () => void;
  variables: { key: string; value: string }[];
};

const BodyEditor: React.FC<BodyEditorProps> = ({
  body,
  setBody,
  updateUrl,
  variables,
}) => {
  const [isJsonView, setIsJsonView] = useState(true);
  const [localBody, setLocalBody] = useState(body);

  useEffect(() => {
    setLocalBody(body);
  }, [body]);

  const handleCodeChange = (value: string) => {
    setLocalBody(value);
  };

  const handleBlur = () => {
    if (localBody !== body) {
      setBody(localBody);
      updateUrl();
    }
  };

  const toggleView = () => {
    setIsJsonView(!isJsonView);
  };

  return (
    <div className="space-y-4">
      <button
        onClick={toggleView}
        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300"
      >
        {isJsonView ? 'Switch to Text View' : 'Switch to JSON View'}
      </button>

      {isJsonView ? (
        <div className="mt-4">
          <CodeMirror
            value={localBody}
            height="200px"
            theme={okaidia}
            extensions={[json(), jsonLinter(variables), lintGutter()]}
            onChange={handleCodeChange}
            onBlur={handleBlur}
            className="mt-4 rounded-lg border border-gray-300 overflow-hidden h-40"
          />
        </div>
      ) : (
        <textarea
          value={localBody}
          onChange={(e) => handleCodeChange(e.target.value)}
          onBlur={handleBlur}
          placeholder="Request body"
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition duration-300 resize-none h-40"
        />
      )}
    </div>
  );
};

export default BodyEditor;
