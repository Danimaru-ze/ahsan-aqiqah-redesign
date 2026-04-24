import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { ReactNode } from "react";

interface LightboxProps {
  children: ReactNode;
  src: string;
  alt?: string;
}

export function Lightbox({ children, src, alt }: LightboxProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="h-full w-full focus:outline-none">{children}</button>
      </DialogTrigger>
      <DialogContent className="max-w-[90vw] border-none bg-transparent p-0 shadow-none sm:max-w-3xl">
        <div className="relative flex aspect-auto items-center justify-center overflow-hidden rounded-lg">
          <img
            src={src}
            alt={alt || "Full screen image"}
            className="max-h-[85vh] w-auto object-contain shadow-2xl"
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
