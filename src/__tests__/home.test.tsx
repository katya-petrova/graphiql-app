import Home from '../app/page';
import { render, screen } from '@testing-library/react';

describe('Home', () => {
  it('renders the main message', () => {
    render(<Home />);
    const mainMessage = screen.getByText(/Get started by editing/i);
    expect(mainMessage).toBeTruthy();
  });

  it('displays a link with "Docs"', () => {
    render(<Home />);
    const docsLink = screen.getByText(/Docs/);
    expect(docsLink).toBeTruthy();
  });
});
