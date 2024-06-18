import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import ErrorComponent from '../error'; 
import useErrorStore, { STATUS_OPTIONS } from '~/stores/ErrorStore';

jest.mock('~/stores/ErrorStore', () => {
  return {
    __esModule: true,
    STATUS_OPTIONS: {
      200: 'OK',
      500: 'Internal Server Error',
    },
    default: jest.fn(),
  };
});

// Mock ErrorModal component
jest.mock('~/components/ErrorModal', () => () => <div data-testid="error-modal">ErrorModal</div>);

describe('ErrorComponent', () => {
  let useErrorStoreMock: jest.Mock;

  beforeAll(() => {
    useErrorStoreMock = useErrorStore as unknown as jest.Mock;
  });

  beforeEach(() => {
    useErrorStoreMock.mockReturnValue({
      status: STATUS_OPTIONS[500],
      message: 'Test error message',
      setStatus: jest.fn(),
      setMessage: jest.fn(),
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render without crashing', () => {
    render(
      <ErrorComponent error={new Error('Test error')} reset={jest.fn()}>
        <div>Test Child</div>
      </ErrorComponent>
    );
  });

  it('renders the ErrorModal component', () => {
    render(
      <ErrorComponent error={new Error('Test error')} reset={jest.fn()}>
        <div>Test Child</div>
      </ErrorComponent>
    );
    expect(screen.getByTestId('error-modal')).toBeInTheDocument();
    expect(screen.getByText('ErrorModal')).toBeInTheDocument();
  });

  it('sets the error message and status in the store on mount', () => {
    const setStatusMock = jest.fn();
    const setMessageMock = jest.fn();
    useErrorStoreMock.mockReturnValue({
      setStatus: setStatusMock,
      setMessage: setMessageMock,
    });

    render(
      <ErrorComponent error={new Error('Test error')} reset={jest.fn()}>
        <div>Test Child</div>
      </ErrorComponent>
    );

    expect(setStatusMock).toHaveBeenCalledWith(STATUS_OPTIONS[500]);
    expect(setMessageMock).toHaveBeenCalledWith('Test error');
  });

  it('renders children correctly', () => {
    render(
      <ErrorComponent error={new Error('Test error')} reset={jest.fn()}>
        <div>Test Child</div>
      </ErrorComponent>
    );
    expect(screen.getByText('Test Child')).toBeInTheDocument();
  });
});
