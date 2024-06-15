'use client'

import { useQuery } from "@tanstack/react-query"
import { type BirthType } from "~/features/wikipedia/births/types";

import fetchBirths from "~/server/actions/fetchBirths";

export default function Births() {
  const today = new Date();
  const MM = String(today.getMonth() + 1).padStart(2, '0');
  const DD = String(today.getDate()).padStart(2, '0');

  const { data } = useQuery({ queryKey: ['births'], queryFn: () => fetchBirths({ MM, DD }) })
  console.log({ data })
  return (
    <div>
      <h1>Born on {MM}/{DD}...</h1>
      {data?.births.map((birth: BirthType) => (
        <div key={birth.text}>
          <a href={`/en/onthisday/birth/${birth.pages[0]?.title}`}>
            {birth.text} | {birth.year}
          </a>
        </div>
      ))}
    </div>
  )
}
