import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import EndpointInput from './EndpointInput';

describe('EndpointInput', () => {
  it('displays the passed endpoint value', () => {
    const endpoint = 'http://test.com';
    render(
      <EndpointInput
        endpoint={endpoint}
        setEndpoint={() => {}}
        updateUrl={() => {}}
      />
    );
    const inputElement = screen.getByPlaceholderText(
      'Enter endpoint'
    ) as HTMLInputElement;
    expect(inputElement.value).toBe(endpoint);
  });

  it('calls setEndpoint and updateUrl on change', async () => {
    const setEndpoint = vi.fn();
    const updateUrl = vi.fn();
    render(
      <EndpointInput
        endpoint=""
        setEndpoint={setEndpoint}
        updateUrl={updateUrl}
      />
    );

    const inputElement = screen.getByPlaceholderText('Enter endpoint');
    await userEvent.type(inputElement, 'http://newurl.com');

    expect(setEndpoint).toHaveBeenCalledTimes(17);
    expect(updateUrl).toHaveBeenCalledTimes(17);
  });

  it('should clear the input when setting an empty string and call updateUrl', async () => {
    const setEndpoint = vi.fn();
    const updateUrl = vi.fn();
    render(
      <EndpointInput
        endpoint="http://initial.com"
        setEndpoint={setEndpoint}
        updateUrl={updateUrl}
      />
    );

    const inputElement = screen.getByPlaceholderText('Enter endpoint');
    fireEvent.change(inputElement, { target: { value: '' } });

    expect(setEndpoint).toHaveBeenCalledWith('');
    expect(updateUrl).toHaveBeenCalled();
  });
});
