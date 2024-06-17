import { render, screen } from '@testing-library/react';
import BirthdaysLoader from '~/components/BirthdaysLoader';

jest.mock('~/components/DatePicker', () => () => <div>DatePicker Component</div>);

jest.mock('~/app/birthdays/[MM]/[DD]/births', () => ({ births }: { births: any[] }) => (
  <div>Births Component with {births.length} births</div>
));

describe('BirthdaysLoader', () => {
  it('renders the header with the correct text', () => {
    render(<BirthdaysLoader />);
    expect(screen.getByText('Birthdays on')).toBeInTheDocument();
  });

  it('renders the DatePicker component', () => {
    render(<BirthdaysLoader />);
    expect(screen.getByText('DatePicker Component')).toBeInTheDocument();
  });

  it('renders the Births component with an empty array', () => {
    render(<BirthdaysLoader />);
    expect(screen.getByText('Births Component with 0 births')).toBeInTheDocument();
  });
});
