type MethodSelectorProps = {
  method: string;
  setMethod: (method: string) => void;
};

const MethodSelector: React.FC<MethodSelectorProps> = ({
  method,
  setMethod,
}) => {
  const methods = ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'];

  return (
    <select
      value={method}
      onChange={(e) => setMethod(e.target.value)}
      className="border border-gray-300 p-2 rounded-lg focus:outline-none focus:border-blue-500"
    >
      {methods.map((m) => (
        <option key={m} value={m}>
          {m}
        </option>
      ))}
    </select>
  );
};

export default MethodSelector;
