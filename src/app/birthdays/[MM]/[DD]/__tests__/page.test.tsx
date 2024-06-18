import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import BirthdaysPage from '../page';
import { preload, fetchBirths } from '~/server/actions/fetchBirths';
import { getMonthName, getOrdinalSuffix } from '~/lib/utils';

jest.mock('~/server/actions/fetchBirths', () => ({
  preload: jest.fn(),
  fetchBirths: jest.fn(),
}));

jest.mock('~/lib/utils', () => ({
  getMonthName: jest.fn(),
  getOrdinalSuffix: jest.fn(),
}));

jest.mock('~/components/DatePicker', () => () => <div>DatePicker</div>);

jest.mock('~/app/birthdays/[MM]/[DD]/births', () => () => <div>Births</div>);

describe('BirthdaysPage', () => {
  const params = { MM: '01', DD: '01' };

  beforeEach(() => {
    (getMonthName as jest.Mock).mockReturnValue('January');
    (getOrdinalSuffix as jest.Mock).mockReturnValue('1st');
    (fetchBirths as jest.Mock).mockResolvedValue({ births: [] });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render without crashing', async () => {
    await expect(async () => render(await BirthdaysPage({ params }))).not.toThrow();
  });

  it('renders the correct month name', async () => {
    render(await BirthdaysPage({ params }));

    expect(screen.getByText(/January/)).toBeInTheDocument();
  });

  it('renders the correct day number', async () => {
    render(await BirthdaysPage({ params }));

    expect(screen.getByText(/1st/)).toBeInTheDocument();
  });

  it('renders BirthdaysPage and fetches births data', async () => {
    render(await BirthdaysPage({ params }));

    expect(preload).toHaveBeenCalledWith({ MM: params.MM, DD: params.DD });

    await waitFor(() => {
      expect(fetchBirths).toHaveBeenCalledWith({ MM: params.MM, DD: params.DD });
    });

    expect(screen.getByText(/Birthdays on January 1st/)).toBeInTheDocument();
    expect(screen.getByText(/DatePicker/)).toBeInTheDocument();
    expect(screen.getByText(/Births/)).toBeInTheDocument();
  });

  it('throws an error for invalid date', async () => {
    (fetchBirths as jest.Mock).mockRejectedValue(new Error('Invalid date'));

    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    await expect(async () => render(await BirthdaysPage({ params }))).rejects.toThrow('please enter a valid date');

    consoleErrorSpy.mockRestore();
  });

  it('renders fallback births component during suspense', async () => {
    (fetchBirths as jest.Mock).mockImplementation(
      () => new Promise((resolve) => setTimeout(() => resolve({ births: [] }), 1000))
    );

    render(await BirthdaysPage({ params }));

    expect(screen.getByText(/Births/)).toBeInTheDocument();
  });
});
