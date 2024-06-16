'use client'

import BirthdaysTable from "~/components/BirthdaysTable";
import { type BirthType } from "~/types/BirthdayTypes";

export default function Births({ births }: { births: BirthType[] }) {
  return <BirthdaysTable data={births} />;
}
