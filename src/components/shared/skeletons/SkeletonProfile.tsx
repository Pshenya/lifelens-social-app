import { Skeleton } from "@/components/ui/skeleton"

const SkeletonProfile = () => {
  return (
    <div className="flex items-center space-x-4">
      <Skeleton className="h-12 w-12 rounded-full bg-dark-4" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[250px] bg-dark-4" />
        <Skeleton className="h-4 w-[200px] bg-dark-4" />
      </div>
    </div>
  )
}

export default SkeletonProfile
