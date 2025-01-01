import { format } from 'date-fns'
import { capitalize } from 'lodash'
import { getSentimentEmoji } from '@/utils/ai'
import type { JournalEntry } from '@/types'

const EntryCard = ({ entry }: { entry: JournalEntry }) => {
  const date = format(new Date(entry.createdAt), 'dd.MM')

  return (
    <div className="px-4 overflow-hidden rounded-xl bg-white hover:bg-gray-50 transition-all shadow">
      <div className="flex items-center py-3 gap-2">
        <div
          className="rounded-full w-3 h-3"
          style={{ background: entry.analysis?.color }}
        />
        <div className="text-lg font-semibold">{entry.analysis?.subject}</div>
      </div>
      <div className="text-sm">📅 {date}</div>
      <div className="py-2 text-sm">
        {getSentimentEmoji(entry.analysis?.sentimentScore)}{' '}
        {capitalize(entry.analysis?.mood)}
      </div>
    </div>
  )
}

export { EntryCard }
