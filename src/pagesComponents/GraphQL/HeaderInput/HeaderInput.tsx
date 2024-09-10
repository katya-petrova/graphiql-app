import React from 'react';
import { Button } from '../../../components/Button/Button';
import { Dictionary } from '@/utils/translation/getDictionary';

interface HeaderInputProps {
  keyValue: { key: string; value: string };
  onKeyChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onValueChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onAdd: () => void;
  t: Dictionary['graphiql'];
}

const HeaderInput: React.FC<HeaderInputProps> = ({
  keyValue,
  onKeyChange,
  onValueChange,
  onAdd,
  t,
}) => {
  return (
    <div className="flex items-center space-x-2 mb-4">
      <input
        type="text"
        value={keyValue.key}
        onChange={onKeyChange}
        placeholder={t.headerKey}
        className="p-2 border border-gray-300 bg-white text-gray-700 rounded flex-1"
      />
      <input
        type="text"
        value={keyValue.value}
        onChange={onValueChange}
        placeholder={t.headerValue}
        className="p-2 border border-gray-300 bg-white text-gray-700 rounded flex-1"
      />
      <Button onClick={onAdd}>{t.addHeader}</Button>
    </div>
  );
};

export default HeaderInput;
