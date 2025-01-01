import { format } from 'date-fns'
import { capitalize } from 'lodash'
import { getSentimentIcon } from '@/utils/ai'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { CalendarDays } from 'lucide-react'
import { Button } from './ui/button'
import Link from 'next/link'
import type { JournalEntry } from '@/types'

const EntryCard = ({ entry }: { entry: JournalEntry }) => {
  const date = format(new Date(entry.createdAt), 'dd.MM.yyyy')

  return (
    <Card className="h-72 flex flex-col justify-between">
      <CardHeader>
        <CardTitle>{entry.analysis?.subject}</CardTitle>
        <CardDescription className="line-clamp-3">
          {entry.analysis?.summary}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <small className="text-sm font-medium leading-none flex items-center gap-2">
          <CalendarDays size={16} /> Date: {date}
        </small>

        <small className="text-sm font-medium leading-none flex items-center gap-2">
          {getSentimentIcon(
            entry.analysis?.sentimentScore,
            entry.analysis?.color,
          )}
          {capitalize(entry.analysis?.mood)}
        </small>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" asChild>
          <Link href={`/journal/${entry.id}`}>View</Link>
        </Button>
        {/* TODO: Implement */}
        {/* <Button variant="destructive">Delete</Button> */}
      </CardFooter>
    </Card>
  )
}

export { EntryCard }
