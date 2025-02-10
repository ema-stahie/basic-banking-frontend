import { render, screen, fireEvent } from '@testing-library/react';
import LoginPage from '../pages/LoginPage';

global.alert = jest.fn();

beforeEach(() => {
  localStorage.setItem('email', 'test@example.com');
  localStorage.setItem('username', 'testuser');
  localStorage.setItem('password', 'password123');
});

describe('LoginPage', () => {
  it('should display error message when fields are empty', () => {
    render(<LoginPage onLogin={jest.fn()} />);

    fireEvent.click(screen.getByRole('button', { name: /login/i }));

    expect(screen.getByText(/Please fill in both fields./)).toBeInTheDocument();
  });

  it('should display error message when invalid email or password is entered', () => {
    render(<LoginPage onLogin={jest.fn()} />);

    fireEvent.change(screen.getByLabelText(/email address/i), { target: { value: 'wrong@example.com' } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'wrongpassword' } });

    fireEvent.click(screen.getByRole('button', { name: /login/i }));

    expect(screen.getByText(/Invalid email or password./)).toBeInTheDocument();
  });

  it('should call onLogin when valid credentials are entered', () => {
    const onLoginMock = jest.fn();
    render(<LoginPage onLogin={onLoginMock} />);

    fireEvent.change(screen.getByLabelText(/email address/i), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'password123' } });

    fireEvent.click(screen.getByRole('button', { name: /login/i }));

    expect(onLoginMock).toHaveBeenCalledWith('testuser');
    expect(alert).toHaveBeenCalledWith('Login successful!');
  });
});
