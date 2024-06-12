import React from 'react';
import { useQuery } from '@tanstack/react-query';

import { type GetTodayInHistoryParams, type WikipediaApiBirthTypeResponse } from './types';

export const BirthsList = (props: GetTodayInHistoryParams) => {
  const { language, type, MM, DD } = props;

  const { data, error, isLoading } = useQuery<WikipediaApiBirthTypeResponse, Error>({
    queryKey: ['births', language, type, MM, DD],
    queryFn: async () => {
      const response = await fetch(`/api/onthisday?language=${language}&type=${type}&MM=${MM}&DD=${DD}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    },
  });

  if (error && !isLoading) {
    return <ErrorModal error={error.message} />;
  }

  if (isLoading) {
    return <Loading />;
  }

  return (
    <ul>
      {data?.births.map((birth: { text: string; pages: { title: string }[] }) => (
        <li key={birth.text}>
          <a href={`/en/onthisday/birth/${birth.pages[0]?.title}`}>
            {birth.text}
          </a>
        </li>
      ))}
    </ul>
  );
};

export const ErrorModal = ({ error }: { error: string }) => (
  <div className="modal">
    <div className="modal-content">
      <h2>Error</h2>
      <p>{error}</p>
    </div>
  </div>
);

export const Loading = () => <div>Loading...</div>;