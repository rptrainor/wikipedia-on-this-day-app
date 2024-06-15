'use client'

import BirthdaysTable from "~/components/BirthdaysTable";
import { type BirthType } from "~/features/wikipedia/births/types";

export default function Births({ births }: { births: BirthType[] }) {
  return <BirthdaysTable data={births} />;
}
