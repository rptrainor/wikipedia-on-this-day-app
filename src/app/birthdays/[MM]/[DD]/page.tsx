import { Suspense } from 'react';

import Births from '~/app/birthdays/[MM]/[DD]/births';
import { getOrdinalSuffix, getMonthName } from '~/lib/utils';
import DatePicker from '~/components/DatePicker';
import { preload, fetchBirths } from '~/server/actions/fetchBirths';

const isValidDate = (month: number, day: number) => {
  return (
    !isNaN(month) &&
    !isNaN(day) &&
    month >= 1 &&
    month <= 12 &&
    day >= 1 &&
    day <= new Date(2020, month, 0).getDate()
  );
};

export default async function BirthdaysPage({ params }: { params: { MM: string, DD: string } }) {
  const monthNumber = parseInt(params.MM, 10);
  const dayNumber = parseInt(params.DD, 10);

  if (!isValidDate(monthNumber, dayNumber)) {
    throw new Error('Invalid date');
  }

  preload({ MM: params.MM, DD: params.DD });
  const monthName = getMonthName(monthNumber);
  let births = []

  try {
    const response = await fetchBirths({ MM: params.MM, DD: params.DD })
    if (response instanceof Error) throw response
    births = response.births;
  } catch (error) {
    throw new Error('Please enter a valid date');
  }

  return (
    <div className="flex flex-col gap-4 max-w-5xl mx-auto">
      <div className='py-2 pt-3 gap-2 justify-between items-end xs:items-start xs:flex-row flex-col px-2 flex xs:grid xs:grid-cols-2'>
        <h1 className='sm:text-2xl lowercase leading-tight text-balance'>{`Birthdays on ${monthName} ${getOrdinalSuffix(dayNumber)}`}</h1>
        <div className='flex justify-end'>
          <DatePicker />
        </div>
      </div>
      <Suspense fallback={<Births births={[]} />}>
        <Births births={births} />
      </Suspense>
    </div>
  );
}
