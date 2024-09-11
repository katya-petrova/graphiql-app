import React, { createContext, useContext } from 'react';
import { Dictionary } from '@/utils/translation/getDictionary';

const TranslationContext = createContext<Dictionary | null>(null);

export const useTranslation = () => {
  const context = useContext(TranslationContext);
  if (!context) {
    throw new Error('useTranslation must be used within a TranslationProvider');
  }
  return context;
};

type TranslationProviderProps = {
  children: React.ReactNode;
  t: Dictionary;
};

export const TranslationProvider = ({
  children,
  t,
}: TranslationProviderProps) => {
  return (
    <TranslationContext.Provider value={t}>
      {children}
    </TranslationContext.Provider>
  );
};
