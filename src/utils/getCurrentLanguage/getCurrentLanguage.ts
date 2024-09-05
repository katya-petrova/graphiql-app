export const getLangFromUrlOrCookie = (pathname: string): string => {
  const pathParts = pathname.split('/');
  const urlLang = pathParts[1];

  if (urlLang) {
    return urlLang;
  }
  const cookies = document.cookie.split(';');
  for (let cookie of cookies) {
    const [key, value] = cookie.trim().split('=');
    if (key === 'i18nlang') {
      return value;
    }
  }
  return 'en';
};
