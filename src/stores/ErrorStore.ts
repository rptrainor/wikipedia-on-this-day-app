import { create } from 'zustand';

export const STATUS_OPTIONS = { 200: '200', 400: '400', 500: '500' } as const;

type Store = {
  status: typeof STATUS_OPTIONS[keyof typeof STATUS_OPTIONS];
  message: string;
  setStatus: (status: typeof STATUS_OPTIONS[keyof typeof STATUS_OPTIONS]) => void;
  setMessage: (message: string) => void;
  resetError: () => void;
};

const useErrorStore = create<Store>((set) => ({
  status: STATUS_OPTIONS[200],
  message: '',
  setStatus: (status) => {
    if (Object.values(STATUS_OPTIONS).includes(status)) {
      set({ status });
    }
  },
  setMessage: (message) => set({ message }),
  resetError: () => set({ status: STATUS_OPTIONS[200], message: '' }),
}));

export default useErrorStore;
