'use client';

import { useState } from 'react';
import { Button } from '../../../components/Button/Button';
import Loader from '../../../components/Loader/Loader';
import { toast } from 'react-toastify';
import { Dictionary } from '@/utils/translation/getDictionary';

interface SdlFetcherProps {
  sdlUrl: string;
  headers: Record<string, string>;
  onSdlDataFetch: (data: string) => void;
  t: Dictionary['graphiql'];
}

const SdlFetcher: React.FC<SdlFetcherProps> = ({
  sdlUrl,
  headers,
  onSdlDataFetch,
  t,
}) => {
  const [loading, setLoading] = useState(false);

  const fetchSdlData = async () => {
    setLoading(true);
    try {
      const response = await fetch(sdlUrl, {
        method: 'GET',
        headers: headers as HeadersInit,
      });

      if (!response.ok) {
        throw new Error('Failed to fetch SDL data');
      }

      const sdlText = await response.text();
      onSdlDataFetch(sdlText);
    } catch (error) {
      toast.error(`Error fetching SDL data: ${(error as Error).message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {loading && <Loader />}
      <Button onClick={fetchSdlData}>{t.requestSdl}</Button>
    </div>
  );
};

export default SdlFetcher;
