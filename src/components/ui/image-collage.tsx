import React from "react";
import { motion, useInView, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

export interface CollageImage {
  src: string;
  x: number;
  y: number;
  rotate: number;
  alt?: string;
  title?: string;
}

export interface ImageCollageProps extends React.HTMLAttributes<HTMLDivElement> {
  images: CollageImage[];
  /** Forcé ; sinon le collage se range dès qu'il entre à l'écran. */
  organized?: boolean;
  imageClassName?: string;
}

// Adapté de VengeanceUI image-collage : déclenché au scroll, format horizontal, animation `layout`.
export const ImageCollage = React.forwardRef<HTMLDivElement, ImageCollageProps>(
  ({ images, organized, className, imageClassName, ...props }, ref) => {
    const localRef = React.useRef<HTMLDivElement>(null);
    React.useImperativeHandle(ref, () => localRef.current!);
    // Une seule fois : la pile et la grille n'ont pas la même hauteur, un aller-retour ferait osciller la page.
    const inView = useInView(localRef, { amount: 0.35, once: true });
    const reduce = useReducedMotion();
    const isOrganized = organized ?? (reduce ? true : inView);

    return (
      <div ref={localRef} className={cn("relative w-full select-none", className)} {...props}>
        <div
          className={cn(
            "grid w-full",
            isOrganized
              ? "grid-cols-2 gap-3 md:grid-cols-3"
              : "min-h-85 place-items-center [grid-template-areas:'stack'] md:min-h-115"
          )}
        >
          {images.map((img, i) => (
            <motion.figure
              className={cn(
                "group relative overflow-hidden rounded-md border border-white/10 bg-card will-change-transform",
                isOrganized ? "aspect-16/10 w-full" : "aspect-16/10 w-65 shadow-2xl md:w-100",
                imageClassName
              )}
              key={img.src}
              layout
              animate={{
                x: isOrganized ? 0 : img.x,
                y: isOrganized ? 0 : img.y,
                rotate: isOrganized ? 0 : img.rotate,
              }}
              style={isOrganized ? { zIndex: 1 } : { gridArea: "stack", zIndex: i }}
              transition={{ type: "spring", stiffness: 110, damping: 22, mass: 0.9, delay: isOrganized ? i * 0.06 : 0 }}
            >
              <img
                alt={img.alt ?? img.title ?? ""}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                draggable={false}
                decoding="async"
                src={img.src}
              />
              {img.title && (
                <figcaption className="absolute inset-x-0 bottom-0 bg-linear-to-t from-black/80 to-transparent px-3 pt-8 pb-2.5 font-medium text-sm text-white">
                  {img.title}
                </figcaption>
              )}
            </motion.figure>
          ))}
        </div>
      </div>
    );
  }
);

ImageCollage.displayName = "ImageCollage";
