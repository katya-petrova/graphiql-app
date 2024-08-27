import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { LanguageSwitcher } from './LanguageSwitcher';

vi.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => <img {...props} />,
}));

vi.mock('next/navigation', () => ({
  useRouter: () => ({
    replace: vi.fn(),
  }),
  usePathname: () => 'en/some/path',
}));

describe('LanguageSwitcher', () => {
  it('should display the selected language and flag', async () => {
    render(<LanguageSwitcher />);

    const button = screen.getByTestId('language-button');
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent('En');

    fireEvent.click(button);

    const menu = screen.getByRole('list');
    expect(menu).toBeVisible();

    const ruButton = screen.getByRole('button', { name: /ru/i });
    fireEvent.click(ruButton);

    await waitFor(() => {
      expect(button).toHaveTextContent('Ru');
    });
  });
});
