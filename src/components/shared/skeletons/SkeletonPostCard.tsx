import { Skeleton } from '@/components/ui/skeleton'

const SkeletonPostCard = () => {
  return (
    <div className='flex flex-col flex-1 w-full max-w-[470px]'>
      <div className='flex justify-center w-full'>
        <div className="flex flex-col gap-7 p-8 pt-2 lg:p-7 w-full max-w-screen-sm">
          <div className="flex-between">
            <div className="flex items-center space-x-4">
              <Skeleton className="h-12 w-12 rounded-full bg-dark-4" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-[250px] bg-dark-4" />
                <Skeleton className="h-4 w-[200px] bg-dark-4" />
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <Skeleton className="h-[450px] w-full rounded-xl bg-dark-4" />
          </div>
          <Skeleton className="h-4 w-[250px] bg-dark-4" />
        </div>
      </div>
    </div>
  )
}

export default SkeletonPostCard
