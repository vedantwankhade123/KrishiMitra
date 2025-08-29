import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="sticky top-0 z-50 w-full p-4">
        <div className="container flex h-16 items-center justify-between mx-auto max-w-2xl bg-card/50 backdrop-blur-sm border border-primary/10 rounded-full">
            <Skeleton className="h-8 w-24" />
            <Skeleton className="h-8 w-24" />
            <Skeleton className="h-8 w-24" />
            <Skeleton className="h-8 w-24" />
        </div>
      </header>
       <main className="flex-1 flex flex-col container mx-auto w-full max-w-2xl py-8">
        <div className="flex-1 pb-48 space-y-8">
            {/* User prompt skeleton */}
             <div className="flex items-start gap-4 justify-end">
                <div className="max-w-[85%] w-full flex flex-col space-y-2 items-end">
                    <Skeleton className="h-16 w-3/4 rounded-2xl rounded-br-none" />
                </div>
                 <Skeleton className="h-8 w-8 rounded-full" />
            </div>

            {/* Bot response skeleton */}
            <div className="flex items-start gap-4">
                <Skeleton className="h-8 w-8 rounded-full" />
                <div className="max-w-[85%] w-full flex flex-col space-y-2">
                    <div className="p-4 rounded-2xl rounded-bl-none">
                       <div className="flex items-center space-x-2">
                          <p className="text-muted-foreground">Thinking</p>
                           <div className="flex space-x-1">
                               <span className="h-1.5 w-1.5 bg-muted-foreground rounded-full animate-dot-pulse [animation-delay:0s]"></span>
                               <span className="h-1.5 w-1.5 bg-muted-foreground rounded-full animate-dot-pulse [animation-delay:0.2s]"></span>
                               <span className="h-1.5 w-1.5 bg-muted-foreground rounded-full animate-dot-pulse [animation-delay:0.4s]"></span>
                           </div>
                       </div>
                    </div>
                </div>
            </div>
        </div>
      </main>
    </div>
  )
}
