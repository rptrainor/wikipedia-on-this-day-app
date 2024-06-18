'use client'

import DatePicker from '~/components/DatePicker';
import { Skeleton } from "~/components/ui/skeleton"

const loaderList = new Array(10).fill(0).map((_, index) => index);
const BirthdaysLoader = () => {
  return (
    <div className="flex flex-col gap-4 max-w-5xl mx-auto">
      <div className='py-2 pt-3 gap-2 justify-between items-end xs:items-start xs:flex-row flex-col px-2 flex xs:grid xs:grid-cols-2'>
        <h1 className='sm:text-2xl lowercase leading-tight text-balance flex flex-row items-center justify-start gap-2'>Birthdays on  <Skeleton className='w-24 rounded-lg h-4' />
        </h1>
        <div className='flex justify-end'>
          <DatePicker />
        </div>
      </div>
      {loaderList.map((index) => (
        <Skeleton key={index} className='w-full rounded-lg h-4' />
      ))}
    </div>
  )
}

export default BirthdaysLoader