import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Restclient from '@/pagesComponents/Restclient/RestClient';
import { vi } from 'vitest';
import { TranslationProvider } from '@/context/TranslationContext';
import en from '@/utils/translation/dictionaries/en.json';
import * as requestService from '@/utils/RestfulClientServices/requestService/requestService';
import * as historyService from '@/utils/RestfulClientServices/historyService/historyService';

vi.mock('next/navigation', () => ({
  usePathname: vi
    .fn()
    .mockReturnValue('/en/restclient/GET/someBase64Endpoint/someBase64Body'),
  useSearchParams: vi.fn().mockReturnValue({
    toString: () => '',
  }),
  useRouter: () => ({
    push: vi.fn(),
  }),
}));

vi.mock('@/utils/storageService/storageService', () => ({
  getFromLocalStorage: vi.fn().mockReturnValue([]),
  saveToLocalStorage: vi.fn(),
}));

vi.mock('react-toastify', () => ({
  toast: {
    error: vi.fn(),
    success: vi.fn(),
  },
}));

vi.mock('@/utils/RestfulClientServices/requestService/requestService', () => ({
  replaceVariablesInBody: vi.fn().mockReturnValue('replacedBody'),
}));

vi.mock('@/utils/RestfulClientServices/historyService/historyService', () => ({
  saveRestRequestToHistory: vi.fn(),
}));

vi.mock('@/context/AuthContext', () => ({
  useAuth: () => ({ isSignedIn: true }),
}));

describe('Restclient component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
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
    expect(
      screen.getByRole('button', { name: /Send Request/i })
    ).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Enter endpoint/i)).toBeInTheDocument();
  });

  it('handles method change correctly', () => {
    render(
      <TranslationProvider t={en}>
        <Restclient t={en.rest} />
      </TranslationProvider>
    );

    expect(screen.getByText('GET')).toBeInTheDocument();

    fireEvent.change(screen.getByRole('combobox'), {
      target: { value: 'POST' },
    });

    expect(screen.getByText('POST')).toBeInTheDocument();
  });

  it('updates headers correctly', () => {
    render(
      <TranslationProvider t={en}>
        <Restclient t={en.rest} />
      </TranslationProvider>
    );

    const addHeaderButton = screen.getByText(/Add Header/i);
    fireEvent.click(addHeaderButton);

    const headerKeyInput = screen.getByPlaceholderText(/Key/i);
    const headerValueInput = screen.getByPlaceholderText(/Value/i);

    fireEvent.change(headerKeyInput, { target: { value: 'Authorization' } });
    fireEvent.change(headerValueInput, { target: { value: 'Bearer token' } });

    expect(screen.getByDisplayValue('Authorization')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Bearer token')).toBeInTheDocument();
  });

  test('handles request submission correctly', async () => {
    const mockReplaceVariablesInBody = vi.fn().mockReturnValue('updated body');
    const mockSaveRestRequestToHistory = vi.fn();
    const mockFetch = vi.fn().mockResolvedValue({
      json: () => Promise.resolve({ success: true }),
    });

    vi.spyOn(requestService, 'replaceVariablesInBody').mockImplementation(
      mockReplaceVariablesInBody
    );
    vi.spyOn(historyService, 'saveRestRequestToHistory').mockImplementation(
      mockSaveRestRequestToHistory
    );
    global.fetch = mockFetch;

    render(
      <TranslationProvider t={en}>
        <Restclient t={en.rest} />
      </TranslationProvider>
    );
    const sendRequestButton = screen.getByRole('button', {
      name: /Send Request/i,
    });
    fireEvent.click(sendRequestButton);

    await waitFor(() => {
      expect(mockReplaceVariablesInBody).toHaveBeenCalledWith('', []);
      expect(mockSaveRestRequestToHistory).toHaveBeenCalled();
    });
  });
});
