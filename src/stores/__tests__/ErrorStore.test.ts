import useErrorStore, { STATUS_OPTIONS } from '../ErrorStore';

describe('useErrorStore', () => {
  afterEach(() => {
    const { resetError } = useErrorStore.getState();
    resetError();
  });

  it('should have initial state', () => {
    const { status, message } = useErrorStore.getState();
    expect(status).toBe(STATUS_OPTIONS[200]);
    expect(message).toBe('');
  });

  it('should set status', () => {
    const { setStatus } = useErrorStore.getState();
    setStatus(STATUS_OPTIONS[400]);
    const { status } = useErrorStore.getState();
    expect(status).toBe(STATUS_OPTIONS[400]);
  });

  it('should set message', () => {
    const { setMessage } = useErrorStore.getState();
    setMessage('An error occurred');
    const { message } = useErrorStore.getState();
    expect(message).toBe('An error occurred');
  });

  it('should reset error', () => {
    const { setStatus, setMessage, resetError } = useErrorStore.getState();
    setStatus(STATUS_OPTIONS[500]);
    setMessage('A critical error occurred');
    resetError();
    const { status, message } = useErrorStore.getState();
    expect(status).toBe(STATUS_OPTIONS[200]);
    expect(message).toBe('');
  });
});
