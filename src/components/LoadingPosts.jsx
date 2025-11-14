import {Card, Skeleton} from "@heroui/react";

export default function LoadingPosts() {
  return (
    <Card className=" space-y-5 p-4 min-w-xl" radius="lg">
 <div className="max-w-[300px] w-full flex items-center gap-3">
      <div>
        <Skeleton className="flex rounded-full w-12 h-12" />
      </div>
      <div className="w-full flex flex-col gap-2">
        <Skeleton className="h-3 w-3/5 rounded-lg" />
        <Skeleton className="h-3 w-4/5 rounded-lg" />
      </div>
    </div>

      <div className="space-y-3">
        <Skeleton className="w-3/5 rounded-lg">
          <div className="h-3 w-3/5 rounded-lg bg-default-200" />
        </Skeleton>
        <Skeleton className="w-4/5 rounded-lg">
          <div className="h-3 w-4/5 rounded-lg bg-default-200" />
        </Skeleton>
        
      </div>

      <Skeleton className="rounded-lg">
        <div className="h-47 rounded-lg bg-default-300" />
      </Skeleton>
      <Skeleton className="h-3 w-2/5 rounded-lg my-3.5" />
<div className="border-gray-200 dark:border-gray-600 border border-b-0 border-x-0 my-1" >
<Skeleton className="h-3 w-3/5 rounded-lg my-3" />
</div>
      
    </Card>
  );
}
