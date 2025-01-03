'use client'

import { useState } from 'react'
import { ToastAction } from '@radix-ui/react-toast'
import { useToast } from '@/hooks/use-toast'
import { deleteEntry } from '@/utils/api'
import { EntryCard } from './entry-card'
import type { JournalEntry } from '@/types'

type Props = {
  entries: JournalEntry[]
}

const Entries = ({ entries: initialEntries }: Props) => {
  const [entries, setEntries] = useState(initialEntries)
  const { toast } = useToast()

  const onDelete = async (id: string) => {
    // Remove the entry from local state (optimistic update)
    setEntries((prev) => prev.filter((e) => e.id !== id))

    try {
      await deleteEntry(id)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error(error)

      setEntries(initialEntries)

      toast({
        title: 'Error deleting entry',
        description: error.message || 'Something went wrong.',
        variant: 'destructive',
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      })
    }
  }

  return (
    <div className="mt-8 grid grid-cols-[repeat(auto-fit,minmax(16rem,1fr))] gap-4">
      {entries.map((entry) => (
        <EntryCard
          key={entry.id}
          entry={entry}
          onDelete={() => onDelete(entry.id)}
        />
      ))}
    </div>
  )
}

export { Entries }
