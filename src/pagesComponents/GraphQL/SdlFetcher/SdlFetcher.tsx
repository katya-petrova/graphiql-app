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
  const [urlError, setUrlError] = useState<string | null>(null);

  const validateUrl = (url: string): boolean => {
    const urlPattern = /^(https?:\/\/[^\s$.?#].[^\s]*)$/i;
    return urlPattern.test(url);
  };

  const fetchSdlData = async () => {
    setLoading(true);
    setUrlError(null);

    if (!validateUrl(sdlUrl)) {
      const errorMessage = 'Invalid URL format';
      setUrlError(errorMessage);
      setLoading(false);
      toast.error(`Error: ${errorMessage}`);
      return;
    }

    try {
      const response = await fetch('/api/graphql-sdl/fetch-sdl', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          sdlUrl,
          headers,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }

      const sdlData = await response.json();

      onSdlDataFetch(JSON.stringify(sdlData, null, 2));
    } catch (error) {
      toast.error((error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {loading && <Loader />}
      {urlError && <p className="error">{urlError}</p>}
      <Button onClick={fetchSdlData} disabled={loading}>
        {t.requestSdl}
      </Button>
    </div>
  );
};

export default SdlFetcher;
