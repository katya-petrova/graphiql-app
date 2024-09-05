import React from 'react';

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
    updateUrl();
  };

  return (
    <input
      type="text"
      value={endpoint}
      onChange={handleChange}
      placeholder="Enter endpoint"
      className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition duration-300"
    />
  );
};

export default EndpointInput;
