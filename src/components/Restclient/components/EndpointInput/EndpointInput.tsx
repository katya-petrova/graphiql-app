type EndpointInputProps = {
  endpoint: string;
  setEndpoint: (endpoint: string) => void;
  updateUrl: () => void;
};

const EndpointInput: React.FC<EndpointInputProps> = ({
  endpoint,
  setEndpoint,
  updateUrl,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEndpoint(e.target.value);
  };

  const handleBlur = () => {
    updateUrl();
  };

  return (
    <input
      type="text"
      value={endpoint}
      onChange={handleChange}
      onBlur={handleBlur}
      placeholder="Enter API endpoint"
      className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
    />
  );
};

export default EndpointInput;
