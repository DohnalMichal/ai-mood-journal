'use client'

import { useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { askQuestion } from '@/utils/api'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'

const FormSchema = z.object({
  question: z.string().min(10, {
    message: 'Question must be at least 10 characters',
  }),
})

const Question = () => {
  const [loading, setLoading] = useState(false)
  const [answer, setAnswer] = useState()

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      question: '',
    },
  })

  const onSubmit = async (values: z.infer<typeof FormSchema>) => {
    setLoading(true)
    const { data } = await askQuestion(values.question)
    setAnswer(data)
    setLoading(false)
  }

  return (
    <div className="flex h-full flex-col pr-8">
      <h2 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0">
        Ask a question about your journal
      </h2>
      <Form {...form}>
        <form
          className="flex flex-col gap-4"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FormField
            control={form.control}
            name="question"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  You can ask questions about your journal entries, and the AI
                  will respond with what it thinks you&apos;re asking about.
                </FormLabel>
                <FormControl>
                  <Input placeholder="Ask a question..." {...field} />
                </FormControl>
                {loading && <FormDescription>Thinking 🤔</FormDescription>}
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="ml-auto flex-1">
            <Button disabled={loading} type="submit">
              Ask
            </Button>
          </div>
        </form>
      </Form>
      {!loading && answer && (
        <div className="mt-8">
          <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
            AI Response
          </h3>
          <p className="leading-7 [&:not(:first-child)]:mt-6">{answer}</p>
        </div>
      )}
    </div>
  )
}

export { Question }
