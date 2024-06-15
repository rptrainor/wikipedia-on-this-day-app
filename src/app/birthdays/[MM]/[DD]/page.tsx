import { Suspense } from 'react'

import Births from '~/app/birthdays/[MM]/[DD]/births'
import fetchBirths from '~/server/actions/fetchBirths'

export default async function BirthdaysPage({ params }: { params: { MM: string, DD: string } }) {

  const response = await fetchBirths({ MM: params.MM, DD: params.DD })
  const births = response.births;

  return (
    <>
      <h1 className='text-black text-3xl'>Birthdays for {params.MM}/{params.DD}</h1>
      <Suspense fallback={<div className='text-center w-full text-black text-4xl font-black'>Loading...</div>}>
        <Births births={births} />
      </Suspense>
    </>
  )
}
