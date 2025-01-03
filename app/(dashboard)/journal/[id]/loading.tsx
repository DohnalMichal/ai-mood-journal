import React from 'react'
import { Skeleton } from '@/components/ui/skeleton'

const LoadingPage = () => {
  return (
    <div className="h-full p-10">
      <Skeleton className="mb-2 h-11" />
      <div className="space-y-8">
        <div className="flex flex-col space-y-2">
          <Skeleton className="h-[18px]" />
          <Skeleton className="h-[60px]" />
        </div>
        <div className="flex gap-8">
          <div className="flex flex-col space-y-2">
            <Skeleton className="h-[18px]" />
            <Skeleton className="h-9 w-[240px]" />
          </div>
          <Skeleton className="h-9 w-16 self-end" />
        </div>
      </div>
    </div>
  )
}

export default LoadingPage
