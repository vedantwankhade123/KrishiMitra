import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="sticky top-0 z-50 w-full p-4">
        <div className="container flex h-16 items-center justify-center mx-auto max-w-4xl">
             <div className="flex items-center gap-2 bg-card/50 backdrop-blur-sm border border-primary/10 rounded-full p-2">
                <Skeleton className="h-9 w-24 rounded-full" />
                <Skeleton className="h-9 w-24 rounded-full" />
                <Skeleton className="h-9 w-24 rounded-full" />
            </div>
        </div>
      </header>
       <main className="flex-1 flex flex-col container mx-auto w-full max-w-4xl py-8">
        <div className="flex-1 space-y-8 p-4">
            <div className="flex items-start gap-4 justify-end">
                <div className="flex flex-col items-end space-y-2">
                    <Skeleton className="h-12 w-64 rounded-2xl" />
                </div>
                 <Skeleton className="h-8 w-8 rounded-full" />
            </div>
            <div className="flex items-start gap-4">
                <Skeleton className="h-8 w-8 rounded-full" />
                <div className="space-y-2">
                    <Skeleton className="h-4 w-48" />
                    <Skeleton className="h-4 w-32" />
                </div>
            </div>
             <div className="flex items-start gap-4">
                <Skeleton className="h-8 w-8 rounded-full" />
                <div className="space-y-2">
                    <Skeleton className="h-24 w-[500px]" />
                </div>
            </div>
        </div>
      </main>
    </div>
  )
}
