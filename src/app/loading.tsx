import { Skeleton } from "@/components/ui/skeleton";
import { Header } from "@/components/Header";
import { Sparkles, User, Wheat } from "lucide-react";

const ShimmerSkeleton = ({ className }: { className?: string }) => (
  <div className={`relative overflow-hidden rounded-lg bg-muted ${className}`}>
    <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-primary/10 to-transparent"></div>
  </div>
);

export default function Loading() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 flex flex-col container mx-auto w-full max-w-2xl py-8">
        <div className="flex-1 space-y-8">
          {/* User message skeleton */}
          <div className="flex items-start gap-4 justify-end animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <div className="max-w-[85%] w-full flex flex-col space-y-2 items-end">
              <ShimmerSkeleton className="w-3/4 h-16 rounded-2xl rounded-br-none" />
            </div>
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted text-muted-foreground flex-shrink-0">
                <User className="h-5 w-5" />
            </div>
          </div>

          {/* Bot message skeleton */}
          <div className="flex items-start gap-4 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
             <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary flex-shrink-0">
                <Sparkles className="h-5 w-5" />
            </div>
            <div className="max-w-[85%] w-full flex flex-col space-y-2">
                <ShimmerSkeleton className="w-1/2 h-8 rounded-2xl rounded-bl-none" />
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {[...Array(3)].map((_, i) => (
                        <div key={i} className="flex flex-col rounded-lg border bg-card text-card-foreground shadow-sm p-4 space-y-3">
                             <div className="flex items-center gap-3">
                                <ShimmerSkeleton className="h-10 w-10 rounded-lg" />
                                <ShimmerSkeleton className="h-5 w-24 rounded-md" />
                            </div>
                            <ShimmerSkeleton className="h-4 w-3/4" />
                            <ShimmerSkeleton className="h-4 w-2/3" />
                            <ShimmerSkeleton className="h-4 w-1/2" />
                        </div>
                    ))}
                </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
