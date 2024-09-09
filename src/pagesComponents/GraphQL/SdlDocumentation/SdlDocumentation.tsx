import React from 'react';

interface SdlDocumentationProps {
  sdlData: string | null;
}

const SdlDocumentation: React.FC<SdlDocumentationProps> = ({ sdlData }) => {
  if (!sdlData) {
    return null;
  }

  return (
    <div className="mt-2 max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-2">SDL Documentation</h2>
      <div className="bg-gray-100 p-4 rounded text-gray-700 overflow-auto">
        <pre className="whitespace-pre-wrap break-words text-xs">{sdlData}</pre>
      </div>
    </div>
  );
};

export default SdlDocumentation;
