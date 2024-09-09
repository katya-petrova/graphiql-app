import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Restclient from '@/pagesComponents/Restclient/RestClient';
import { vi } from 'vitest';
import { toast } from 'react-toastify';
import * as requestService from '@/utils/RestfulClientServices/requestService/requestService';
import * as historyService from '@/utils/RestfulClientServices/historyService/historyService';

vi.mock('next/navigation', () => ({
  usePathname: vi.fn().mockReturnValue('/en/restclient/GET/'),
  useSearchParams: vi.fn().mockReturnValue({
    toString: () => '',
  }),
}));

vi.mock('@/utils/storageService/storageService', () => ({
  getFromLocalStorage: vi.fn().mockReturnValue([]),
  saveToLocalStorage: vi.fn(),
}));

vi.mock('react-toastify', () => ({
  toast: {
    error: vi.fn(),
  },
}));

describe('Restclient component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('renders without crashing', () => {
    render(<Restclient />);

    expect(
      screen.getByRole('button', { name: /Send Request/i })
    ).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Enter endpoint/i)).toBeInTheDocument();
  });

  test('handles request submission correctly', async () => {
    // Создаем моки для функций
    const mockReplaceVariablesInBody = vi.fn().mockReturnValue('updated body');
    const mockSaveRestRequestToHistory = vi.fn();
    const mockFetch = vi.fn().mockResolvedValue({
      json: () => Promise.resolve({ success: true }),
    });

    // Мокаем функции
    vi.spyOn(requestService, 'replaceVariablesInBody').mockImplementation(
      mockReplaceVariablesInBody
    );
    vi.spyOn(historyService, 'saveRestRequestToHistory').mockImplementation(
      mockSaveRestRequestToHistory
    );
    global.fetch = mockFetch;

    render(<Restclient />);
    const sendRequestButton = screen.getByRole('button', {
      name: /Send Request/i,
    });
    fireEvent.click(sendRequestButton);

    await waitFor(() => {
      expect(mockReplaceVariablesInBody).toHaveBeenCalledWith('', []);
      expect(mockSaveRestRequestToHistory).toHaveBeenCalled();
    });
  });

  test('handles request errors correctly', async () => {
    const mockFetch = vi.fn().mockRejectedValue(new Error('Failed to fetch'));

    global.fetch = mockFetch;

    render(<Restclient />);
    const sendRequestButton = screen.getByRole('button', {
      name: /Send Request/i,
    });
    fireEvent.click(sendRequestButton);

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith(
        'Request Error: Error: Failed to fetch'
      );
    });
  });
});
