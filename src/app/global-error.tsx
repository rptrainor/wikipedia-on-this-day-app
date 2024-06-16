'use client'

import { useRouter } from 'next/router'
import { useEffect } from 'react'

import useErrorStore, { STATUS_OPTIONS } from '~/stores/ErrorStore'

export default function GlobalError({
  error,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {

  const { status, message, resetError, setStatus, setMessage } = useErrorStore()
  const router = useRouter()

  const handleHome = async () => {
    resetError()
    await router.replace('/')
  }

  useEffect(() => {
    console.error({ error })
    setStatus(STATUS_OPTIONS[500])
    setMessage(error.message)
  }, [error, setStatus, setMessage])

  if (status === STATUS_OPTIONS[200]) return null

  return (
    <html lang='en'>
      <body>
        <div className="flex flex-col items-center justify-end xs:justify-center gap-4 sm:gap-8 py-2 px-4 w-[calc(100vw-2rem)] max-w-md mx-auto h-[80vh] overflow-scroll">
          <div className='flex flex-col gap-2'>
            <h1 className="w-full text-black sm:text-3xl text-base font-extrabold leading-tight text-balance lowercase">
              We are sorry, but something went wrong:
            </h1>
            <small className="sm:text-xl text-xs uppercase font-semibold text-balance leading-tight">{message}</small>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 text-center">
            <button
              type="button"
              className="group/button rounded-lg bg-brand_prose text-black"
              onClick={handleHome}
            >
              <span
                className={
                  'block -translate-x-1 -translate-y-1 rounded-lg border-2 border-brand_prose bg-brand_secondary_light px-4 py-1 font-bold tracking-tight transition-all group-hover/button:-translate-y-2 group-active/button:translate-x-0 group-active/button:translate-y-0 text-base xs:text-xl text-center text-balance lowercase'
                }
              >
                Home
              </span>
            </button>
            <a
              className="group/button rounded-lg bg-brand_prose text-black"
              href={`mailto:${process.env.NEXT_PUBLIC_SUPPORT_EMAIL_ADDRESS}`}
              target='_blank'
              rel='noreferrer'
            >
              <span
                className={
                  'block -translate-x-1 -translate-y-1 rounded-lg border-2 border-brand_prose bg-brand_secondary_light px-4 py-1 font-bold tracking-tight transition-all group-hover/button:-translate-y-2 group-active/button:translate-x-0 group-active/button:translate-y-0 text-base xs:text-xl text-center text-balance lowercase'
                }
              >
                Contact us
              </span>
            </a>
          </div>
        </div>
      </body>
    </html>
  )
}
