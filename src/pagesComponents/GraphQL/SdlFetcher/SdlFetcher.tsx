'use client';

import { useState } from 'react';
import { toast } from 'react-toastify';
import { Button } from '@/components/Button/Button';
import Loader from '@/components/Loader/Loader';
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
      if (!sdlUrl) {
        throw new Error('URL is empty');
      }

      const response = await fetch(sdlUrl, {
        method: 'GET',
        headers: headers,
      });

      if (!response.ok) {
        if (response.status === 404) {
          // Handle 404 error gracefully
          throw new Error('SDL document not found');
        } else {
          throw new Error('Failed to fetch SDL data');
        }
      }

      const sdlText = await response.text();

      if (!sdlText.trim()) {
        throw new Error('No data found');
      }

      onSdlDataFetch(sdlText);
      toast.success(t.successfulMessages.SDL);
    } catch (error) {
      toast.error((error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {loading && <Loader />}
      <Button onClick={fetchSdlData} disabled={loading}>
        {t.requestSdl}
      </Button>
    </div>
  );
};

export default SdlFetcher;
