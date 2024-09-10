import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import ResponseViewer from './ResponseViewer';
import en from '@/utils/translation/dictionaries/en.json';
import { TranslationProvider } from '@/context/TranslationContext';

vi.mock('@heroicons/react/24/outline', () => ({
  ExclamationTriangleIcon: (props: any) => (
    <div {...props} data-testid="error-icon" />
  ),
}));

describe('ResponseViewer Component', () => {
  it('should display the correct status color based on the status code', () => {
    const statuses = [
      { status: 200, expectedColor: 'text-green-500' },
      { status: 301, expectedColor: 'text-blue-500' },
      { status: 404, expectedColor: 'text-orange-500' },
      { status: 500, expectedColor: 'text-red-500' },
    ];

    statuses.forEach(({ status, expectedColor }) => {
      render(
        <TranslationProvider t={en}>
          <ResponseViewer response={{ status, data: null, headers: {} }} />
        </TranslationProvider>
      );

      const statusText = screen.getByText(`Status: ${status}`);
      expect(statusText).toHaveClass(expectedColor);
    });
  });

  it('should display an error message and icon when there is an error', () => {
    const errorMessage = 'Something went wrong';

    render(
      <TranslationProvider t={en}>
        <ResponseViewer
          response={{
            status: 500,
            data: null,
            headers: {},
            error: errorMessage,
          }}
        />
      </TranslationProvider>
    );

    const errorIcon = screen.getByTestId('error-icon');
    expect(errorIcon).toBeInTheDocument();

    const errorText = screen.getByText('Error:');
    expect(errorText).toBeInTheDocument();

    const errorContent = screen.getByText(errorMessage);
    expect(errorContent).toBeInTheDocument();
  });
});
