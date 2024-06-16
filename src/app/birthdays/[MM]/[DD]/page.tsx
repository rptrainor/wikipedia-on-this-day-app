import { Suspense } from 'react'

import Births from '~/app/birthdays/[MM]/[DD]/births'
import DatePicker from '~/components/DatePicker';
import fetchBirths from '~/server/actions/fetchBirths'

export default async function BirthdaysPage({ params }: { params: { MM: string, DD: string } }) {

  const response = await fetchBirths({ MM: params.MM, DD: params.DD })
  const births = response.births;

  return (
    <div className="flex flex-col gap-4 max-w-5xl mx-auto">
      <div className='flex px-4 py-2 gap-4 justify-end items-center'>
        <DatePicker />
      </div>
      <Suspense fallback={<div className='text-center w-full text-black text-4xl font-black'>Loading...</div>}>
        <Births births={births} />
      </Suspense>
    </div>
  )
}
