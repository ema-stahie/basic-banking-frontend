import { render, screen } from '@testing-library/react';
import Footer from '../components/Footer';

describe('Footer Component', () => {
  test('renders the footer with correct copyright', () => {
    render(<Footer />);

    expect(screen.getByText(/© 2025 Customer and Account Management/)).toBeInTheDocument();
  });
});
