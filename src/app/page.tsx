import Link from "next/link";

import DatePicker from "~/components/DatePicker";
import { getOrdinalSuffix } from "~/lib/utils";

interface DateInfo {
  DD: number;
  MM: number;
  month: string;
  dayWithSuffix: string;
}

const getDateInfo = ({ date }: { date: Date }): DateInfo => {
  const DD = date.getDate();
  const MM = date.getMonth() + 1;
  const month = new Date(date.getFullYear(), MM - 1, DD).toLocaleString('default', { month: 'long' });
  const dayWithSuffix = `${getOrdinalSuffix(DD)}`;

  return { DD, MM, month, dayWithSuffix };
};

export default function HomePage() {
  const { DD, MM, month, dayWithSuffix } = getDateInfo({ date: new Date() });

  if (isNaN(DD) || isNaN(MM)) {
    return <main className="container flex flex-col items-center h-full min-h-screen xs:min-h-[60vh] sm:min-h-[40vh] justify-center gap-4 sm:gap-8 px-4 pt-2 sm:pt-[20vh] mx-auto max-w-7xl overflow-clip">
      <div className="flex flex-col">
        <span className="sm:text-xl font-bold text-balance text-lg lowercase">
          Who was born on&#8230;
        </span>
        <h1 className="sm:text-6xl font-bold text-balance sm:text-center text-3xl lowercase">
          This day in history
        </h1>
      </div>
      <div className="flex flex-col gap-4 items-end">
        <DatePicker />
      </div>
    </main>;
  }

  return (
    <main className="container flex flex-col items-center h-full min-h-screen xs:min-h-[60vh] sm:min-h-[40vh] justify-center gap-4 sm:gap-8 px-4 pt-2 sm:pt-[20vh] mx-auto max-w-7xl overflow-clip">
      <div className="flex flex-col">
        <span className="sm:text-xl font-bold text-balance text-lg lowercase">
          Who was born on&#8230;
        </span>
        <h1 className="sm:text-6xl font-bold text-balance sm:text-center text-3xl lowercase">
          This day in history
        </h1>
      </div>
      <div
        className="flex flex-col gap-4 items-end"
      >
        <Link
          href={`/birthdays/${MM}/${DD}`}
          className={'group/button rounded-lg bg-brand_prose text-black'}
          prefetch={true}
        >
          <span
            className={
              'block -translate-x-1 -translate-y-1 rounded-lg border-2 border-brand_prose bg-brand_secondary_light px-4 py-1 font-bold tracking-tight transition-all group-hover/button:-translate-y-2 group-active/button:translate-x-0 group-active/button:translate-y-0 text-lg sm:text-xl text-center text-pretty lowercase leading-tight'
            }
          >
            Who was born on the {dayWithSuffix} of {month}?
          </span>
        </Link>
        <DatePicker />
      </div>
    </main>
  );
}
