import { render, screen, fireEvent } from '@testing-library/react';
import Header from '../components/Header.jsx';
import { MemoryRouter } from 'react-router-dom';

describe('Header Component', () => {
  test('renders login and register buttons when not logged in', () => {
    render(
      <MemoryRouter>
        <Header username="" onLogout={jest.fn()} />
      </MemoryRouter>
    );

    // Query by button role and text
    expect(screen.getByRole('button', { name: /Login/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Register/i })).toBeInTheDocument();
  });

  test('renders username and logout button when logged in', () => {
    render(
      <MemoryRouter>
        <Header username="JohnDoe" onLogout={jest.fn()} />
      </MemoryRouter>
    );

    // Query by button role and text for logout button
    expect(screen.getByRole('button', { name: /Logout/i })).toBeInTheDocument();
  });

  test('calls onLogout when logout button is clicked', () => {
    const mockLogout = jest.fn();
    render(
      <MemoryRouter>
        <Header username="JohnDoe" onLogout={mockLogout} />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByRole('button', { name: /Logout/i }));
    expect(mockLogout).toHaveBeenCalledTimes(1);
  });
});
