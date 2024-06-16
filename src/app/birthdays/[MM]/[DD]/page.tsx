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
