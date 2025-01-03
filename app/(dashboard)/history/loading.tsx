import { Skeleton } from '@/components/ui/skeleton'

export default function Loading() {
  return (
    <Skeleton className="w-full">
      <div className="flex flex-col space-y-1.5 p-6">
        <Skeleton className="h-4 w-1/6" />
        <Skeleton className="mt-1.5 h-4 w-2/6" />
      </div>

      <div className="p-6 pt-0">
        <Skeleton className="aspect-video" />
      </div>

      <div className="flex flex-col gap-2 p-6 pt-0">
        <Skeleton className="h-3.5 w-3/12" />
        <Skeleton className="h-4 w-4/12" />
        <Skeleton className="h-3.5 w-1/2" />
      </div>
    </Skeleton>
  )
}
