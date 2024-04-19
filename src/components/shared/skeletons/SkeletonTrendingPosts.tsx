import { Skeleton } from "@/components/ui/skeleton"

const SkeletonTrendingPosts = () => {
  return (
    <div className="flex flex-col space-y-3">
      <div className="flex flex-wrap gap-4">
        <Skeleton className="h-32 w-32 bg-dark-4" />
        <Skeleton className="h-32 w-32 bg-dark-4" />
        <Skeleton className="h-32 w-32 bg-dark-4" />
        <Skeleton className="h-32 w-32 bg-dark-4" />
      </div>
    </div>
  )
}

export default SkeletonTrendingPosts
