'use client'

import { useState } from 'react'
import { useTransition } from 'react'
import { Button } from '../ui/button'
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '../ui/alert-dialog'
import { toast } from 'sonner'

const DeleteDialog = ({
  id,
  action,
}: {
  id: string
  action: (id: string) => Promise<{ success: boolean; message: string }>
}) => {
  const [open, setOpen] = useState(false)
  const [isPending, startTransition] = useTransition()

  const handleDeleteClick = () => {
    startTransition(async () => {
      const res = await action(id)

      if (!res.success) {
        toast.error(res.message)
      } else {
        setOpen(false)
        toast.success(res.message)
      }
    })
  }

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button size='sm' variant='outlineRed' className='ml-2 cursor-pointer'>
          Delete
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className='bg-gray-100 border-gray-200 text-gray-600'>
        <AlertDialogHeader>
          <AlertDialogTitle className='text-gray-700'>
            Are you absolutely sure?
          </AlertDialogTitle>
          <AlertDialogDescription>
            This action can't be undone
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className='text-gray-800'>
          <AlertDialogCancel className='cursor-pointer'>
            Cancel
          </AlertDialogCancel>
          <Button
            variant='outlineRed'
            disabled={isPending}
            onClick={handleDeleteClick}
            className='cursor-pointer'
          >
            {isPending ? 'Deleting...' : 'Delete'}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default DeleteDialog
