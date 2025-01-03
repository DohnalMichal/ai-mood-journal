'use client'

import { useState } from 'react'
import { capitalize, toString } from 'lodash'
import { CalendarIcon, Circle, LoaderCircle } from 'lucide-react'

import { format } from 'date-fns'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { provideDefaults } from '@/utils/analysis'
import { updateEntry } from '@/utils/api'
import { Label } from './ui/label'
import { Textarea } from './ui/textarea'
import { Form, FormField, FormItem } from './ui/form'
import type { JournalEntry } from '@/types'

const FormSchema = z.object({
  date: z.date({
    required_error: 'A date of a journal entry is required.',
  }),
  content: z.string({
    required_error: 'A journal entry is required.',
  }),
})

const Editor = ({ entry }: { entry: JournalEntry }) => {
  const [isSaving, setIsSaving] = useState(false)
  const [analysis, setAnalysis] = useState(provideDefaults(entry.analysis))

  const { mood, summary, color, subject, negative, sentimentScore } = analysis

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      date: new Date(entry.createdAt),
      content: entry.content,
    },
  })

  const analysisData = [
    { name: '📋 Subject', value: subject },
    { name: '📝 Summary', value: summary },
    { name: `🌝 Mood`, value: mood },
    { name: '👎 Negative', value: negative ? 'True' : 'False' },
    { name: '🎭 Sentiment', value: toString(sentimentScore) },
  ]

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    setIsSaving(true)
    const { data: updatedEntry } = await updateEntry(entry.id, {
      content: data.content,
      createdAt: data.date,
      updatedAt: data.date,
    })
    setAnalysis(updatedEntry.analysis)
    setIsSaving(false)
  }

  return (
    <div className="flex h-full w-full flex-col pr-8">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <Label className="pb-1">Write your thoughts</Label>
                <Textarea
                  placeholder="Write your journal entry here"
                  className="text-md h-[250px] w-full px-4 py-2"
                  {...field}
                />
              </FormItem>
            )}
          />

          <div className="flex gap-8">
            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <Popover>
                    <Label className="pb-1">Select a date</Label>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          'w-[240px] justify-start text-left font-normal',
                          !field.value && 'text-muted-foreground',
                        )}
                      >
                        <CalendarIcon />
                        {field.value ? (
                          format(field.value, 'd MMMM yyyy')
                        ) : (
                          <span>Pick a date</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isSaving} className="self-end">
              {isSaving && <LoaderCircle className="animate-spin" />}
              Save
            </Button>
          </div>
        </form>
      </Form>
      <div className="mt-10">
        <div className="flex items-center gap-2 py-3">
          <Circle size={16} fill={color} className="flex-shrink-0" />
          <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
            Analysis of your journal entry
          </h3>
        </div>

        <ul className="w-2/3">
          {analysisData.map((item) => (
            <li
              key={item.name}
              className="flex flex-col items-start gap-1 py-2 pr-2"
            >
              <span className="text-md font-semibold">{item.name}</span>
              <span>{capitalize(item.value)}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export { Editor }
