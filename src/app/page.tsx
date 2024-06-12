import Link from "next/link";

function getOrdinalSuffix(day: number): string {
  if (day > 3 && day < 21) return 'th';
  switch (day % 10) {
    case 1: return 'st';
    case 2: return 'nd';
    case 3: return 'rd';
    default: return 'th';
  }
}

export default function HomePage() {

  const today = new Date();
  const DD = today.getDate();
  const MM = today.getMonth() + 1;
  const month = today.toLocaleString('default', { month: 'long' });

  const dayWithSuffix = `${DD}${getOrdinalSuffix(DD)}`;

  return (
    <main className="container flex flex-col items-center justify-center gap-4 xs:gap-12 px-4 pt-2 xs:pt-[20vh] mx-auto max-w-7xl overflow-clip">
      <div className="flex flex-col">
        <span className="xs:text-xl font-bold text-balance text-xl">
          Whose was born on&#8230;
        </span>
        <h1 className="xs:text-6xl font-bold text-balance xs:text-center text-3xl">
          This day in history
        </h1>
      </div>
      <Link
        href={`/en/onthisday/births/${DD}/${MM}`}
        className={'group/button rounded-lg bg-brand_prose text-black'}
        prefetch={true}
      >
        <span
          className={
            'block -translate-x-1 -translate-y-1 rounded-lg border-2 border-brand_prose bg-brand_secondary_light px-4 py-1 font-bold tracking-tight transition-all group-hover/button:-translate-y-2 group-active/button:translate-x-0 group-active/button:translate-y-0 text-lg xs:text-xl text-center text-balance'
          }
        >
          Who was born on {dayWithSuffix} {month}?
        </span>
      </Link>
    </main>
  );
}
