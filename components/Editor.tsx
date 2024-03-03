'use client'

import type { JournalEntry } from '@prisma/client'

type Props = {
  entry: JournalEntry
}

const Editor = ({ entry }: Props) => {
  return <div>{entry.content}</div>
}

export default Editor
