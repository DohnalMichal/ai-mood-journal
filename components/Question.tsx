'use client'

import { type ChangeEvent, type FormEvent, useState } from 'react'

const Question = () => {
  const [value, setValue] = useState('')

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault()
    setValue(event.target.value)
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
  }

  return (
    <div>
      <form onSubmit={handleSubmit} className="flex gap-4">
        <input
          type="text"
          value={value}
          onChange={onChange}
          placeholder="Ask a question..."
          className="border border-black/10 px-4 py-2 text-lg rounded-lg"
        />
        <button type="submit" className="bg-blue-400 px-4 py-2 rounded-lg">
          Ask
        </button>
      </form>
    </div>
  )
}

export default Question
