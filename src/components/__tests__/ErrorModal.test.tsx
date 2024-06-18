import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import ErrorModal from '~/components/ErrorModal';
import useErrorStore, { STATUS_OPTIONS } from '~/stores/ErrorStore';
import { useRouter } from 'next/navigation';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

jest.mock('~/stores/ErrorStore', () => ({
  __esModule: true,
  default: jest.fn(),
  STATUS_OPTIONS: {
    200: '200',
    400: '400',
    500: '500',
  },
}));

describe('ErrorModal', () => {
  const mockUseRouter = useRouter as jest.Mock;
  const mockUseErrorStore = useErrorStore as unknown as jest.Mock;

  beforeEach(() => {
    mockUseRouter.mockReturnValue({
      replace: jest.fn(),
    });
    mockUseErrorStore.mockReturnValue({
      status: STATUS_OPTIONS[200],
      message: '',
      resetError: jest.fn(),
    });
  });

  it('renders null when status is 200', () => {
    render(<ErrorModal />);
    expect(screen.queryByText('We are sorry, but something went wrong:')).not.toBeInTheDocument();
  });

  it('renders modal when status is 400 or 500', () => {
    mockUseErrorStore.mockReturnValueOnce({
      status: STATUS_OPTIONS[400],
      message: 'Bad Request Error',
      resetError: jest.fn(),
    });

    render(<ErrorModal />);

    expect(screen.getByText('We are sorry, but something went wrong:')).toBeInTheDocument();
    expect(screen.getByText('Bad Request Error')).toBeInTheDocument();
  });

  it('calls resetError and router.replace when Home button is clicked', () => {
    const mockResetError = jest.fn();
    const mockRouterReplace = jest.fn();
    
    mockUseRouter.mockReturnValueOnce({
      replace: mockRouterReplace,
    });
    mockUseErrorStore.mockReturnValueOnce({
      status: STATUS_OPTIONS[500],
      message: 'Internal Server Error',
      resetError: mockResetError,
    });

    render(<ErrorModal />);

    fireEvent.click(screen.getByText('Home'));

    expect(mockResetError).toHaveBeenCalledTimes(1);
    expect(mockRouterReplace).toHaveBeenCalledWith('/');
  });

  it('renders contact us link with correct email address', () => {
    const supportEmail = 'support@example.com';
    process.env.NEXT_PUBLIC_SUPPORT_EMAIL_ADDRESS = supportEmail;

    mockUseErrorStore.mockReturnValueOnce({
      status: STATUS_OPTIONS[500],
      message: 'Internal Server Error',
      resetError: jest.fn(),
    });

    render(<ErrorModal />);

    const contactLink = screen.getByText('Contact us').closest('a');
    expect(contactLink).toHaveAttribute('href', `mailto:${supportEmail}`);
  });

  it('should call handleHome when the modal is closed', () => {
    const mockResetError = jest.fn();
    const mockRouterReplace = jest.fn();
    mockUseRouter.mockReturnValueOnce({
      replace: mockRouterReplace,
    });
    mockUseErrorStore.mockReturnValueOnce({
      status: STATUS_OPTIONS[500],
      message: 'Internal Server Error',
      resetError: mockResetError,
    });

    render(<ErrorModal />);
    fireEvent.click(screen.getByText('Home'));
    expect(mockResetError).toHaveBeenCalled();
    expect(mockRouterReplace).toHaveBeenCalledWith('/');
  });
});
