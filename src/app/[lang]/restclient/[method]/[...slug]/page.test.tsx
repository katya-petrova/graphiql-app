import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import RestClient from './page';

vi.mock('@/pagesComponents/Restclient/RestClient', () => ({
  default: vi.fn(() => <div>Mocked RestClient</div>),
}));

describe('RestClientPage', () => {
  it('should render without crashing', async () => {
    const RestClientPage = await RestClient({ params: { lang: 'en' } });
    render(RestClientPage);
    expect(screen.getByText('Mocked RestClient')).toBeInTheDocument();
  });
});
