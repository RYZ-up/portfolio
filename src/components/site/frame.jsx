import { cn } from '@/lib/utils';

// The page's dotted guide grid (athrix-style): two vertical rules on the edges of the
// content column (max-w-5xl) from top to bottom, and a full-bleed horizontal rule at the
// top of every section with a dot where it crosses the verticals.

const LINE = 'border-dotted border-foreground/20';

export function PageFrame() {
  return (
    <div
      aria-hidden="true"
      className={cn('pointer-events-none absolute inset-y-0 left-1/2 hidden w-full max-w-5xl -translate-x-1/2 border-x md:block', LINE)}
    />
  );
}

/** Horizontal rule; position it with `className` (e.g. `top-0`). The parent must be centred. */
export function FrameRule({ className }) {
  return (
    <div aria-hidden="true" className={cn('pointer-events-none absolute left-1/2 z-10 h-0 w-screen -translate-x-1/2', className)}>
      <div className={cn('border-t', LINE)} />
      <div className="relative mx-auto hidden max-w-5xl md:block">
        <span className="absolute left-0 size-[5px] -translate-x-1/2 -translate-y-[3px] rounded-full bg-foreground/35" />
        <span className="absolute right-0 size-[5px] translate-x-1/2 -translate-y-[3px] rounded-full bg-foreground/35" />
      </div>
    </div>
  );
}
