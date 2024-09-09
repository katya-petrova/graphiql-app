export const encodeBase64 = (input: string): string =>
  Buffer.from(input).toString('base64');

export const decodeBase64 = (input: string): string =>
  Buffer.from(input, 'base64').toString('utf-8');

export const buildNewUrl = (
  lang: string,
  method: string,
  endpoint: string,
  body: string,
  headers: [string, string][]
): string => {
  const encodedEndpoint = encodeBase64(endpoint);
  const encodedBody = body ? encodeBase64(body) : '';
  let newUrl = `/${lang}/restclient/${method}/${encodedEndpoint}`;
  if (body) {
    newUrl += `/${encodedBody}`;
  }

  if (headers.length > 0) {
    const headerParams = headers
      .map(
        ([key, value]) =>
          `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
      )
      .join('&');
    newUrl += `?${headerParams}`;
  }

  return newUrl;
};
