"use client";

import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { CalendarCheck } from "lucide-react";
import { useState, useEffect } from "react";

export default function FloatingCallButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Show the button after a short delay to make it less intrusive on page load
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 1500); // 1.5 second delay

    return () => clearTimeout(timer);
  }, []);

  return (
    <Dialog>
        <DialogTrigger asChild>
            <Button
              className={cn(
                "group fixed bottom-6 left-6 z-50 flex items-center justify-center overflow-hidden whitespace-nowrap shadow-lg rounded-full transition-all duration-300 ease-in-out",
                "h-14 w-14 hover:w-40", // Starts as a circle, expands on hover
                "bg-primary text-primary-foreground",
                "hover:bg-primary/90",
                isVisible ? "opacity-100 scale-100" : "opacity-0 scale-90 pointer-events-none"
              )}
              aria-label="Book a Call"
            >
              <CalendarCheck className="h-10 w-10" />
              <span className="max-w-0 opacity-0 transition-all duration-300 group-hover:ml-2 group-hover:max-w-xs group-hover:opacity-100">
                Book a Call
              </span>
            </Button>
        </DialogTrigger>
        <DialogContent className="p-0 border-0 w-[90vw] h-[90vh] max-w-5xl">
            <DialogHeader className="sr-only">
              <DialogTitle>Schedule a Discovery Call</DialogTitle>
              <DialogDescription>
                Use the calendar below to book a 15-minute introductory call.
              </DialogDescription>
            </DialogHeader>
            <iframe 
                src="https://cal.com/عبدالرحمن-سامح-auo83p/15min?layout=column_view" 
                className="w-full h-full rounded-lg"
                frameBorder="0"
                title="Schedule a Discovery Call"
            ></iframe>
        </DialogContent>
    </Dialog>
  );
}
