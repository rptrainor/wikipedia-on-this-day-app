import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogClose,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
} from '~/components/ui/dialog';

describe('Dialog', () => {
  it('renders and opens the dialog', () => {
    render(
      <Dialog>
        <DialogTrigger>Open Dialog</DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Dialog Title</DialogTitle>
          </DialogHeader>
          <DialogDescription>Dialog Description</DialogDescription>
          <DialogFooter>
            <button>Confirm</button>
          </DialogFooter>
          <DialogClose aria-label="Close">Close</DialogClose>
        </DialogContent>
      </Dialog>
    );

    // Verify that the dialog content is not in the document initially
    expect(screen.queryByText('Dialog Title')).not.toBeInTheDocument();
    expect(screen.queryByText('Dialog Description')).not.toBeInTheDocument();

    // Open the dialog
    fireEvent.click(screen.getByText('Open Dialog'));

    // Verify that the dialog content is in the document
    expect(screen.getByText('Dialog Title')).toBeInTheDocument();
    expect(screen.getByText('Dialog Description')).toBeInTheDocument();
  });

  it('calls the onClose function when the close button is clicked', () => {
    const handleClose = jest.fn();

    render(
      <Dialog>
        <DialogTrigger>Open Dialog</DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Dialog Title</DialogTitle>
          </DialogHeader>
          <DialogDescription>Dialog Description</DialogDescription>
          <DialogFooter>
            <button>Confirm</button>
          </DialogFooter>
          <DialogClose aria-label="Close" onClick={handleClose}>Close</DialogClose>
        </DialogContent>
      </Dialog>
    );

    // Open the dialog
    fireEvent.click(screen.getByText('Open Dialog'));

    // Click the close button
    const closeButtons = screen.queryAllByText('Close');
    if (closeButtons[0]) {
      fireEvent.click(closeButtons[0]);
    }

    // Verify that the onClose function was called
    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  it('closes the dialog when the close icon is clicked', () => {
    render(
      <Dialog>
        <DialogTrigger>Open Dialog</DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Dialog Title</DialogTitle>
          </DialogHeader>
          <DialogDescription>Dialog Description</DialogDescription>
          <DialogFooter>
            <button>Confirm</button>
          </DialogFooter>
          <DialogClose aria-label="Close">
            <span className="sr-only">Close</span>
          </DialogClose>
        </DialogContent>
      </Dialog>
    );

    // Open the dialog
    fireEvent.click(screen.getByText('Open Dialog'));

    // Verify that the dialog content is in the document
    expect(screen.getByText('Dialog Title')).toBeInTheDocument();
    expect(screen.getByText('Dialog Description')).toBeInTheDocument();

    // Click the close button
    const closeButton = screen.getByLabelText('Close');
    fireEvent.click(closeButton);

    // Verify that the dialog content is not in the document
    expect(screen.queryByText('Dialog Title')).not.toBeInTheDocument();
    expect(screen.queryByText('Dialog Description')).not.toBeInTheDocument();
  });
});
