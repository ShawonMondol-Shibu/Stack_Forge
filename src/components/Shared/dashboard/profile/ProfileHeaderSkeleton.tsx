import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Item, ItemContent } from "@/components/ui/item";
import { Skeleton } from "@/components/ui/skeleton";

export default function ProfileHeaderSkeleton() {
  return (
    <Card
      size="sm"
      className="min-h-80 w-full pt-0"
      aria-busy="true"
      aria-label="Loading profile"
    >
      <div className="relative">
        <Skeleton className="h-32 w-full rounded-none sm:h-48" />
        <div className="absolute -bottom-10 left-4 sm:-bottom-14 sm:left-5">
          <Skeleton className="size-20 rounded-full sm:size-30" />
        </div>
      </div>

      <CardHeader className="ml-0 grid-cols-1 pt-12 sm:ml-36 sm:grid-cols-[1fr_auto] sm:pt-0">
        <Skeleton className="h-5 w-40" />
        <div className="col-start-1 row-start-2 flex gap-2 sm:col-start-2 sm:row-start-1 sm:justify-self-end">
          <Skeleton className="h-8 w-28" />
          <Skeleton className="h-8 w-20" />
        </div>
      </CardHeader>

      <CardContent className="mt-1">
        <div className="ml-0 min-w-0 space-y-2 sm:ml-30">
          <Skeleton className="h-4 w-48 max-w-full" />
          <div className="flex flex-wrap gap-2">
            <Skeleton className="h-4 w-32 max-w-full" />
            <Skeleton className="h-4 w-44 max-w-full" />
          </div>
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4 max-w-full" />
        </div>

        <Item
          size="sm"
          variant="outline"
          className="mt-4 bg-background outline-primary"
        >
          <ItemContent className="grid grid-cols-2 items-center justify-center gap-x-2 gap-y-3 sm:grid-cols-3 md:grid-cols-6">
            {Array.from({ length: 6 }, (_, index) => (
              <div key={index} className="flex flex-col items-center gap-1">
                <Skeleton className="h-4 w-8" />
                <Skeleton className="h-3 w-16 max-w-full" />
              </div>
            ))}
          </ItemContent>
        </Item>
      </CardContent>
    </Card>
  );
}
