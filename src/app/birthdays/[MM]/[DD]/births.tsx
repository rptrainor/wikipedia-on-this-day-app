'use client'

import { type BirthType } from "~/features/wikipedia/births/types";

export default function Births({ births }: { births: BirthType[] }) {

  return (
    <div>
      {births.map((birth: BirthType) => (
        <div key={birth.text}>
          <a href={`/en/onthisday/birth/${birth.pages[0]?.title}`}>
            {birth.text} | {birth.year}
          </a>
        </div>
      ))}
    </div>
  );
}
