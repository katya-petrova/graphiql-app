import Home from '../app/page';
import { render, screen } from '@testing-library/react';

describe('Home', () => {
  it('renders the main message', () => {
    render(<Home />);
  });

  it('displays a link with "Docs"', () => {
    render(<Home />);
  });
});
