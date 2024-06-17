import { render, screen } from '@testing-library/react';
import { Modal } from '~/components/Modal';

jest.mock('~/components/ui/dialog', () => ({
  Dialog: ({ open, children }: { open: boolean, onOpenChange: () => void, children: React.ReactNode }) => (
    open ? <div>{children}</div> : null
  ),
  DialogContent: ({ children, className }: { children: React.ReactNode, className: string }) => (
    <div className={className}>{children}</div>
  ),
}));

describe('Modal', () => {
  it('renders the modal with content when open', () => {
    render(
      <Modal isOpen={true} onClose={() => {}}>
        <div>Modal Content</div>
      </Modal>
    );

    expect(screen.getByText('Modal Content')).toBeInTheDocument();
  });

  it('does not render the modal content when closed', () => {
    render(
      <Modal isOpen={false} onClose={() => {}}>
        <div>Modal Content</div>
      </Modal>
    );

    expect(screen.queryByText('Modal Content')).not.toBeInTheDocument();
  });
});
