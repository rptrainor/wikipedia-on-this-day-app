import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import HomePage from '~/app/page';
import { getOrdinalSuffix } from '~/lib/utils';

jest.mock('~/components/DatePicker', () => () => <div>DatePicker</div>);

jest.mock('next/link', () => {
  return ({ href, children }: { href: string, children: React.ReactNode }) => (
    <a href={href}>{children}</a>
  );
});

jest.mock('~/lib/utils', () => ({
  getOrdinalSuffix: jest.fn(),
}));

describe('HomePage', () => {
  beforeEach(() => {
    (getOrdinalSuffix as jest.Mock).mockImplementation((day: number) => {
      if (day === 1) return '1st';
      if (day === 2) return '2nd';
      if (day === 3) return '3rd';
      return `${day}th`;
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render without crashing', () => {
    render(<HomePage />);
  });

  it('renders the correct day and month', () => {
    render(<HomePage />);

    const today = new Date();
    const DD = today.getDate();
    const MM = today.getMonth() + 1;
    const month = today.toLocaleString('default', { month: 'long' });
    const dayWithSuffix = getOrdinalSuffix(DD);

    expect(screen.getByText(`Who was born on the ${dayWithSuffix} of ${month}?`)).toBeInTheDocument();
  });

  it('displays the "Who was born on..." text', () => {
    render(<HomePage />);

    expect(screen.getByText('Who was born on…')).toBeInTheDocument();
    expect(screen.getByText('This day in history')).toBeInTheDocument();
  });

  it('links to the correct URL', () => {
    render(<HomePage />);

    const today = new Date();
    const DD = today.getDate();
    const MM = today.getMonth() + 1;

    const link = screen.getByRole('link', {
      name: /Who was born on the/,
    });

    expect(link).toHaveAttribute('href', `/birthdays/${MM}/${DD}`);
  });

  it('renders the DatePicker component', () => {
    render(<HomePage />);

    expect(screen.getByText('DatePicker')).toBeInTheDocument();
  });

  // Additional test cases to cover edge cases and improve robustness

  it('renders correctly on different days', () => {
    const customDate = new Date(2020, 4, 10); // May 10, 2020
    jest.spyOn(global, 'Date').mockImplementation(() => customDate);

    render(<HomePage />);

    expect(screen.getByText('Who was born on the 10th of May?')).toBeInTheDocument();

    jest.spyOn(global, 'Date').mockRestore();
  });

  it('handles edge cases for dates', () => {
    const customDate = new Date(2020, 0, 1); // January 1, 2020
    jest.spyOn(global, 'Date').mockImplementation(() => customDate);

    render(<HomePage />);

    expect(screen.getByText('Who was born on the 1st of January?')).toBeInTheDocument();

    jest.spyOn(global, 'Date').mockRestore();
  });

  it('does not render the link with invalid date', () => {
    jest.spyOn(Date.prototype, 'getDate').mockReturnValue(NaN);
    jest.spyOn(Date.prototype, 'getMonth').mockReturnValue(NaN);

    render(<HomePage />);

    const link = screen.queryByRole('link', {
      name: /Who was born on the/,
    });

    expect(link).toBeNull();

    jest.spyOn(Date.prototype, 'getDate').mockRestore();
    jest.spyOn(Date.prototype, 'getMonth').mockRestore();
  });
});
