import React, { useEffect } from 'react';
import { toast } from 'react-toastify';
import Loader from '../../Loader/Loader';

interface QueryResultProps {
  queryResult: any;
  error: string | null;
  statusCode: number | null;
  loading: boolean;
}

const QueryResult: React.FC<QueryResultProps> = ({
  queryResult,
  error,
  statusCode,
  loading,
}) => {
  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  return (
    <div className="mt-6">
      {loading && <Loader />}
      {statusCode && <p className="text-gray-400">Status: {statusCode}</p>}
      {queryResult && (
        <pre className="bg-gray p-2 rounded text-gray-700">
          {JSON.stringify(queryResult, null, 2)}
        </pre>
      )}
    </div>
  );
};

export default QueryResult;
