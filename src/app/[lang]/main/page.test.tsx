import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';
import SigninPage from './page';
import { vi } from 'vitest';

vi.mock('@/components/MainPage/MainPage', () => ({
  __esModule: true,
  default: () => <div>Main Page Content</div>,
}));

describe('SigninPage Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders the MainPage component', () => {
    render(<SigninPage />);

    expect(screen.getByText('Main Page Content')).toBeInTheDocument();
  });
});
