'use client'

import { type ChangeEvent, type FormEvent, useState } from 'react'
import { askQuestion } from '@/utils/api'

const Question = () => {
  const [value, setValue] = useState('')
  const [loading, setLoading] = useState(false)
  const [response, setResponse] = useState()

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault()
    setValue(event.target.value)
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    setLoading(true)
    const answer = await askQuestion(value)
    setResponse(answer)
    setLoading(false)
    setValue('')
  }

  return (
    <div>
      <form onSubmit={handleSubmit} className="flex gap-4">
        <input
          type="text"
          disabled={loading}
          value={value}
          onChange={onChange}
          placeholder="Ask a question..."
          className="border border-black/10 px-4 py-2 text-lg rounded-lg"
        />
        <button
          disabled={loading}
          type="submit"
          className="bg-blue-400 px-4 py-2 rounded-lg"
        >
          Ask
        </button>
      </form>
      {loading && <div>Loading...</div>}
      {response && <div>{response}</div>}
    </div>
  )
}

export default Question
