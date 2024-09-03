interface UrlInputProps {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
}

const UrlInput: React.FC<UrlInputProps> = ({
  label,
  value,
  onChange,
  placeholder,
}) => {
  return (
    <div className="mb-4 border-gray-300">
      <label className="block mb-2">
        {label}
        <input
          type="text"
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="w-full p-2 border border-gray-300 bg-white text-gray-700 rounded"
        />
      </label>
    </div>
  );
};

export default UrlInput;
