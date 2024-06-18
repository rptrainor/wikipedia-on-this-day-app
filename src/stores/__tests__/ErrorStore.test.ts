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

  it('should handle multiple state updates in sequence', () => {
    const { setStatus, setMessage } = useErrorStore.getState();
    setStatus(STATUS_OPTIONS[400]);
    setMessage('Bad request error');
    let { status, message } = useErrorStore.getState();
    expect(status).toBe(STATUS_OPTIONS[400]);
    expect(message).toBe('Bad request error');
    
    setStatus(STATUS_OPTIONS[500]);
    setMessage('Internal server error');
    ({ status, message } = useErrorStore.getState());
    expect(status).toBe(STATUS_OPTIONS[500]);
    expect(message).toBe('Internal server error');
  });

  it('should not update state with invalid status', () => {
    const { setStatus } = useErrorStore.getState();
    const invalidStatus = '999';
    setStatus(invalidStatus as any);
    const { status } = useErrorStore.getState();
    expect(status).toBe(STATUS_OPTIONS[200]);
  });

  it('should have functional selectors', () => {
    const { getState } = useErrorStore;
    const state = getState();
    expect(state.status).toBe(STATUS_OPTIONS[200]);
    expect(state.message).toBe('');
  });
});
