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
  if (!response) return null;

  return (
    <div className="bg-gray-100 p-4 border border-gray-300 rounded-lg">
      <h3 className="font-semibold">Response</h3>
      <p>Status: {response.status}</p>
      <h4>Headers:</h4>
      <pre className="whitespace-pre-wrap text-gray-700">
        {JSON.stringify(response.headers, null, 2)}
      </pre>
      <h4>Data:</h4>
      <pre className="whitespace-pre-wrap text-gray-700">
        {JSON.stringify(response.data, null, 2)}
      </pre>
      {response.error && (
        <div className="text-red-500">
          <h4>Error:</h4>
          <p>{response.error}</p>
        </div>
      )}
    </div>
  );
};

export default ResponseViewer;
