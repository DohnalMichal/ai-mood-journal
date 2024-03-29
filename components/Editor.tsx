'use client'

import { useState } from 'react'
import { useAutosave } from 'react-autosave'
import { capitalize, toString } from 'lodash'
import { updateEntry } from '@/utils/api'
import { provideDefaults } from '@/utils/analysis'
import type { JournalEntry } from '@/types'

const Editor = ({ entry }: { entry: JournalEntry }) => {
  const [value, setValue] = useState(entry.content)
  const [isSaving, setIsSaving] = useState(false)
  const [analysis, setAnalysis] = useState(provideDefaults(entry.analysis))

  const { mood, summary, color, subject, negative, sentimentScore } = analysis

  const analysisData = [
    { name: '📋 Subject', value: subject },
    { name: '📝 Summary', value: summary },
    { name: `🌝 Mood`, value: mood },
    { name: '👎 Negative', value: negative ? 'True' : 'False' },
    { name: '🎭 Sentiment', value: toString(sentimentScore) },
  ]

  useAutosave({
    data: value,
    onSave: async (text) => {
      if (text === entry.content) {
        return
      }

      setIsSaving(true)
      const { data } = await updateEntry(entry.id, { content: text })
      setAnalysis(data.analysis)
      setIsSaving(false)
    },
  })

  return (
    <div className="w-full h-full flex flex-col gap-16 pr-8">
      <div className="w-full h-2/5">
        {isSaving && <div>Saving...</div>}
        <textarea
          placeholder="Write your journal entry here"
          className="w-full h-full p-4 text-md outline-none bg-[#E8F0F2] focus:bg-white border border-[#D1DEE8] rounded-xl"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </div>
      <div>
        <div className="flex items-center py-3 gap-2">
          <div className="rounded-full w-3 h-3" style={{ background: color }} />
          <h2 className="text-xl font-semibold">
            Analysis of your journal entry
          </h2>
        </div>

        <ul className="w-2/3">
          {analysisData.map((item) => (
            <li
              key={item.name}
              className="px-2 py-2 flex flex-col items-start gap-1"
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

export default Editor
