import { describe, it, expect, beforeEach, vi, beforeAll } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import BodyEditor from './BodyEditor';

vi.mock('@uiw/react-codemirror', () => ({
  __esModule: true,
  default: vi.fn(({ onChange, onBlur, value, extensions }) => {
    const mockExtensions = extensions || [];
    const linterExtension = mockExtensions.find((ext: { name: string; }) => ext.name === 'linter');

    return (
      <div>
        <textarea
          data-testid="codemirror"
          value={value}
          onChange={(e) => onChange && onChange(e.target.value)}
          onBlur={onBlur}
        />
        {linterExtension && linterExtension.callback && (
          <div data-testid="linter-output">
            {linterExtension.callback(value)}
          </div>
        )}
      </div>
    );
  }),
}));

beforeAll(() => {
  document.elementFromPoint = () => document.createElement('div');
});

describe('BodyEditor Component', () => {
  const setBodyMock = vi.fn();
  const updateUrlMock = vi.fn();

  beforeEach(() => {
    setBodyMock.mockClear();
    updateUrlMock.mockClear();
    render(<BodyEditor body="" setBody={setBodyMock} updateUrl={updateUrlMock} />);
  });

  it('should switch between JSON View and Text View', async () => {
    const toggleButton = screen.getByRole('button', { name: /Switch to Text View/i });
    await userEvent.click(toggleButton);
    expect(toggleButton.textContent).toBe('Switch to JSON View');

    await userEvent.click(toggleButton);
    expect(toggleButton.textContent).toBe('Switch to Text View');
  });

  it('should call updateUrl when CodeMirror is blurred', () => {
    const codeMirrorInput = screen.getByTestId('codemirror');
    fireEvent.blur(codeMirrorInput);
    expect(updateUrlMock).toHaveBeenCalled();
  });

  it('should call updateUrl when Text View textarea is blurred', () => {
    const toggleButton = screen.getByRole('button', { name: /Switch to Text View/i });
    userEvent.click(toggleButton);

    const textArea = screen.getByRole('textbox');
    fireEvent.blur(textArea);
    expect(updateUrlMock).toHaveBeenCalled();
  });
  
  it('should not display a lint error when valid JSON is entered', async () => {
    const codeMirrorInput = screen.getByTestId('codemirror') as HTMLTextAreaElement;
    codeMirrorInput.focus();  
    await userEvent.paste('{"validJson": true}'); 
  
    const linterOutput = screen.queryByTestId('linter-output');
    expect(linterOutput).toBeNull(); 
  });
    
  it('should call setBody when Text View textarea value changes', async () => {
    const toggleButton = screen.getByRole('button', { name: /Switch to Text View/i });
    await userEvent.click(toggleButton);

    const textArea = screen.getByRole('textbox');
    await userEvent.type(textArea, 'A');

    expect(setBodyMock).toHaveBeenCalledWith('A');
  });
  
});
