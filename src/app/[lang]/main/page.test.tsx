import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';
import SigninPage from './page';
import { vi } from 'vitest';
import { getDictionary } from '@/utils/translation/getDictionary';

vi.mock('@/components/MainPage/MainPage', () => ({
  __esModule: true,
  default: () => <div>Main Page Content</div>,
}));

vi.mock('@/utils/translation/getDictionary', () => ({
  getDictionary: vi.fn(),
}));

const mockT = {
  main: {
    title: 'Welcome to our platform. Choose the tool you need:',
    links: {
      rest: 'RESTful Client',
      graphiQL: 'GraphiQL',
      history: 'History',
    },
  },
  auth: {
    messages: {
      notAuth: 'Please sign in to access the platform.',
    },
    links: {
      signIn: 'Sign in',
      signUp: 'Sign un',
      signOut: 'Sign out',
    },
  },
};

beforeEach(() => {
  (getDictionary as jest.Mock).mockResolvedValue({
    main: mockT.main,
    auth: mockT.auth,
  });
});

describe('SigninPage Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders the MainPage component', async () => {
    const Signin = await SigninPage({ params: { lang: 'en' } });
    render(Signin);

    expect(screen.getByText('Main Page Content')).toBeInTheDocument();
  });
});
