import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { GlobalErrorContent } from '../global-error';
import { useRouter } from 'next/router';
import useErrorStore, { STATUS_OPTIONS } from '~/stores/ErrorStore';

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

jest.mock('~/stores/ErrorStore', () => {
  return {
    STATUS_OPTIONS: {
      200: 'OK',
      500: 'Internal Server Error',
    },
    __esModule: true,
    default: jest.fn(),
  };
});

describe('GlobalErrorContent', () => {
  const useRouterMock = useRouter as jest.Mock;
  const useErrorStoreMock = useErrorStore as unknown as jest.Mock;
  const mockPush = jest.fn();
  const mockReplace = jest.fn();

  beforeEach(() => {
    useRouterMock.mockReturnValue({
      push: mockPush,
      replace: mockReplace,
    });

    useErrorStoreMock.mockReturnValue({
      status: STATUS_OPTIONS[500],
      message: 'Test error message',
      resetError: jest.fn(),
      setStatus: jest.fn(),
      setMessage: jest.fn(),
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render without crashing', () => {
    render(<GlobalErrorContent error={new Error('Test error')} reset={jest.fn()} />);
  });

  it('displays the correct error message', () => {
    render(<GlobalErrorContent error={new Error('Test error')} reset={jest.fn()} />);
    expect(screen.getByText('We are sorry, but something went wrong:')).toBeInTheDocument();
    expect(screen.getByText('Test error message')).toBeInTheDocument();
  });

  it('calls handleHome to reset error and redirect to home', async () => {
    const { resetError } = useErrorStoreMock();
    render(<GlobalErrorContent error={new Error('Test error')} reset={jest.fn()} />);

    fireEvent.click(screen.getByText('Home'));

    expect(resetError).toHaveBeenCalled();
    expect(mockReplace).toHaveBeenCalledWith('/');
  });

  it('renders the "Contact us" link with the correct mailto URL', () => {
    process.env.NEXT_PUBLIC_SUPPORT_EMAIL_ADDRESS = 'support@example.com';
    render(<GlobalErrorContent error={new Error('Test error')} reset={jest.fn()} />);

    const contactLink = screen.getByText('Contact us').closest('a');
    expect(contactLink).toHaveAttribute('href', 'mailto:support@example.com');
    expect(contactLink).toHaveAttribute('target', '_blank');
    expect(contactLink).toHaveAttribute('rel', 'noreferrer');
  });
});
