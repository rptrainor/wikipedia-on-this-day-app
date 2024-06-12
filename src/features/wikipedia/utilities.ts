import { type WikipediaApiBirthTypeResponse, type GetTodayInHistoryParams } from "~/features/wikipedia/births/types";

export const getTodayInHistory = async ({ language, type, MM, DD }: GetTodayInHistoryParams) => {
  const url = `https://api.wikimedia.org/feed/v1/wikipedia/${language}/onthisday/${type}/${MM}/${DD}`;
  const response = await fetch(url, {
    headers: {
      'Authorization': `Bearer ${process.env.WIKIPEDIA_ACCESS_TOKEN}`,
      'Api-User-Agent': `${process.env.WIKIPEDIA_APP_NAME}`,
    },
  });

  if (!response.ok) {
    throw new Error(`Error fetching data: ${response.statusText}`);
  }

  return response.json() as Promise<WikipediaApiBirthTypeResponse>;
};


function getOrdinalSuffix(day: number): string {
  if (day > 3 && day < 21) return 'th';
  switch (day % 10) {
    case 1: return 'st';
    case 2: return 'nd';
    case 3: return 'rd';
    default: return 'th';
  }
}

interface DateInfo {
  DD: number;
  MM: number;
  month: string;
  dayWithSuffix: string;
}

export const getDateInfo = (inputDD?: number, inputMM?: number): DateInfo => {
  const today = new Date();

  const DD = inputDD ?? today.getDate();
  const MM = inputMM ?? today.getMonth() + 1;
  const month = new Date(today.getFullYear(), MM - 1, DD).toLocaleString('default', { month: 'long' });
  const dayWithSuffix = `${DD}${getOrdinalSuffix(DD)}`;

  return { DD, MM, month, dayWithSuffix };
};