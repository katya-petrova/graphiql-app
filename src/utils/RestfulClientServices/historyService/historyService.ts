import { RequestHistoryItem } from '@/pagesComponents/Restclient/RestClient';

export const saveRestRequestToHistory = (
  link: string,
  method: string,
  endpoint: string,
  history: RequestHistoryItem[],
  setHistory: (history: RequestHistoryItem[]) => void
) => {
  const newEntry: RequestHistoryItem = {
    request_url: `${method} ${endpoint}`,
    link,
    time: new Date().toLocaleString(),
  };

  const updatedHistory = [newEntry, ...history];
  setHistory(updatedHistory);
  localStorage.setItem('requestHistory', JSON.stringify(updatedHistory));
};
