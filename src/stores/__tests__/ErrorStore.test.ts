import useErrorStore, { STATUS_OPTIONS } from '~/stores/ErrorStore';

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

  it('should reset error', () => {
    const { setStatus, resetError } = useErrorStore.getState();
    setStatus(STATUS_OPTIONS[500]);
    resetError();
    const { status } = useErrorStore.getState();
    expect(status).toBe(STATUS_OPTIONS[200]);
  });

  it('should handle multiple state updates in sequence', () => {
    const { setStatus } = useErrorStore.getState();
    setStatus(STATUS_OPTIONS[400]);
    let { status } = useErrorStore.getState();
    expect(status).toBe(STATUS_OPTIONS[400]);
    
    setStatus(STATUS_OPTIONS[500]);
    ({ status } = useErrorStore.getState());
    expect(status).toBe(STATUS_OPTIONS[500]);
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
  });
});
