export const getFromLocalStorage = (key: string, defaultValue: any = []) => {
  return JSON.parse(localStorage.getItem(key) || JSON.stringify(defaultValue));
};

export const saveToLocalStorage = (key: string, value: any) => {
  localStorage.setItem(key, JSON.stringify(value));
};
