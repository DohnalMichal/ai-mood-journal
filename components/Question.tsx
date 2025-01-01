'use client'

import { type ChangeEvent, type FormEvent, useState } from 'react'
import { Button } from '@/components/ui/button'
import { askQuestion } from '@/utils/api'

const Question = () => {
  const [value, setValue] = useState('')
  const [loading, setLoading] = useState(false)
  const [answer, setAnswer] = useState()

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault()
    setValue(event.target.value)
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    setLoading(true)
    const { data } = await askQuestion(value)
    setAnswer(data)
    setLoading(false)
    setValue('')
  }

  return (
    <div className="h-full flex flex-col pr-8">
      <h2 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0">
        Ask a question about your journal
      </h2>
      <p className="w-3/4 mb-4">
        You can ask questions about your journal entries, and the AI will
        respond with what it thinks you&apos;re asking about.
      </p>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          disabled={loading}
          value={value}
          onChange={onChange}
          placeholder="Ask a question..."
          className="w-full h-full p-4 text-md outline-none bg-[#E8F0F2] focus:bg-white border border-[#D1DEE8] rounded-xl"
        />
        <div className="ml-auto flex-1">
          <Button disabled={loading} type="submit">
            Ask
          </Button>
        </div>
      </form>
      {loading && <div className="mt-8">Thinking 🤔</div>}
      {!loading && answer && (
        <div className="mt-8">
          <h3 className="text-lg font-semibold">AI Response</h3>
          <p>{answer}</p>
        </div>
      )}
    </div>
  )
}

export { Question }
