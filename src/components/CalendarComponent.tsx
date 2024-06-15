"use client"

import { useEffect, useState } from 'react'

import { Calendar } from "~/components/ui/calendar"

const CalendarComponent = () => {
  const [date, setDate] = useState<Date | undefined>(new Date())

  useEffect(() => {
    console.log({ date })
  }, [date])

  return (
    <Calendar
      mode="single"
      selected={date}
      onSelect={setDate}
    />
  )
  

}

export default CalendarComponent