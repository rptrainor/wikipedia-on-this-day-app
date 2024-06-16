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
  const { setStatus, setMessage } = useErrorStore()

  useEffect(() => {
    console.error({ error })
    setStatus(STATUS_OPTIONS[500])
    setMessage(error.message)
  }, [error, setStatus, setMessage])

  return (
    <>
      <ErrorModal />
      {children}
    </>
  )
}
