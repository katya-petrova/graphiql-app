import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import History from './page';

vi.mock('@/utils/translation/getDictionary', () => ({
  getDictionary: vi.fn().mockResolvedValue({
    history: {
      title: 'Test Title',
      message: ['No history found'],
      links: {
        rest: 'REST Client',
        graphiQL: 'GraphiQL',
      },
    },
  }),
}));

vi.mock('@/context/AuthContext', () => ({
  useAuth: () => ({ isSignedIn: true }),
}));

describe('HistoryPage', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('should render message and links when localStorage is empty', async () => {
    const HistoryPage = await History({ params: { lang: 'en' } });
    render(HistoryPage);

    expect(screen.getByText('No history found')).toBeInTheDocument();
    expect(screen.getByText('REST Client')).toBeInTheDocument();
    expect(screen.getByText('GraphiQL')).toBeInTheDocument();
  });

  it('should render history items when localStorage has data', async () => {
    const historyItems = [
      {
        request_url: 'http://example.com',
        link: '/example',
        time: '04.09.2024, 12:25:01',
      },
      {
        request_url: 'http://example.com',
        link: '/example',
        time: '04.09.2024, 12:25:01',
      },
    ];

    localStorage.setItem('requestHistory', JSON.stringify(historyItems));

    const HistoryPage = await History({ params: { lang: 'en' } });
    render(HistoryPage);

    await screen.findByText('Test Title');

    expect(screen.getAllByText('http://example.com')).toHaveLength(2);
  });
});
