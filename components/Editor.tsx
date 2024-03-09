'use client'

import { useState } from 'react'
import { useAutosave } from 'react-autosave'
import { updatedEntry } from '@/utils/api'
import type { JournalEntry } from '@prisma/client'

type Props = {
  entry: JournalEntry
}

const Editor = ({ entry }: Props) => {
  const [value, setValue] = useState(entry.content)
  const [isSaving, setIsSaving] = useState(false)

  useAutosave({
    data: value,
    onSave: async (updatedValue) => {
      if (updatedValue === entry.content) {
        return
      }

      setIsSaving(true)
      const updated = await updatedEntry(entry.id, { content: updatedValue })
      setIsSaving(false)
    },
  })

  return (
    <div className="w-full h-full">
      {isSaving && <div>Saving...</div>}
      <textarea
        className="w-full h-full p-8 text-xl outline-none"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </div>
  )
}

export default Editor
