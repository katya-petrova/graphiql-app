import { render, screen, fireEvent, act } from '@testing-library/react';
import { describe, it, vi, beforeEach, afterEach } from 'vitest';
import Restclient from './RestClient';
import { TranslationProvider } from '@/context/TranslationContext';
import en from '@/utils/translation/dictionaries/en.json';

vi.mock('next/navigation', () => ({
  usePathname: () => '/en/restclient/GET/',
  useSearchParams: () => new URLSearchParams(),
}));

vi.mock('@/utils/getCurrentLanguage/getCurrentLanguage', () => ({
  getLangFromUrlOrCookie: () => 'en',
}));

vi.mock('@/utils/historyService/historyService', () => ({
  saveRestRequestToHistory: vi.fn(),
}));

vi.mock('react-toastify', () => ({
  toast: {
    error: vi.fn(),
  },
}));

describe('Restclient Component', () => {
  beforeEach(() => {
    vi.spyOn(window.history, 'replaceState').mockImplementation(vi.fn());
    vi.spyOn(global, 'fetch').mockResolvedValue({
      ok: true,
      status: 200,
      json: () => Promise.resolve({ response: 'success' }),
      text: () => Promise.resolve('success'),
      headers: {
        get: vi.fn(),
      },
      blob: () => Promise.resolve(new Blob()),
      clone: vi.fn(),
      body: null,
      bodyUsed: false,
      redirected: false,
      statusText: 'OK',
      type: 'default',
      url: 'fakeurl',
    } as unknown as Response);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('renders without crashing', () => {
    render(
      <TranslationProvider t={en}>
        <Restclient t={en.rest} />
      </TranslationProvider>
    );
    const button = screen.getByText(/Send Request/i);
    expect(button).toBeInTheDocument();
  });

  it('updates method when MethodSelector is changed', () => {
    render(
      <TranslationProvider t={en}>
        <Restclient t={en.rest} />
      </TranslationProvider>
    );
    const methodSelect = screen.getByRole('combobox');
    act(() => {
      fireEvent.change(methodSelect, { target: { value: 'POST' } });
    });
    expect(methodSelect).toHaveValue('POST');
  });

  it('updates endpoint when EndpointInput is changed', () => {
    render(
      <TranslationProvider t={en}>
        <Restclient t={en.rest} />
      </TranslationProvider>
    );
    const input = screen.getByPlaceholderText('Enter endpoint');
    act(() => {
      fireEvent.change(input, { target: { value: 'https://api.example.com' } });
    });
    expect(input).toHaveValue('https://api.example.com');
  });

  it('updates headers when HeadersEditor is changed', () => {
    render(
      <TranslationProvider t={en}>
        <Restclient t={en.rest} />
      </TranslationProvider>
    );
    const headersKeyInput = screen.getByPlaceholderText('Header Key');
    const headersValueInput = screen.getByPlaceholderText('Header Value');
    act(() => {
      fireEvent.change(headersKeyInput, { target: { value: 'Content-Type' } });
      fireEvent.change(headersValueInput, {
        target: { value: 'application/json' },
      });
    });
    expect(headersKeyInput).toHaveValue('Content-Type');
    expect(headersValueInput).toHaveValue('application/json');
  });

  it('checks URL update through the updateUrl method', async () => {
    const { getByText, getByPlaceholderText } = render(
      <TranslationProvider t={en}>
        <Restclient t={en.rest} />
      </TranslationProvider>
    );
    const endpointInput = getByPlaceholderText('Enter endpoint');

    await act(async () => {
      fireEvent.change(endpointInput, {
        target: { value: 'https://api.example.com' },
      });
      fireEvent.click(getByText(/Send Request/i));
    });

    expect(window.history.replaceState).toHaveBeenCalled();
  });

  it('should add headers to the URL when headers are present', async () => {
    const { getByText, getByPlaceholderText } = render(
      <TranslationProvider t={en}>
        <Restclient t={en.rest} />
      </TranslationProvider>
    );
    const endpointInput = getByPlaceholderText('Enter endpoint');

    await act(async () => {
      fireEvent.change(endpointInput, { target: { value: '/api/test' } });

      const headersKeyInput = screen.getByPlaceholderText('Header Key');
      const headersValueInput = screen.getByPlaceholderText('Header Value');

      fireEvent.change(headersKeyInput, { target: { value: 'Authorization' } });
      fireEvent.change(headersValueInput, {
        target: { value: 'Bearer token' },
      });

      fireEvent.click(screen.getByText(/Add Header/i));

      fireEvent.click(getByText(/Send Request/i));
    });

    const expectedUrl =
      '/en/restclient/GET/' +
      Buffer.from('/api/test').toString('base64') +
      '?Authorization=Bearer%20token';

    const replaceStateCalls = (window.history.replaceState as jest.Mock).mock
      .calls;

    expect(replaceStateCalls).toEqual(
      expect.arrayContaining([
        expect.arrayContaining([
          expect.anything(),
          expect.anything(),
          expectedUrl,
        ]),
      ])
    );
  });
});
