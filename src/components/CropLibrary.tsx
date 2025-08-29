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
import { Sprout, ArrowLeft } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { Badge } from "./ui/badge";

const cropData = [
    {
        name: "Wheat",
        image: "https://picsum.photos/800/600?random=1",
        description: "A cereal grain, which is a worldwide staple food. The many species of wheat together make up the genus Triticum; the most widely grown is common wheat. It is a key source of carbohydrates and dietary fiber.",
        planting: "Best planted in autumn for winter wheat or early spring for spring wheat. Requires well-drained soil and a sunny location. Typically sown using a drill in rows to ensure uniform depth and spacing.",
        yield: "Average yield is about 3-4 tons per hectare, but can vary greatly depending on soil, climate, and farming practices.",
        varieties: ["Hard Red Winter", "Soft Red Winter", "Hard Red Spring", "White Wheat"],
        climate: "Adaptable to various climates, but grows best in temperate regions with rainfall between 30 and 90 cm.",
        soil: "Prefers loam or clay-loam soils with a pH between 6.0 and 7.0."
    },
    {
        name: "Rice",
        image: "https://picsum.photos/800/600?random=2",
        description: "The seed of the grass species Oryza sativa (Asian rice) or less commonly Oryza glaberrima (African rice). As a cereal grain, it is the most widely consumed staple food for a large part of the world's human population, especially in Asia.",
        planting: "Typically grown in flooded paddies. Seedlings are first grown in a nursery and then transplanted into the fields. Requires significant water and a long, warm growing season.",
        yield: "Average yield for irrigated rice is about 5-7 tons per hectare. Rain-fed rice yields are lower.",
        varieties: ["Basmati", "Jasmine", "Arborio", "Brown Rice"],
        climate: "Requires a hot and humid climate. It is best suited to regions with high humidity, prolonged sunshine, and an assured supply of water.",
        soil: "Best grown in clayey loam soils which can hold water for a long time."
    },
    {
        name: "Corn (Maize)",
        image: "https://picsum.photos/800/600?random=3",
        description: "A tall annual cereal grass that yields large grains, or kernels, set in rows on a cob. It is one of the most widely distributed of the world's food crops and is used for food, animal feed, and biofuel.",
        planting: "Planted in spring in warm soil. Needs full sun and is often planted in blocks rather than single rows for better pollination. It's a heavy feeder, requiring nutrient-rich soil.",
        yield: "Average yield can range from 8-12 tons per hectare under good conditions.",
        varieties: ["Dent Corn", "Flint Corn", "Sweet Corn", "Popcorn"],
        climate: "Requires warm nights and grows best in temperatures between 20°C and 30°C. Sensitive to frost.",
        soil: "Prefers well-drained, fertile, loamy soils with good water-holding capacity."
    },
    {
        name: "Soybean",
        image: "https://picsum.photos/800/600?random=4",
        description: "A species of legume native to East Asia, widely grown for its edible bean, which has numerous uses including soy milk, tofu, and soy oil. They are also a key component in animal feed.",
        planting: "Planted in late spring once soil temperatures have warmed. Soybeans are nitrogen-fixing plants, meaning they can convert atmospheric nitrogen into a form usable by the plant, which improves soil fertility.",
        yield: "Average yield is about 2.5-3.5 tons per hectare.",
        varieties: ["Glycine max", "Edamame"],
        climate: "Grows best in warm and moist climates. Prefers temperatures between 20°C and 30°C.",
        soil: "Adaptable to a wide range of soils, but grows best in moist, well-drained loams."
    }
];

type Crop = typeof cropData[0];


export function CropLibrary() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCrop, setSelectedCrop] = useState<Crop | null>(null);

  const handleOpenChange = (open: boolean) => {
    if (!open) {
        // Reset view when closing the dialog
        setTimeout(() => setSelectedCrop(null), 300);
    }
    setIsOpen(open);
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
          <DialogTitle className="font-bold text-3xl flex items-center gap-2">
            <Sprout className="h-7 w-7 text-primary" />
            Crop Library
          </DialogTitle>
          <DialogDescription>
            Browse and learn about different crops, their characteristics, and typical yields.
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="flex-1 -mx-6 px-6">
            <div className="py-4 grid grid-cols-1 md:grid-cols-2 gap-6">
                {cropData.map((crop) => (
                    <div key={crop.name} className="bg-muted/50 rounded-xl p-4 flex flex-col gap-4">
                        <Image src={crop.image} alt={crop.name} width={400} height={200} className="rounded-lg object-cover w-full h-40" data-ai-hint="crop image"/>
                        <div className="space-y-2 flex-1 flex flex-col">
                            <h3 className="text-xl font-bold text-primary">{crop.name}</h3>
                            <p className="text-sm text-muted-foreground line-clamp-2 flex-grow">{crop.description}</p>
                            <Button 
                                className="mt-4 w-full"
                                onClick={() => setSelectedCrop(crop)}
                                aria-label={`View details for ${crop.name}`}
                            >
                                View Details
                            </Button>
                        </div>
                    </div>
                ))}
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
