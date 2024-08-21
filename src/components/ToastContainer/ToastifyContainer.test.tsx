import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ToastContainer from './ToastContainer';
import { toast } from 'react-toastify';

describe('ToastContainer Component', () => {
  it('displays a toast notification', async () => {
    render(
      <>
        <ToastContainer />
        <button onClick={() => toast('Hello World!')}>Show Toast</button>
      </>
    );

    fireEvent.click(screen.getByText('Show Toast'));

    await waitFor(() => {
      const toastElement = screen.getByText('Hello World!');
      expect(toastElement).toBeInTheDocument();
    });
  });
});
