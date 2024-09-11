import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import RestClientPage from './page';
import { getDictionary } from '@/utils/translation/getDictionary';
import en from '@/utils/translation/dictionaries/en.json';

vi.mock('next/navigation', () => ({
  usePathname: () =>
    '/en/restclient/GET/L2FwaS90ZXN0?Authorization=Bearer%20token',
  useSearchParams: () => new URLSearchParams('Authorization=Bearer%20token'),
}));

vi.mock('@/context/TranslationContext', () => ({
  useTranslation: () => ({ rest: en.rest }),
}));

vi.mock('@/utils/translation/getDictionary', () => ({
  getDictionary: vi.fn(),
}));

beforeEach(() => {
  (getDictionary as jest.Mock).mockResolvedValue({ rest: en.rest });
});

describe('Restclient Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders the Restclient component', async () => {
    const Signin = await RestClientPage({ params: { lang: 'en' } });
    render(Signin);

    expect(screen.getByText('Send Request')).toBeInTheDocument();
  });
});
