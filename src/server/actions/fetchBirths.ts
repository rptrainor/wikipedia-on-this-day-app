"use server"

import { cache } from 'react';
import 'server-only';
import { type WikipediaApiBirthTypeResponse, type BirthType } from "~/types/BirthdayTypes";

export const fetchBirths = cache(async ({ MM, DD }: { MM: string; DD: string }) => {

  const url = `https://api.wikimedia.org/feed/v1/wikipedia/en/onthisday/births/${MM}/${DD}`;
  const response = await fetch(url, {
    headers: {
      'Authorization': `Bearer ${process.env.WIKIPEDIA_ACCESS_TOKEN}`,
      'Api-User-Agent': `${process.env.WIKIPEDIA_APP_NAME}`,
    }
  });
  if (!response.ok) {
    return new Error('Network response was not ok');
  }
  const data = await response.json() as WikipediaApiBirthTypeResponse;
  data.births?.sort((a: BirthType, b: BirthType) => a.year - b.year);
  return data;
});

export const preload = ({ MM, DD }: { MM: string; DD: string }) => {
  void fetchBirths({ MM, DD });
}
