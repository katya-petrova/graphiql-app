import React from 'react';
import { Button } from '../../Button/Button';

interface HeaderInputProps {
  keyValue: { key: string; value: string };
  onKeyChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onValueChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onAdd: () => void;
}

const HeaderInput: React.FC<HeaderInputProps> = ({
  keyValue,
  onKeyChange,
  onValueChange,
  onAdd,
}) => {
  return (
    <div className="flex items-center space-x-2 mb-4">
      <input
        type="text"
        value={keyValue.key}
        onChange={onKeyChange}
        placeholder="Header Key"
        className="p-2 border border-gray-300 bg-white text-gray-700 rounded flex-1"
      />
      <input
        type="text"
        value={keyValue.value}
        onChange={onValueChange}
        placeholder="Header Value"
        className="p-2 border border-gray-300 bg-white text-gray-700 rounded flex-1"
      />
      <Button onClick={onAdd}>Add Header</Button>
    </div>
  );
};

export default HeaderInput;
