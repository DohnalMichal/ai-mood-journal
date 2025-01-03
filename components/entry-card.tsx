'use client'

import { format } from 'date-fns'
import { capitalize } from 'lodash'
import { CalendarDays, Circle, Trash2 } from 'lucide-react'
import Link from 'next/link'
import { getSentimentEmoji } from '@/utils/ai'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { Button } from './ui/button'
import type { JournalEntry } from '@/types'

type Props = {
  entry: JournalEntry
  onDelete: () => void
}

const EntryCard = ({ entry, onDelete }: Props) => {
  const date = format(new Date(entry.createdAt), 'd MMMM yyyy')

  return (
    <Card className="flex h-72 flex-col justify-between">
      <CardHeader>
        <CardTitle className="flex h-8 gap-2">
          <Circle
            size={16}
            fill={entry.analysis?.color}
            className="flex-shrink-0"
          />
          <span>{entry.analysis?.subject}</span>
        </CardTitle>
        <CardDescription className="line-clamp-3 h-[60px]">
          {entry.analysis?.summary}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <small className="flex items-center gap-2 text-sm font-medium leading-none">
          <CalendarDays size={16} /> {date}
        </small>

        <small className="flex items-center gap-2 text-sm font-medium leading-none">
          <span className="w-4">
            {getSentimentEmoji(entry.analysis?.sentimentScore)}
          </span>
          <span>{capitalize(entry.analysis?.mood)}</span>
        </small>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" asChild>
          <Link href={`/journal/${entry.id}`}>Edit</Link>
        </Button>

        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="outline">
              <Trash2 />
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                Do you want to delete this entry?
              </AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your
                journal entry and remove your data from our servers.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={onDelete}>Delete</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </CardFooter>
    </Card>
  )
}

export { EntryCard }
