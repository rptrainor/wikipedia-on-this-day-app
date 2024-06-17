import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CalendarComponent from '~/components/CalendarComponent';

jest.mock('~/components/ui/calendar', () => ({
  Calendar: ({ onSelect }: { mode: string, selected: Date, onSelect: (date: Date) => void }) => (
    <div>
      <button onClick={() => onSelect(new Date(2023, 5, 17))}>Select June 17, 2023</button>
    </div>
  ),
}));

describe('CalendarComponent', () => {
  it('calls onSelect with the correct date when a date is selected', async () => {
    const handleSelect = jest.fn();

    render(<CalendarComponent onSelect={handleSelect} />);

    await userEvent.click(screen.getByText('Select June 17, 2023'));

    waitFor(() => {
      expect(handleSelect).toHaveBeenCalledTimes(1);
    });

    // Verify the date is correct, ignoring the time part
    const expectedDate = new Date(2023, 5, 17);
    const actualDate = handleSelect.mock.calls[0][0];

    expect(actualDate.getFullYear()).toBe(expectedDate.getFullYear());
    expect(actualDate.getMonth()).toBe(expectedDate.getMonth());
    expect(actualDate.getDate()).toBe(expectedDate.getDate());
  });
});
