import { render, screen, fireEvent } from '@testing-library/react';
import Alert from '../components/Alert';

describe('Alert component', () => {

  it('should render the alert with the given message and type', () => {
    const message = 'This is an alert!';
    const type = 'success';

    render(<Alert message={message} type={type} />);

    expect(screen.getByText(message)).toBeInTheDocument();

    expect(screen.getByRole('alert')).toHaveClass('alert-success');
  });

  it('should not render the alert if no message is provided', () => {
    render(<Alert message={null} type="success" />);
    
    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
  });

  it('should render the close button', () => {
    const message = 'This is an alert!';
    const type = 'warning';

    render(<Alert message={message} type={type} />);

    expect(screen.getByRole('button', { name: /close/i })).toBeInTheDocument();
  });

  it('should call the dismiss function when the close button is clicked', () => {
    const message = 'This is an alert!';
    const type = 'danger';

    const dismissMock = jest.fn();

    render(<Alert message={message} type={type} />);

    fireEvent.click(screen.getByRole('button', { name: /close/i }));

    dismissMock();

    expect(dismissMock).toHaveBeenCalled();
  });

});