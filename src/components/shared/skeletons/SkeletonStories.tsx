import { Skeleton } from '@/components/ui/skeleton';

const SkeletonStories = () => {
  return (
    <div className="flex justify-center gap-7">
      <Skeleton className="h-14 w-14 rounded-full bg-dark-4" />
      <Skeleton className="h-14 w-14 rounded-full bg-dark-4" />
      <Skeleton className="h-14 w-14 rounded-full bg-dark-4" />
      <Skeleton className="h-14 w-14 rounded-full bg-dark-4" />
      <Skeleton className="h-14 w-14 rounded-full bg-dark-4" />
      <Skeleton className="h-14 w-14 rounded-full bg-dark-4" />
      <Skeleton className="h-14 w-14 rounded-full bg-dark-4" />
      <Skeleton className="h-14 w-14 rounded-full bg-dark-4" />
    </div>
  )
}

export default SkeletonStories;
