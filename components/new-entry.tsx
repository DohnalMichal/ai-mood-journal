'use client'

import { useRouter } from 'next/navigation'
import { createNewEntry } from '@/utils/api'
import { Button } from '@/components/button'

const NewEntry = () => {
  const router = useRouter()

  const handleOnClick = async () => {
    const { data } = await createNewEntry()
    router.push(`/journal/${data.id}`)
  }

  return (
    <Button onClick={handleOnClick}>
      <span className="font-semibold">New Entry</span>
    </Button>
  )
}

export { NewEntry }
