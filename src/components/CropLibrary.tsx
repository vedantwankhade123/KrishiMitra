

'use client';

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sprout, ArrowLeft, Search, Loader2, Share2, Download } from "lucide-react";
import Image from "next/image";
import { useState, useEffect, useCallback } from "react";
import { Badge } from "./ui/badge";
import { getCropsFromLibrary } from "@/app/actions";
import { useDebounce } from "@/hooks/use-debounce";
import { Skeleton } from "./ui/skeleton";

type Crop = {
    name: string;
    image: string;
    description: string;
    planting: string;
    yield: string;
    varieties: string[];
    climate: string;
    soil: string;
};

export default function CropLibraryPage() {
  const [selectedCrop, setSelectedCrop] = useState<Crop | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  const [crops, setCrops] = useState<Crop[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);

  const fetchCrops = useCallback(async (term: string, pageNum: number) => {
    if (pageNum === 1) {
        setInitialLoading(true);
    } else {
        setLoading(true);
    }
    
    const { crops: newCrops, hasMore: newHasMore } = await getCropsFromLibrary({ 
      page: pageNum, 
      searchTerm: term 
    });
    
    setCrops(prev => pageNum === 1 ? newCrops : [...prev, ...newCrops]);
    setHasMore(newHasMore);
    
    setLoading(false);
    setInitialLoading(false);
  }, []);

  useEffect(() => {
    setPage(1);
    fetchCrops(debouncedSearchTerm, 1);
  }, [debouncedSearchTerm, fetchCrops]);


  const handleLoadMore = () => {
    if (!loading && hasMore) {
      const nextPage = page + 1;
      setPage(nextPage);
      fetchCrops(debouncedSearchTerm, nextPage);
    }
  }

  const renderDetailView = (crop: Crop) => (
    <div className="flex flex-col h-full">
        <header className="mb-4">
            <Button variant="ghost" onClick={() => setSelectedCrop(null)} className="mb-4 text-muted-foreground hover:text-primary">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Library
            </Button>
            <Image src={crop.image} alt={crop.name} width={800} height={300} className="rounded-xl object-cover w-full h-48 md:h-64" data-ai-hint="crop image"/>
        </header>
        <ScrollArea className="flex-1 -mx-4 sm:-mx-6 px-4 sm:px-6">
            <div className="py-4 space-y-4 sm:space-y-6">
                <h2 className="text-2xl sm:text-3xl font-bold text-primary">{crop.name}</h2>
                <p className="text-muted-foreground text-sm sm:text-base">{crop.description}</p>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                    <div className="space-y-3 sm:space-y-4">
                         <div>
                            <h4 className="font-semibold text-foreground text-base sm:text-lg mb-1">Climate</h4>
                            <p className="text-xs sm:text-sm text-muted-foreground">{crop.climate}</p>
                        </div>
                        <div>
                            <h4 className="font-semibold text-foreground text-base sm:text-lg mb-1">Soil Type</h4>
                            <p className="text-xs sm:text-sm text-muted-foreground">{crop.soil}</p>
                        </div>
                         <div>
                            <h4 className="font-semibold text-foreground text-base sm:text-lg mb-1">Common Varieties</h4>
                            <div className="flex flex-wrap gap-1 sm:gap-2">
                                {crop.varieties.map(v => <Badge key={v} variant="secondary" className="text-xs">{v}</Badge>)}
                            </div>
                        </div>
                    </div>
                    <div className="space-y-3 sm:space-y-4">
                        <div>
                            <h4 className="font-semibold text-foreground text-base sm:text-lg mb-1">Planting</h4>
                            <p className="text-xs sm:text-sm text-muted-foreground">{crop.planting}</p>
                        </div>
                        <div>
                            <h4 className="font-semibold text-foreground text-base sm:text-lg mb-1">Expected Yield</h4>
                            <p className="text-xs sm:text-sm text-muted-foreground">{crop.yield}</p>
                        </div>
                    </div>
                </div>
            </div>
        </ScrollArea>
    </div>
  );

  const renderListView = () => (
    <>
      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
        <div className="flex items-center gap-2">
            <Sprout className="h-6 w-6 sm:h-7 sm:w-7 text-primary" />
            <div>
                <h1 className="font-bold text-2xl sm:text-3xl">
                    Crop Library
                </h1>
                <p className="text-muted-foreground text-sm sm:text-base">
                    Browse and learn about different crops.
                </p>
            </div>
        </div>
          <div className="relative sm:ml-auto w-full sm:w-auto">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
                placeholder="Search crops..."
                className="pl-9 h-9 sm:h-10 rounded-full bg-primary/5 border-primary/10 w-full sm:w-64"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
        </div>
      </div>
      <ScrollArea className="flex-1 -mx-6 px-6">
          <div className="py-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {initialLoading ? (
                  Array.from({ length: 9 }).map((_, i) => (
                      <div key={i} className="bg-muted/50 rounded-xl p-3 sm:p-4 flex flex-col gap-3 sm:gap-4">
                          <Skeleton className="w-full h-32 sm:h-40 rounded-lg" />
                          <div className="space-y-2">
                              <Skeleton className="h-5 sm:h-6 w-1/2" />
                              <Skeleton className="h-3 sm:h-4 w-full" />
                              <Skeleton className="h-3 sm:h-4 w-4/5" />
                              <Skeleton className="h-8 sm:h-9 w-full rounded-full mt-3 sm:mt-4" />
                          </div>
                      </div>
                  ))
              ) : crops.length > 0 ? (
                  crops.map((crop) => (
                      <div key={crop.name} className="bg-muted/50 rounded-xl p-3 sm:p-4 flex flex-col gap-3 sm:gap-4">
                          <Image src={crop.image} alt={crop.name} width={400} height={200} className="rounded-lg object-cover w-full h-32 sm:h-40" data-ai-hint="crop image"/>
                          <div className="space-y-2 flex-1 flex flex-col">
                              <h3 className="text-lg sm:text-xl font-bold text-primary">{crop.name}</h3>
                              <p className="text-xs sm:text-sm text-muted-foreground line-clamp-2 flex-grow">{crop.description}</p>
                              <div className="mt-3 sm:mt-4 flex flex-col items-center gap-2">
                                  <Button 
                                      variant="outline"
                                      className="w-full rounded-full text-muted-foreground border-primary/20 hover:bg-primary/10 hover:text-primary text-xs sm:text-sm h-8 sm:h-9"
                                      onClick={() => setSelectedCrop(crop)}
                                      aria-label={`View details for ${crop.name}`}
                                  >
                                      View Details
                                  </Button>
                                   <Button
                                      variant="outline"
                                      className="w-full rounded-full text-muted-foreground border-primary/20 hover:bg-primary/10 hover:text-primary text-xs sm:text-sm h-8 sm:h-9"
                                      aria-label={`Share ${crop.name}`}
                                  >
                                      <Share2 className="mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                                      Share
                                  </Button>
                                  <Button
                                      variant="outline"
                                      className="w-full rounded-full text-muted-foreground border-primary/20 hover:bg-primary/10 hover:text-primary"
                                      aria-label={`Download details for ${crop.name}`}
                                  >
                                      <Download className="mr-2 h-4 w-4" />
                                      Download
                                  </Button>
                              </div>
                          </div>
                      </div>
                  ))
              ) : (
                  <div className="text-center text-muted-foreground col-span-full py-10">
                      <p>No crops found for "{debouncedSearchTerm}"</p>
                  </div>
              )}
          </div>
            {hasMore && (
              <div className="flex justify-center py-4">
                  <Button 
                      variant="outline" 
                      onClick={handleLoadMore} 
                      disabled={loading}
                      className="rounded-full text-muted-foreground border-primary/20 hover:bg-primary/10 hover:text-primary"
                  >
                      {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Load More"}
                  </Button>
              </div>
          )}
      </ScrollArea>
    </>
  )

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 flex flex-col h-full">
        {selectedCrop ? renderDetailView(selectedCrop) : renderListView()}
    </div>
  );
}
