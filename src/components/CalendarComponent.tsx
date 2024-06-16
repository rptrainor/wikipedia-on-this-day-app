"use client"

import { Calendar } from "~/components/ui/calendar"

const CalendarComponent = ({ onSelect }: { onSelect: (date: Date) => void }) => {
  return (
    <Calendar
      mode="single"
      selected={new Date()}
      onSelect={(day) => onSelect(day ?? new Date())}
    />
  )
  

}

export default CalendarComponent