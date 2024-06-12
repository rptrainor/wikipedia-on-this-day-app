import Link from "next/link";

export default function HomePage() {
  return (
    <main className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
      <h1 className="text-4xl font-bold">
        Welcome to <span className="text-blue-600">Wikipedia on this day</span>
      </h1>
      <p className="text-lg">
        This is a simple app to show the current Wikipedia article on a given
        day.
      </p>
      <Link
        href="https://github.com/rptrainor/wikipedia-on-this-day-app"
        className="text-blue-600 underline"
      >
        View on GitHub
      </Link>
    </main>
  );
}
