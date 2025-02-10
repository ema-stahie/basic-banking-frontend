import { render, screen, fireEvent } from '@testing-library/react';
import ConfirmDeleteModal from '../components/ConfirmDelete'; // Update with correct path

describe('ConfirmDelete', () => {
  
  it('should render the modal with the confirmation message when show is true', () => {
    const confirmationMessage = 'Are you sure you want to delete this item?';
    
    render(<ConfirmDeleteModal show={true} onClose={jest.fn()} onConfirm={jest.fn()} confirmationMessage={confirmationMessage} />);

    expect(screen.getByText(/Confirm Deletion/)).toBeInTheDocument();
    
    expect(screen.getByText(confirmationMessage)).toBeInTheDocument();

    expect(screen.getByText(/Cancel/)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Confirm/ })).toBeInTheDocument();
  });

  it('should not render the modal when show is false', () => {
    render(<ConfirmDeleteModal show={false} onClose={jest.fn()} onConfirm={jest.fn()} confirmationMessage="Are you sure?" />);

    expect(screen.queryByText(/Confirm Deletion/)).not.toBeInTheDocument();
  });

  it('should call the onClose function when the Cancel button is clicked', () => {
    const onCloseMock = jest.fn();

    render(<ConfirmDeleteModal show={true} onClose={onCloseMock} onConfirm={jest.fn()} confirmationMessage="Are you sure?" />);

    fireEvent.click(screen.getByText(/Cancel/));

    expect(onCloseMock).toHaveBeenCalledTimes(1);
  });

  it('should call the onConfirm function when the Confirm button is clicked', () => {
    const onConfirmMock = jest.fn();

    render(<ConfirmDeleteModal show={true} onClose={jest.fn()} onConfirm={onConfirmMock} confirmationMessage="Are you sure?" />);

    fireEvent.click(screen.getByRole('button', { name: /Confirm/ }));

    expect(onConfirmMock).toHaveBeenCalledTimes(1);
  });

});