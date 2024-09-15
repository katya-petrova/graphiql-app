import React, { useEffect } from 'react';
import { toast } from 'react-toastify';
import Loader from '../../../components/Loader/Loader';
import { Dictionary } from '@/utils/translation/getDictionary';

interface QueryResultProps {
  queryResult: string;
  error: string | null;
  statusCode: number | null;
  loading: boolean;
  t: Dictionary['graphiql'];
}

const QueryResult: React.FC<QueryResultProps> = ({
  queryResult,
  error,
  statusCode,
  loading,
  t,
}) => {
  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  return (
    <div className="mt-6">
      {loading && <Loader />}
      {statusCode && (
        <p className="text-gray-400">
          {t.status}: {statusCode}
        </p>
      )}
      {queryResult && (
        <pre className="bg-gray p-2 rounded text-gray-700">
          {JSON.stringify(queryResult, null, 2)}
        </pre>
      )}
    </div>
  );
};

export default QueryResult;
