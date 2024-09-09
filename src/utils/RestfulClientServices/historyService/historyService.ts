export const saveRestRequestToHistory = (
  link: string,
  method: string,
  endpoint: string,
  history: any[],
  setHistory: (history: any[]) => void
) => {
  const newEntry = {
    request_url: `${method} ${endpoint}`,
    link,
    time: new Date().toLocaleString(),
  };

  const updatedHistory = [newEntry, ...history];
  setHistory(updatedHistory);
  localStorage.setItem('requestHistory', JSON.stringify(updatedHistory));
};
