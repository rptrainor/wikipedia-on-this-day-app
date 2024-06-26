import * as React from "react"

import {
  Dialog,
  DialogContent
} from "~/components/ui/dialog"

export function Modal({ children, isOpen, onClose }: { children: React.ReactNode, isOpen: boolean, onClose: () => void }) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose} modal>
      <DialogContent className="max-w-md sm:max-w-[calc(100vw-2rem)] w-auto h-auto mx-auto rounded-md xs:p-2 xs:pt-10">
        {children}
      </DialogContent>
    </Dialog>
  )
}
