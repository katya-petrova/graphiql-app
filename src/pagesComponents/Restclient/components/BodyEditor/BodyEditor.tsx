import React, { useState, useEffect } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { json } from '@codemirror/lang-json';
import { okaidia } from '@uiw/codemirror-theme-okaidia';
import { linter, lintGutter, Diagnostic } from '@codemirror/lint';

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
  const [originalBody, setOriginalBody] = useState(body);

  useEffect(() => {
    setLocalBody(body);
    setOriginalBody(body);
  }, [body]);

  const handleCodeChange = (value: string) => {
    setLocalBody(value);
    setOriginalBody(value);
    setBody(value);
    updateUrl();
  };

  const handleBlur = () => {
    updateUrl();
  };

  const toggleView = () => {
    setIsJsonView(!isJsonView);
  };

  const replaceVariablesForLinting = (content: string) => {
    let lintingContent = content;
    variables.forEach(({ key }) => {
      const regex = new RegExp(`{{${key}}}`, 'g');
      lintingContent = lintingContent.replace(regex, `"${key}_placeholder"`);
    });
    return lintingContent;
  };

  const jsonLinter = linter((view) => {
    const results: Diagnostic[] = [];
    const content = view.state.doc.toString();
    const lintingContent = replaceVariablesForLinting(content);

    if (lintingContent.trim() === '') {
      return results;
    }

    try {
      JSON.parse(lintingContent);
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
            value={localBody}
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
