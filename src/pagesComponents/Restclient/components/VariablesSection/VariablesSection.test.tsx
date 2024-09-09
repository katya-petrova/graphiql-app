import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, afterEach } from 'vitest';
import VariablesSection from './VariablesSection';

afterEach(() => {
  vi.clearAllMocks();
});

describe('VariablesSection Component', () => {
  it('renders correctly with initial props', async () => {
    const mockVariables = [{ key: 'var1', value: 'value1' }];
    render(
      <VariablesSection
        variables={mockVariables}
        setVariables={vi.fn()}
        updateBodyWithVariables={vi.fn()}
      />
    );

    const summary = screen.getByText(/variables/i);
    userEvent.click(summary);

    const keyInputs = await screen.findAllByPlaceholderText('Key');
    const valueInputs = await screen.findAllByPlaceholderText('Value');

    expect(keyInputs[0]).toHaveValue('var1');
    expect(valueInputs[0]).toHaveValue('value1');
  });

  it('adds a new variable when the add button is clicked', async () => {
    const setVariables = vi.fn();
    render(
      <VariablesSection
        variables={[]}
        setVariables={setVariables}
        updateBodyWithVariables={vi.fn()}
      />
    );

    userEvent.click(screen.getByText(/variables/i));

    const addButton = await screen.findByText(/add variable/i);
    userEvent.click(addButton);

    await vi.waitFor(() => {
      // Expect setVariables to be called with a new empty variable
      expect(setVariables).toHaveBeenCalledWith([{ key: '', value: '' }]);
    });
  });

  it('removes a variable when delete button is pressed', async () => {
    const setVariables = vi.fn();
    const mockVariables = [{ key: 'var1', value: 'value1' }];
    render(
      <VariablesSection
        variables={mockVariables}
        setVariables={setVariables}
        updateBodyWithVariables={vi.fn()}
      />
    );

    userEvent.click(screen.getByText(/variables/i));

    const deleteButtons = await screen.findAllByText('Remove');
    userEvent.click(deleteButtons[0]);

    await vi.waitFor(() => {
      expect(setVariables).toHaveBeenCalledWith([]);
    });
  });

  it('updates variable key when input field is changed', async () => {
    const setVariables = vi.fn();
    const updateBodyWithVariables = vi.fn();
    const mockVariables = [{ key: 'var1', value: 'value1' }];
    render(
      <VariablesSection
        variables={mockVariables}
        setVariables={setVariables}
        updateBodyWithVariables={updateBodyWithVariables}
      />
    );

    const keyInput = screen.getByDisplayValue('var1');
    await userEvent.clear(keyInput);
    await userEvent.type(keyInput, 'newKey');

    expect(
      setVariables.mock.calls[setVariables.mock.calls.length - 1][0]
    ).toEqual([{ key: 'var1y', value: 'value1' }]);
    expect(updateBodyWithVariables).toHaveBeenCalled();
  });

  it('updates variable value when input field is changed', async () => {
    const setVariables = vi.fn();
    const updateBodyWithVariables = vi.fn();
    const mockVariables = [{ key: 'var1', value: 'value1' }];
    render(
      <VariablesSection
        variables={mockVariables}
        setVariables={setVariables}
        updateBodyWithVariables={updateBodyWithVariables}
      />
    );

    const valueInput = screen.getByDisplayValue('value1');
    await userEvent.clear(valueInput);
    await userEvent.type(valueInput, 'newValue');

    // The last expected call verification
    expect(
      setVariables.mock.calls[setVariables.mock.calls.length - 1][0]
    ).toEqual([{ key: 'var1', value: 'value1e' }]);
    expect(updateBodyWithVariables).toHaveBeenCalled();
  });
});
