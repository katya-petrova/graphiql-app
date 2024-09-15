import { describe, it, expect } from 'vitest';
import { buildNewUrl, encodeBase64 } from './urlService';

describe('Base64 Encoding and Decoding', () => {
  it('should correctly encode a string to Base64', () => {
    const input = 'Hello World!';
    const expectedOutput = 'SGVsbG8gV29ybGQh';
    const result = encodeBase64(input);
    expect(result).toBe(expectedOutput);
  });

  describe('URL Building', () => {
    it('should construct a URL with a method and endpoint', () => {
      const lang = 'en';
      const method = 'GET';
      const endpoint = 'api/data';
      const body = '';
      const headers: [string, string][] = [];
      const result = buildNewUrl(lang, method, endpoint, body, headers);
      expect(result).toBe(`/en/restclient/GET/YXBpL2RhdGE=`);
    });

    it('should append encoded body if body is not empty', () => {
      const lang = 'en';
      const method = 'POST';
      const endpoint = 'api/submit';
      const body = 'data={ "key": "value" }';
      const headers: [string, string][] = [];
      const result = buildNewUrl(lang, method, endpoint, body, headers);
      expect(result.includes('ZGF0YT17ICJrZXkiOiAidmFsdWUiIH0=')).toBeTruthy();
    });

    it('should correctly append multiple headers', () => {
      const lang = 'en';
      const method = 'GET';
      const endpoint = 'api/users';
      const body = '';
      const headers: [string, string][] = [
        ['Accept', 'application/json'],
        ['Cache-Control', 'no-cache'],
      ];

      const result = buildNewUrl(lang, method, endpoint, body, headers);

      const expectedParams = 'Accept=application%2Fjson&Cache-Control=no-cache';
      expect(result.includes(`?${expectedParams}`)).toBeTruthy();
      expect(result.startsWith('/en/restclient/GET/YXBpL3VzZXJz')).toBeTruthy();
    });
  });
});
