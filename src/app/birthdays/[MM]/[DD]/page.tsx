import { Suspense } from 'react';
import Births from '~/app/birthdays/[MM]/[DD]/births';
import { getOrdinalSuffix } from '~/app/page';
import DatePicker from '~/components/DatePicker';
import fetchBirths from '~/server/actions/fetchBirths';

const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
] as const;

function getMonthName(monthNumber: number): typeof MONTH_NAMES[number] | null {
  if (monthNumber < 1 || monthNumber > 12) {
    return null;
  }
  return MONTH_NAMES[monthNumber - 1] ?? null;
}

export default async function BirthdaysPage({ params }: { params: { MM: string, DD: string } }) {
  const monthNumber = parseInt(params.MM, 10);
  const dayNumber = parseInt(params.DD, 10);

  if (isNaN(monthNumber) || isNaN(dayNumber)) {
    return <div>Invalid date</div>;
  }

  const response = await fetchBirths({ MM: params.MM, DD: params.DD });
  const births = response.births;

  const monthName = getMonthName(monthNumber);

  return (
    <div className="flex flex-col gap-4 max-w-5xl mx-auto">
      <div className='flex py-2 pt-3 gap-4 justify-between items-center'>
        <h1 className='text-2xl lowercase'>{`Birthdays on ${monthName} ${dayNumber}${getOrdinalSuffix(dayNumber)}`}</h1>
        <DatePicker />
      </div>
      <Suspense fallback={<div className='text-center w-full text-black text-4xl font-black'>Loading...</div>}>
        <Births births={births} />
      </Suspense>
    </div>
  );
}
