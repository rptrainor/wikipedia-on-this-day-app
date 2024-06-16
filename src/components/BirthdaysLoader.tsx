'use client'

import Births from '~/app/birthdays/[MM]/[DD]/births';
import DatePicker from '~/components/DatePicker';

const BirthdaysLoader = () => {
  return (
    <div className="flex flex-col gap-4 max-w-5xl mx-auto">
    <div className='py-2 pt-3 gap-2 justify-between items-end xs:items-start xs:flex-row flex-col px-2 flex xs:grid xs:grid-cols-2'>
    <h1 className='sm:text-2xl lowercase leading-tight text-balance'>Birthdays on</h1>
      <div className='flex justify-end'>
        <DatePicker />
      </div>
    </div>
    <Births births={[]} />
  </div>
  )
}

export default BirthdaysLoader