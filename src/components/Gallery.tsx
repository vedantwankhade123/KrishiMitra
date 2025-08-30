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
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sprout } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

const cropData = [
    {
        name: "Wheat",
        image: "https://picsum.photos/400/300?random=1",
        description: "A cereal grain, which is a worldwide staple food. The many species of wheat together make up the genus Triticum; the most widely grown is common wheat.",
        planting: "Best planted in autumn. Requires well-drained soil and a sunny location. Typically sown using a drill in rows.",
        yield: "Average yield is about 3-4 tons per hectare."
    },
    {
        name: "Rice",
        image: "https://picsum.photos/400/300?random=2",
        description: "The seed of the grass species Oryza sativa (Asian rice) or less commonly Oryza glaberrima (African rice). As a cereal grain, it is the most widely consumed staple food for a large part of the world's human population.",
        planting: "Typically grown in flooded paddies. Seedlings are transplanted into the fields. Requires significant water.",
        yield: "Average yield for irrigated rice is about 5-7 tons per hectare."
    },
    {
        name: "Corn (Maize)",
        image: "https://picsum.photos/400/300?random=3",
        description: "A tall annual cereal grass that yields large grains, or kernels, set in rows on a cob. It is one of the most widely distributed of the world's food crops.",
        planting: "Planted in spring in warm soil. Needs full sun and is often planted in blocks for better pollination.",
        yield: "Average yield can range from 8-12 tons per hectare."
    },
    {
        name: "Soybean",
        image: "https://picsum.photos/400/300?random=4",
        description: "A species of legume native to East Asia, widely grown for its edible bean, which has numerous uses. They contain significant amounts of phytic acid, dietary minerals and B vitamins.",
        planting: "Planted in late spring. Soybeans are nitrogen-fixing plants and improve soil fertility.",
        yield: "Average yield is about 2.5-3.5 tons per hectare."
    }
];


export function CropLibrary() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
          <Button variant="ghost" className="h-9 rounded-full text-muted-foreground hover:bg-primary/10 hover:text-primary px-4">
              <Sprout className="h-5 w-5" />
              <span className="ml-2">Crop Library</span>
              <span className="sr-only">View Crop Library</span>
          </Button>
      </DialogTrigger>

      <DialogContent className="max-w-xs sm:max-w-2xl lg:max-w-4xl h-[90vh] bg-card border-primary/20 flex flex-col mx-2 sm:mx-auto">
        <DialogHeader>
          <DialogTitle className="font-bold text-xl sm:text-2xl lg:text-3xl flex items-center gap-2">
            <Sprout className="h-5 w-5 sm:h-6 sm:w-6 lg:h-7 lg:w-7 text-primary" />
            Crop Library
          </DialogTitle>
          <DialogDescription className="text-sm sm:text-base">
            Browse and learn about different crops, their characteristics, and typical yields.
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="flex-1 -mx-4 sm:-mx-6 px-4 sm:px-6">
            <div className="py-4 grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                {cropData.map((crop) => (
                    <div key={crop.name} className="bg-muted/50 rounded-lg p-3 sm:p-4 flex flex-col gap-3 sm:gap-4">
                        <Image src={crop.image} alt={crop.name} width={150} height={150} className="rounded-md object-cover w-full h-32 sm:h-40" data-ai-hint="crop image"/>
                        <div className="space-y-2 flex-1">
                            <h3 className="text-lg sm:text-xl font-bold text-primary">{crop.name}</h3>
                            <p className="text-xs sm:text-sm text-muted-foreground">{crop.description}</p>
                            <div>
                                <h4 className="font-semibold text-foreground text-sm sm:text-base">Planting</h4>
                                <p className="text-xs text-muted-foreground">{crop.planting}</p>
                            </div>
                             <div>
                                <h4 className="font-semibold text-foreground text-sm sm:text-base">Yield</h4>
                                <p className="text-xs text-muted-foreground">{crop.yield}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
