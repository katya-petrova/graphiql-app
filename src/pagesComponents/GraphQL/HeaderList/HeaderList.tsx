import { Button } from '@/components/Button/Button';

interface Header {
  key: string;
  value: string;
}

interface HeaderListProps {
  headers: Header[];
  onRemoveHeader: (index: number) => void;
}

const HeaderList: React.FC<HeaderListProps> = ({ headers, onRemoveHeader }) => {
  return (
    <ul>
      {headers.length > 0 ? (
        headers.map((header, index) => (
          <li key={index} className="mb-2 flex items-center space-x-2">
            <span className="mr-2">
              {header.key}: {header.value}
            </span>
            <Button onClick={() => onRemoveHeader(index)}>Remove</Button>
          </li>
        ))
      ) : (
        <li></li>
      )}
    </ul>
  );
};

export default HeaderList;
