"use client";

import { SURFACE_BG } from "#lib/surface-classes";
import { useSurface } from "#lib/surface-context";
import { cn } from "#utils";

function Skeleton({ className, ...props }: React.ComponentProps<"div">) {
  const substrate = useSurface();
  const level = Math.round(Math.max(1, Math.min(8, substrate + 1)));

  return (
    <div
      data-slot="skeleton"
      className={cn("animate-pulse rounded-none", SURFACE_BG[level], className)}
      {...props}
    />
  );
}

export { Skeleton };
