import { render, screen, fireEvent } from '@testing-library/react';
import HeaderList from './HeaderList';
import { vi } from 'vitest';

describe('HeaderList', () => {
  test('calls onRemoveHeader when remove button is clicked', () => {
    const onRemoveHeader = vi.fn();
    const headers = [{ key: 'Key1', value: 'Value1' }];

    render(<HeaderList headers={headers} onRemoveHeader={onRemoveHeader} />);

    const removeButton = screen.getByText('Remove');
    fireEvent.click(removeButton);

    expect(onRemoveHeader).toHaveBeenCalledWith(0);
  });

  test('displays empty list message when no headers are provided', () => {
    const onRemoveHeader = vi.fn();

    render(<HeaderList headers={[]} onRemoveHeader={onRemoveHeader} />);

    const listItems = screen.queryAllByRole('listitem');
    expect(listItems).toHaveLength(0);
  });
});
