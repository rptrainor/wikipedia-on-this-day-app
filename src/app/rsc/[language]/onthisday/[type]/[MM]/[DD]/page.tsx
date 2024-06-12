import React from "react";

import { type OnThisDayPageProps } from "~/features/wikipedia/births/types";
import { getTodayInHistory } from "~/features/wikipedia/utilities";

const OnThisDayPage: React.FC<OnThisDayPageProps> = async ({ params }) => {
  let data;
  try {
    data = await getTodayInHistory({ params });
  } catch (error) {
    console.error('Error fetching data:', error);
    return <div>Error fetching data</div>;
  }

  return (
    <main className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
      <React.Suspense fallback={<div>Loading...</div>}>
        <div>
          <h1>Today in History</h1>
          {/* <span>{JSON.stringify(data)}</span> */}
          <ul>
            {data.births.map((birth) => (
              <li key={birth.text}>
                <a href={`/en/onthisday/birth/${birth.pages[0]?.title}`}>
                  {birth.text}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </React.Suspense>
    </main>
  )
};

export default OnThisDayPage;