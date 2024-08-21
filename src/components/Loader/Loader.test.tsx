import { render, screen } from '@testing-library/react';
import Loader from './Loader';

describe('Loader Component', () => {
  it('renders without crashing', () => {
    render(<Loader />);
    expect(screen.getByTestId('loader-container')).toBeInTheDocument();
  });
});
