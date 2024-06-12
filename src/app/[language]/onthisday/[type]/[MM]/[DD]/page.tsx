"use client";

import React from "react";
import { type OnThisDayPageProps } from "~/features/wikipedia/births/types";
import { getDateInfo } from "~/features/wikipedia/utilities";
// import { BirthsList } from "~/features/wikipedia/births/components";

const OnThisDayPage: React.FC<OnThisDayPageProps> = ({ params }) => {
  const { month, dayWithSuffix } = getDateInfo(parseInt(params.DD), parseInt(params.MM));
  return (
      <main className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
        <div>
          <h1>Who was born on the {dayWithSuffix} of {month}?</h1>
          {/* <BirthsList language={params.language} type={params.type} MM={params.MM} DD={params.DD} /> */}
        </div>
      </main>
  )
};

export default OnThisDayPage;
