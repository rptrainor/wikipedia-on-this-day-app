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
  const dayWithSuffix = `${DD}${getOrdinalSuffix(DD)}`;

  return { DD, MM, month, dayWithSuffix };
};

export default function HomePage() {
  const { DD, MM, month, dayWithSuffix } = getDateInfo({ date: new Date() });
  return (
    <main className="container flex flex-col items-center justify-center gap-4 xs:gap-12 px-4 pt-2 xs:pt-[20vh] mx-auto max-w-7xl overflow-clip">
      <div className="flex flex-col">
        <span className="xs:text-xl font-bold text-balance text-xl lowercase">
          Who was born on&#8230;
        </span>
        <h1 className="xs:text-6xl font-bold text-balance xs:text-center text-3xl lowercase">
          This day in history
        </h1>
      </div>
      <Link
        href={`/birthdays/${MM}/${DD}`}
        className={'group/button rounded-lg bg-brand_prose text-black'}
        prefetch={true}
      >
        <span
          className={
            'block -translate-x-1 -translate-y-1 rounded-lg border-2 border-brand_prose bg-brand_secondary_light px-4 py-1 font-bold tracking-tight transition-all group-hover/button:-translate-y-2 group-active/button:translate-x-0 group-active/button:translate-y-0 text-lg xs:text-xl text-center text-balance lowercase'
          }
        >
          Who was born on the {dayWithSuffix} of {month}?
        </span>
      </Link>
      <DatePicker />
    </main>
  );
}
