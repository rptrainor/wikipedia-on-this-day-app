import { render, screen } from '@testing-library/react';
import BirthdaysLoader from '~/components/BirthdaysLoader';

jest.mock('~/components/DatePicker', () => () => <div>DatePicker Component</div>);

describe('BirthdaysLoader', () => {
  it('renders the header with the correct text', () => {
    render(<BirthdaysLoader />);
    expect(screen.getByText('Birthdays on')).toBeInTheDocument();
  });

  it('renders the DatePicker component', () => {
    render(<BirthdaysLoader />);
    expect(screen.getByText('DatePicker Component')).toBeInTheDocument();
  });

  it('renders 10 Skeleton components for the loader list', () => {
    render(<BirthdaysLoader />);
    const skeletons = document.querySelectorAll('.animate-pulse.bg-primary\\/10.w-full.rounded-lg.h-4');
    expect(skeletons).toHaveLength(10);
  });

  it('renders the Skeleton component in the header', () => {
    render(<BirthdaysLoader />);
    const headerSkeleton = document.querySelector('h1 .animate-pulse.bg-primary\\/10.w-24.rounded-lg.h-4');
    expect(headerSkeleton).toBeInTheDocument();
  });
});
