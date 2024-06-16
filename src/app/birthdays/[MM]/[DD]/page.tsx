import { Suspense } from 'react';
import Births from '~/app/birthdays/[MM]/[DD]/births';
import { getOrdinalSuffix, getMonthName } from '~/lib/utils';
import DatePicker from '~/components/DatePicker';
import { preload, fetchBirths } from '~/server/actions/fetchBirths';

export default async function BirthdaysPage({ params }: { params: { MM: string, DD: string } }) {
  const monthNumber = parseInt(params.MM, 10);
  const dayNumber = parseInt(params.DD, 10);

  preload({ MM: params.MM, DD: params.DD });

  const response = await fetchBirths({ MM: params.MM, DD: params.DD });
  const births = response.births;

  const monthName = getMonthName(monthNumber);

  return (
    <div className="flex flex-col gap-4 max-w-5xl mx-auto">
      <div className='flex py-2 pt-3 gap-4 justify-between items-end xs:flex-row flex-col px-2'>
      <h1 className='text-2xl lowercase leading-tight pb-8'>{`Birthdays on ${monthName} ${getOrdinalSuffix(dayNumber)}`}</h1>
        <DatePicker />
      </div>
      <Suspense fallback={<div className='text-center w-full text-black text-4xl font-black'>Loading...</div>}>
        <Births births={births} />
      </Suspense>
    </div>
  );
}
