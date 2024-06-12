"use client";

import React from "react";
import { QueryClient, QueryClientProvider, type QueryClientConfig } from '@tanstack/react-query';
import { type OnThisDayPageProps } from "~/features/wikipedia/births/types";
import { getDateInfo } from "~/features/wikipedia/utilities";
import { BirthsList } from "~/features/wikipedia/births/components";

const queryClientConfig: QueryClientConfig = {
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
};

const queryClient = new QueryClient(queryClientConfig);

const OnThisDayPage: React.FC<OnThisDayPageProps> = ({ params }) => {
  const { month, dayWithSuffix } = getDateInfo(parseInt(params.DD), parseInt(params.MM));
  return (
    <QueryClientProvider client={queryClient}>
      <main className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
        <div>
          <h1>Who was born on the {dayWithSuffix} of {month}?</h1>
          <BirthsList language={params.language} type={params.type} MM={params.MM} DD={params.DD} />
        </div>
      </main>
    </QueryClientProvider>
  )
};

export default OnThisDayPage;
