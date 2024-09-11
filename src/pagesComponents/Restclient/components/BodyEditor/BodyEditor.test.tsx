import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import BodyEditor from './BodyEditor';

describe('BodyEditor Component', () => {
  const mockSetBody = vi.fn();
  const mockUpdateUrl = vi.fn();
  const mockVariables = [{ key: 'variable1', value: 'value1' }];

  const renderComponent = (body = '') => {
    render(
      <BodyEditor
        body={body}
        setBody={mockSetBody}
        updateUrl={mockUpdateUrl}
        variables={mockVariables}
      />
    );
  };

  it('renders the component with default JSON view', () => {
    renderComponent();

    const switchButton = screen.getByRole('button', {
      name: /switch to text view/i,
    });
    expect(switchButton).toBeInTheDocument();
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  it('toggles between JSON view and Text view', () => {
    renderComponent();

    const switchButton = screen.getByRole('button', {
      name: /switch to text view/i,
    });

    fireEvent.click(switchButton);
    expect(
      screen.getByRole('button', { name: /switch to json view/i })
    ).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Request body')).toBeInTheDocument();
  });

  it('calls setBody and updateUrl on blur if the body changes', () => {
    renderComponent('Initial body');
    const switchButton = screen.getByRole('button', {
      name: /switch to text view/i,
    });

    fireEvent.click(switchButton);

    const textBox = screen.getByRole('textbox');
    fireEvent.change(textBox, { target: { value: 'Updated body' } });
    fireEvent.blur(textBox);

    expect(mockSetBody).toHaveBeenCalledWith('Updated body');
    expect(mockUpdateUrl).toHaveBeenCalled();
  });
});
