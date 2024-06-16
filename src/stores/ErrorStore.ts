import { create } from 'zustand'

const STATUS = ['200', '400', '500'] as const

type Store = {
  status: typeof STATUS[number]
  message: string
  setStatus: (status: typeof STATUS[number]) => void
  setMessage: (message: string) => void
}

const useErrorStore = create<Store>()((set) => ({
  status: STATUS[0],
  message: '',
  setStatus: (status) => set({ status }),
  setMessage: (message) => set({ message }),
}))

export default useErrorStore