import { render, screen, fireEvent } from '@testing-library/react';
import Sidebar from '../components/Sidebar';
import { BrowserRouter as Router } from 'react-router-dom';

describe('Sidebar Component', () => {
  test('renders sidebar links for unauthenticated users', () => {
    render(
      <Router>
        <Sidebar username="" onLogout={jest.fn()} />
      </Router>
    );

    expect(screen.getByText(/Home/)).toBeInTheDocument();
    expect(screen.getByText(/Customers/)).toBeInTheDocument();
    expect(screen.getByText(/Accounts/)).toBeInTheDocument();
    expect(screen.getByText(/Login/)).toBeInTheDocument();
    expect(screen.getByText(/Register/)).toBeInTheDocument();
  });

  test('renders sidebar with logout option when logged in', () => {
    render(
      <Router>
        <Sidebar username="JohnDoe" onLogout={jest.fn()} />
      </Router>
    );

    expect(screen.getByText(/Home/)).toBeInTheDocument();
    expect(screen.getByText(/Customers/)).toBeInTheDocument();
    expect(screen.getByText(/Accounts/)).toBeInTheDocument();
    expect(screen.getByText(/Welcome, JohnDoe/)).toBeInTheDocument();
    expect(screen.getByText(/Logout/)).toBeInTheDocument();
  });

  test('calls onLogout when logout link is clicked', () => {
    const mockLogout = jest.fn();
    render(
      <Router>
        <Sidebar username="JohnDoe" onLogout={mockLogout} />
      </Router>
    );

    fireEvent.click(screen.getByText(/Logout/));
    expect(mockLogout).toHaveBeenCalledTimes(1);
  });
});
