import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import DatePicker from '~/components/DatePicker';
import { useRouter } from 'next/navigation';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

// Mocking CalendarComponent
jest.mock('~/components/CalendarComponent', () => ({ onSelect }: { onSelect: (date: Date) => void }) => (
  <div>
    <button onClick={() => onSelect(new Date(2023, 5, 17))}>Select June 17, 2023</button>
  </div>
));

describe('DatePicker', () => {
  it('opens the modal when button is clicked and selects a date', async () => {
    const push = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({ push });

    render(<DatePicker />);

    await userEvent.click(screen.getByText('or another day…'));

    waitFor(() => expect(screen.getByText('Select June 17, 2023')).toBeInTheDocument());

    await userEvent.click(screen.getByText('Select June 17, 2023'));

    waitFor(() => expect(push).toHaveBeenCalledWith('/birthdays/06/17'));
  });
});
