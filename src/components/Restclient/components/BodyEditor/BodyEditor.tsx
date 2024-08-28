type BodyEditorProps = {
  body: string;
  setBody: (body: string) => void;
};

const BodyEditor: React.FC<BodyEditorProps> = ({ body, setBody }) => {
  return (
    <textarea
      value={body}
      onChange={(e) => setBody(e.target.value)}
      placeholder="Request body"
      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition duration-300 resize-none h-40"
    />
  );
};

export default BodyEditor;
