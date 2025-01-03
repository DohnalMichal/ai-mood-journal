'use client'

import { format } from 'date-fns'
import { capitalize } from 'lodash'
import { getSentimentEmoji } from '@/utils/ai'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { CalendarDays, Circle, Trash2 } from 'lucide-react'
import { Button } from './ui/button'
import Link from 'next/link'
import type { JournalEntry } from '@/types'

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

type Props = {
  entry: JournalEntry
  onDelete: () => void
}

const EntryCard = ({ entry, onDelete }: Props) => {
  const date = format(new Date(entry.createdAt), 'd MMMM yyyy')

  return (
    <Card className="h-72 flex flex-col justify-between">
      <CardHeader>
        <CardTitle className="flex gap-2 h-8">
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
        <small className="text-sm font-medium leading-none flex items-center gap-2">
          <CalendarDays size={16} /> {date}
        </small>

        <small className="text-sm font-medium leading-none flex items-center gap-2">
          <span className="w-4">
            {getSentimentEmoji(entry.analysis?.sentimentScore)}
          </span>
          <span>{capitalize(entry.analysis?.mood)}</span>
        </small>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" asChild>
          <Link href={`/journal/${entry.id}`}>View</Link>
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
