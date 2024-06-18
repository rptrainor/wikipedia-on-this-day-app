'use client'

import { useEffect } from 'react'

import useErrorStore, { STATUS_OPTIONS } from '~/stores/ErrorStore'
import ErrorModal from '~/components/ErrorModal'

export default function Error({
  error,
  children,
}: {
  error: Error & { digest?: string }
  reset: () => void
  children: React.ReactNode
}) {
  const { setStatus } = useErrorStore()

  useEffect(() => {
    setStatus(STATUS_OPTIONS[500])
  }, [error, setStatus])

  return (
    <div className="flex flex-col gap-4 max-w-5xl mx-auto text-black bg-background">
      <ErrorModal />
      {children}
    </div>
  )
}
