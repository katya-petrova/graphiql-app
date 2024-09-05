import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';
import RestClientPage from './page';
import { vi } from 'vitest';


  vi.mock('@/components/Restclient/Restclient', () => ({
    __esModule: true,
    default: () => <div>Restclient</div>,
  }));
  
  vi.mock('@/utils/translation/getDictionary', () => ({
    getDictionary: vi.fn(),
  }));

  describe('Restclient Component', () => {
    beforeEach(() => {
      vi.clearAllMocks();
    });
  
    it('renders the Restclient component', async () => {
      const Signin = await RestClientPage({ params: { lang: 'en' } });
      render(Signin);
  
      expect(screen.getByText('Restclient')).toBeInTheDocument();
    });
});
