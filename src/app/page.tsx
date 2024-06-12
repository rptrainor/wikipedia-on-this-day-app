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
  const month = today.toLocaleString('default', { month: 'long' }); // Get the full month name

  const dayWithSuffix = `${DD}${getOrdinalSuffix(DD)}`;

  return (
    <main className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
      <h1 className="text-4xl font-bold">
        Discover events that have happened on the {dayWithSuffix} day of {month} in history
      </h1>
      <Link
        href={`/en/onthisday/all/${DD}/${MM}`}
        className="text-blue-600 underline"
      >
        <h2>What happened on {dayWithSuffix} {month}?</h2>
      </Link>
    </main>
  );
}
