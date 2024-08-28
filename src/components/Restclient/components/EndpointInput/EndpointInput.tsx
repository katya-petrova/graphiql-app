type EndpointInputProps = {
  endpoint: string;
  setEndpoint: (endpoint: string) => void;
};

const EndpointInput: React.FC<EndpointInputProps> = ({
  endpoint,
  setEndpoint,
}) => {
  return (
    <input
      type="text"
      value={endpoint}
      onChange={(e) => setEndpoint(e.target.value)}
      placeholder="Enter API endpoint"
      className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
    />
  );
};

export default EndpointInput;
