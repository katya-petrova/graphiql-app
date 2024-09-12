interface TextAreaInputProps {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder: string;
  rows: number;
  onBlur?: (e: React.FocusEvent<HTMLTextAreaElement>) => void;
}

const TextAreaInput: React.FC<TextAreaInputProps> = ({
  label,
  value,
  onChange,
  placeholder,
  rows,
  onBlur,
}) => {
  return (
    <div className="mb-4">
      <label className="block mb-2">
        {label}
        <textarea
          rows={rows}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="w-full p-2 border border-gray-300 bg-white text-gray-700 rounded"
          onBlur={onBlur}
        />
      </label>
    </div>
  );
};

export default TextAreaInput;
