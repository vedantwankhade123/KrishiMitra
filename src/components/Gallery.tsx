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
import { Images } from "lucide-react";
import { useState } from "react";

export function Gallery() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
          <Button variant="ghost" className="h-9 rounded-full text-muted-foreground hover:bg-primary/10 hover:text-primary px-4">
              <Images className="h-5 w-5" />
              <span className="ml-2">Gallery</span>
              <span className="sr-only">View Gallery</span>
          </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px] bg-card border-primary/20">
        <DialogHeader>
          <DialogTitle className="font-bold text-2xl">Gallery</DialogTitle>
          <DialogDescription>
            A collection of your saved images.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <p className="text-center text-muted-foreground">Your gallery is currently empty.</p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
