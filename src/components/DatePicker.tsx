'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

import { Modal } from '~/components/Modal'
import CalendarComponent from '~/components/CalendarComponent'

const DatePicker = () => {
  const [isCompanyModalOpen, setIsCompanyModalOpen] = useState<boolean>(false)
  const router = useRouter()

  const handleDateChange = (date: Date) => {
    router.push(`/birthdays/${date.getMonth() + 1}/${date.getDate()}`)
  }
  return (
    <>
      <button
        type="button"
        onClick={() => setIsCompanyModalOpen(true)}
        className={'group/button rounded-lg bg-brand_prose text-black'}

      >
        <span
          className={
            'block -translate-x-1 -translate-y-1 rounded-lg border-2 border-brand_prose bg-brand_primary_light px-4 py-1 font-bold tracking-tight transition-all group-hover/button:-translate-y-2 group-active/button:translate-x-0 group-active/button:translate-y-0 text-lg xs:text-xl text-center text-balance italic'
          }
        >
          or another day&#8230;
        </span>
      </button>
      <Modal isOpen={isCompanyModalOpen} onClose={() => setIsCompanyModalOpen(false)}>
        <CalendarComponent onSelect={handleDateChange} />
      </Modal>
    </>
  )
}

export default DatePicker