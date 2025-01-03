import { Skeleton } from '@/components/ui/skeleton'
import { NewEntry } from '@/components/new-entry'

const LoadingPage = () => {
  return (
    <div>
      <h2 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0">
        Journal
      </h2>
      <NewEntry />
      <div className="mt-8 grid grid-cols-[repeat(auto-fit,minmax(16rem,1fr))] gap-4">
        <CardSkeleton />
        <CardSkeleton />
        <CardSkeleton />
      </div>
    </div>
  )
}

export default LoadingPage

const CardSkeleton = () => {
  return (
    <Skeleton className="flex h-72 flex-col">
      <div className="flex flex-col space-y-1.5 p-6">
        <Skeleton className="h-8" />
        <Skeleton className="h-[60px]" />
      </div>
      <div className="flex flex-col gap-4 p-6 pt-0">
        <Skeleton className="h-4" />
        <Skeleton className="h-3.5" />
      </div>
    </Skeleton>
  )
}
