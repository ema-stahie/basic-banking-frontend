import { render, screen, fireEvent } from '@testing-library/react';
import RegisterPage from '../pages/RegisterPage';
global.alert = jest.fn();

describe('RegisterPage', () => {
  it('should show alert when passwords do not match', () => {
    render(<RegisterPage onRegister={jest.fn()} />);

    fireEvent.change(screen.getByLabelText(/username/i), { target: { value: 'testuser' } });
    fireEvent.change(screen.getByLabelText(/email address/i), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByTestId('password-field'), { target: { value: 'password123' } });
    fireEvent.change(screen.getByTestId('confirm-password-field'), { target: { value: 'password321' } });

    fireEvent.click(screen.getByRole('button', { name: /register/i }));

    expect(alert).toHaveBeenCalledWith('Passwords do not match!');
  });

  it('should call onRegister when form is submitted successfully', () => {
    const onRegisterMock = jest.fn();
    render(<RegisterPage onRegister={onRegisterMock} />);

    fireEvent.change(screen.getByLabelText(/username/i), { target: { value: 'testuser' } });
    fireEvent.change(screen.getByLabelText(/email address/i), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByTestId('password-field'), { target: { value: 'password123' } });
    fireEvent.change(screen.getByTestId('confirm-password-field'), { target: { value: 'password123' } });

    fireEvent.click(screen.getByRole('button', { name: /register/i }));

    expect(localStorage.getItem('username')).toBe('testuser');
    expect(localStorage.getItem('email')).toBe('test@example.com');

    expect(onRegisterMock).toHaveBeenCalledWith('testuser');
    expect(alert).toHaveBeenCalledWith('Registered successfully!');
  });
});
