
'use client';

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sprout, ArrowLeft, Search } from "lucide-react";
import Image from "next/image";
import { useState, useMemo } from "react";
import { Badge } from "./ui/badge";
import cropData from '@/lib/crop-data.json';

type Crop = (typeof cropData)[0];


export function CropLibrary() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCrop, setSelectedCrop] = useState<Crop | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const handleOpenChange = (open: boolean) => {
    if (!open) {
        // Reset view when closing the dialog
        setTimeout(() => {
            setSelectedCrop(null)
            setSearchTerm("")
        }, 300);
    }
    setIsOpen(open);
  }

  const filteredCrops = useMemo(() => {
    return cropData.filter(crop => 
        crop.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);


  const renderDetailView = (crop: Crop) => (
    <div className="flex flex-col h-full">
        <header className="mb-4">
            <Button variant="ghost" onClick={() => setSelectedCrop(null)} className="mb-4 text-muted-foreground hover:text-primary">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Library
            </Button>
            <Image src={crop.image} alt={crop.name} width={800} height={300} className="rounded-xl object-cover w-full h-48 md:h-64" data-ai-hint="crop image"/>
        </header>
        <ScrollArea className="flex-1 -mx-6 px-6">
            <div className="py-4 space-y-6">
                <h2 className="text-3xl font-bold text-primary">{crop.name}</h2>
                <p className="text-muted-foreground">{crop.description}</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                         <div>
                            <h4 className="font-semibold text-foreground text-lg mb-1">Climate</h4>
                            <p className="text-sm text-muted-foreground">{crop.climate}</p>
                        </div>
                        <div>
                            <h4 className="font-semibold text-foreground text-lg mb-1">Soil Type</h4>
                            <p className="text-sm text-muted-foreground">{crop.soil}</p>
                        </div>
                         <div>
                            <h4 className="font-semibold text-foreground text-lg mb-1">Common Varieties</h4>
                            <div className="flex flex-wrap gap-2">
                                {crop.varieties.map(v => <Badge key={v} variant="secondary">{v}</Badge>)}
                            </div>
                        </div>
                    </div>
                    <div className="space-y-4">
                        <div>
                            <h4 className="font-semibold text-foreground text-lg mb-1">Planting</h4>
                            <p className="text-sm text-muted-foreground">{crop.planting}</p>
                        </div>
                        <div>
                            <h4 className="font-semibold text-foreground text-lg mb-1">Expected Yield</h4>
                            <p className="text-sm text-muted-foreground">{crop.yield}</p>
                        </div>
                    </div>
                </div>
            </div>
        </ScrollArea>
    </div>
  );

  const renderListView = () => (
    <>
        <DialogHeader>
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:justify-between">
            <div className="flex items-center gap-2">
                <Sprout className="h-7 w-7 text-primary" />
                <div>
                    <DialogTitle className="font-bold text-3xl">
                        Crop Library
                    </DialogTitle>
                    <DialogDescription>
                        Browse and learn about different crops.
                    </DialogDescription>
                </div>
            </div>
             <div className="relative sm:ml-auto">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                    placeholder="Search crops..."
                    className="pl-9 h-9 rounded-full bg-primary/5 border-primary/10"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
          </div>
        </DialogHeader>
        <ScrollArea className="flex-1 -mx-6 px-6">
            <div className="py-4 grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredCrops.length > 0 ? filteredCrops.map((crop) => (
                    <div key={crop.name} className="bg-muted/50 rounded-xl p-4 flex flex-col gap-4">
                        <Image src={crop.image} alt={crop.name} width={400} height={200} className="rounded-lg object-cover w-full h-40" data-ai-hint="crop image"/>
                        <div className="space-y-2 flex-1 flex flex-col">
                            <h3 className="text-xl font-bold text-primary">{crop.name}</h3>
                            <p className="text-sm text-muted-foreground line-clamp-2 flex-grow">{crop.description}</p>
                            <Button 
                                className="mt-4 w-full rounded-full"
                                onClick={() => setSelectedCrop(crop)}
                                aria-label={`View details for ${crop.name}`}
                            >
                                View Details
                            </Button>
                        </div>
                    </div>
                )) : (
                    <div className="text-center text-muted-foreground col-span-2 py-10">
                        <p>No crops found for "{searchTerm}"</p>
                    </div>
                )}
            </div>
        </ScrollArea>
    </>
  )

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
          <Button variant="ghost" className="h-9 rounded-full text-muted-foreground hover:bg-primary/10 hover:text-primary px-4">
              <Sprout className="h-5 w-5" />
              <span className="ml-2">Crop Library</span>
              <span className="sr-only">View Crop Library</span>
          </Button>
      </DialogTrigger>

      <DialogContent className="max-w-4xl h-[90vh] bg-card border-primary/20 flex flex-col">
        {selectedCrop ? renderDetailView(selectedCrop) : renderListView()}
      </DialogContent>
    </Dialog>
  );
}
