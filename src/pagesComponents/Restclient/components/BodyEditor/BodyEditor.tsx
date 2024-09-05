import React, { useState } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { json } from '@codemirror/lang-json';
import { okaidia } from '@uiw/codemirror-theme-okaidia';
import { linter, lintGutter, Diagnostic } from '@codemirror/lint';

type BodyEditorProps = {
  body: string;
  setBody: (body: string) => void;
  updateUrl: () => void;
};

const BodyEditor: React.FC<BodyEditorProps> = ({
  body,
  setBody,
  updateUrl,
}) => {
  const [isJsonView, setIsJsonView] = useState(true);

  const toggleView = () => {
    setIsJsonView(!isJsonView);
  };

  const handleCodeChange = (value: string) => {
    setBody(value);
  };

  const handleBlur = () => {
    updateUrl();
  };

  const jsonLinter = linter((view) => {
    const results: Diagnostic[] = [];
    const content = view.state.doc.toString();
    if (content.trim() === '') {
      return results;
    }
    try {
      JSON.parse(content);
    } catch (e) {
      results.push({
        from: 0,
        to: view.state.doc.length,
        message: 'Invalid JSON',
        severity: 'error',
      });
    }
    return results;
  });

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
            value={body}
            height="200px"
            theme={okaidia}
            extensions={[json(), jsonLinter, lintGutter()]}
            onChange={handleCodeChange}
            onBlur={handleBlur}
            className="mt-4 rounded-lg border border-gray-300 overflow-hidden h-40"
          />
        </div>
      ) : (
        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          onBlur={handleBlur}
          placeholder="Request body"
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition duration-300 resize-none h-40"
        />
      )}
    </div>
  );
};

export default BodyEditor;
