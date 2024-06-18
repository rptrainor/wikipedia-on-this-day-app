import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import NotFoundContent from '../NotFoundContent';

describe('NotFoundContent', () => {
  beforeEach(() => {
    process.env.NEXT_PUBLIC_SUPPORT_EMAIL_ADDRESS = 'support@example.com';
  });

  it('should render without crashing', () => {
    render(<NotFoundContent />);
  });

  it('displays the correct error message', () => {
    render(<NotFoundContent />);

    expect(screen.getByText('We are sorry, but something went wrong:')).toBeInTheDocument();
    expect(screen.getByText('the page you are looking for does not exist')).toBeInTheDocument();
  });

  it('renders the "Home" link and points to the correct URL', () => {
    render(<NotFoundContent />);

    const homeLink = screen.getByRole('link', { name: /Home/ });

    expect(homeLink).toBeInTheDocument();
    expect(homeLink).toHaveAttribute('href', '/');
  });

  it('renders the "Contact us" link and points to the correct mailto link', () => {
    render(<NotFoundContent />);

    const contactLink = screen.getByRole('link', { name: /Contact us/ });

    expect(contactLink).toBeInTheDocument();
    expect(contactLink).toHaveAttribute('href', 'mailto:support@example.com');
    expect(contactLink).toHaveAttribute('target', '_blank');
    expect(contactLink).toHaveAttribute('rel', 'noreferrer');
  });
});
