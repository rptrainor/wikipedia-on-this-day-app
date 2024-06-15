'use client'

import { useState } from 'react'
import { Modal } from './Modal'
import CalendarComponent from './CalendarComponent'

const DatePicker = () => {
  const [isCompanyModalOpen, setIsCompanyModalOpen] = useState(false)

  return (
    <>
      <button
        type="button"
        onClick={() => setIsCompanyModalOpen(true)}
        className={'group/button rounded-lg bg-brand_prose text-black'}

      >
        <span
          className={
            'block -translate-x-1 -translate-y-1 rounded-lg border-2 border-brand_prose bg-brand_primary_light px-4 py-1 font-bold tracking-tight transition-all group-hover/button:-translate-y-2 group-active/button:translate-x-0 group-active/button:translate-y-0 text-lg xs:text-xl text-center text-balance'
          }
        >
          or select another date...
        </span>
      </button>
      <Modal isOpen={isCompanyModalOpen} onClose={() => setIsCompanyModalOpen(false)}>
        <CalendarComponent />
      </Modal>
    </>
  )
}

export default DatePicker