"use server"

import { type WikipediaApiBirthTypeResponse } from "~/features/wikipedia/births/types";

const fetchBirths = async ({ MM, DD }: { MM: string; DD: string }) => {
  const url = `https://api.wikimedia.org/feed/v1/wikipedia/en/onthisday/births/${MM}/${DD}`;
  const response = await fetch(url, {
    headers: {
      'Authorization': `Bearer ${process.env.WIKIPEDIA_ACCESS_TOKEN}`,
      'Api-User-Agent': `${process.env.WIKIPEDIA_APP_NAME}`,
    },
  });
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json() as Promise<WikipediaApiBirthTypeResponse>;
}

export default fetchBirths;