import { describe, it, expect, vi, beforeEach } from "vitest";
import { saveRestRequestToHistory } from "./historyService";

describe('saveRestRequestToHistory', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2024-09-05T11:04:12Z'));
  });

  it('should add new request to the beginning of the history and update localStorage', () => {
    const setHistoryMock = vi.fn();
    const localStorageMock = {
      setItem: vi.fn(),
      getItem: vi.fn(),
      removeItem: vi.fn(),
      clear: vi.fn(),
      key: vi.fn(),
      length: 0
    };
    global.localStorage = localStorageMock;

    const initialHistory = [
      { request_url: 'GET /old-endpoint', link: 'old-link', time: 'old-time' }
    ];
    const link = 'new-link';
    const method = 'POST';
    const endpoint = '/new-endpoint';

    saveRestRequestToHistory(link, method, endpoint, initialHistory, setHistoryMock);

    const expectedHistory = JSON.stringify([
      {
        request_url: 'POST /new-endpoint',
        link: link,
        time: new Date().toLocaleString() 
      },
      ...initialHistory
    ]);

    expect(setHistoryMock).toHaveBeenCalledTimes(1);
    expect(setHistoryMock).toHaveBeenCalledWith([
      {
        request_url: 'POST /new-endpoint',
        link,
        time: new Date().toLocaleString()
      },
      ...initialHistory
    ]);

    expect(localStorageMock.setItem).toHaveBeenCalledTimes(1);
    expect(localStorageMock.setItem).toHaveBeenCalledWith('requestHistory', expectedHistory);
  });
});