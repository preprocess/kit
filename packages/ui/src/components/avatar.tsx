import type { ComponentProps } from "react";
import { Avatar as AvatarPrimitive } from "@base-ui/react/avatar";
import BoringAvatar from "boring-avatars";

import { cn } from "#utils";

/** Brand-green marble for people without a photo. Same in light and dark.
 *  Order matters: marble takes three consecutive entries per seed, and the
 *  list alternates dark and light steps so every triple has contrast.
 *  AvatarMarble draws marble's shapes with normal blending instead of the
 *  library's overlay, so every pixel stays a blend of these colours. */
export const AVATAR_MARBLE_COLORS = [
  "#14473b",
  "#3a9670",
  "#cbdfd0",
  "#34413b",
  "#91c2aa",
] as const;

/** The marble seed is the user id only; names and emails change. */
export function avatarMarbleSeed(person: { id: string }): string {
  return person.id;
}

function Avatar({
  className,
  size = "default",
  ...props
}: AvatarPrimitive.Root.Props & {
  size?: "default" | "sm" | "lg";
}) {
  return (
    <AvatarPrimitive.Root
      data-slot="avatar"
      data-size={size}
      className={cn(
        "group/avatar relative isolate flex size-8 shrink-0 overflow-hidden rounded-full select-none after:pointer-events-none after:absolute after:inset-0 after:rounded-full after:border after:border-border data-[size=lg]:size-10 data-[size=sm]:size-6",
        className,
      )}
      {...props}
    />
  );
}

function AvatarImage({ className, ...props }: AvatarPrimitive.Image.Props) {
  return (
    <AvatarPrimitive.Image
      data-slot="avatar-image"
      className={cn(
        "aspect-square size-full rounded-full object-cover",
        className,
      )}
      {...props}
    />
  );
}

function AvatarMarble({
  name,
  size = 40,
}: {
  /** Stable seed for the marble pattern: the person's user id. */
  name: string;
  size?: number;
}) {
  return (
    <BoringAvatar
      className="[&_path]:mix-blend-normal!"
      colors={[...AVATAR_MARBLE_COLORS]}
      name={name}
      size={size}
      square={false}
      title={false}
      variant="marble"
    />
  );
}

/** The marble is the whole fallback; nothing is drawn over it. */
function AvatarFallback({
  className,
  name,
  ...props
}: Omit<AvatarPrimitive.Fallback.Props, "children"> & {
  /** Stable seed for the marble pattern: the person's user id. */
  name: string;
}) {
  return (
    <AvatarPrimitive.Fallback
      data-slot="avatar-fallback"
      className={cn(
        "pointer-events-none size-full overflow-hidden rounded-full [&_svg]:size-full",
        className,
      )}
      {...props}
    >
      <AvatarMarble name={name} />
    </AvatarPrimitive.Fallback>
  );
}

function AvatarBadge({ className, ...props }: ComponentProps<"span">) {
  return (
    <span
      data-slot="avatar-badge"
      className={cn(
        "absolute right-0 bottom-0 z-10 inline-flex items-center justify-center rounded-full bg-primary text-primary-foreground bg-blend-color ring-2 ring-background select-none",
        "group-data-[size=sm]/avatar:size-2 group-data-[size=sm]/avatar:[&>svg]:hidden",
        "group-data-[size=default]/avatar:size-2.5 group-data-[size=default]/avatar:[&>svg]:size-2",
        "group-data-[size=lg]/avatar:size-3 group-data-[size=lg]/avatar:[&>svg]:size-2",
        className,
      )}
      {...props}
    />
  );
}

function AvatarGroup({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      data-slot="avatar-group"
      className={cn(
        "group/avatar-group isolate flex -space-x-2 *:data-[slot=avatar]:relative *:data-[slot=avatar]:z-0 *:data-[slot=avatar]:ring-2 *:data-[slot=avatar]:ring-background",
        className,
      )}
      {...props}
    />
  );
}

function AvatarGroupCount({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      data-slot="avatar-group-count"
      className={cn(
        "relative flex size-8 shrink-0 items-center justify-center rounded-full bg-muted text-base text-muted-foreground ring-2 ring-background group-has-data-[size=lg]/avatar-group:size-10 group-has-data-[size=sm]/avatar-group:size-6 [&>svg]:size-4 group-has-data-[size=lg]/avatar-group:[&>svg]:size-5 group-has-data-[size=sm]/avatar-group:[&>svg]:size-3",
        className,
      )}
      {...props}
    />
  );
}

export {
  Avatar,
  AvatarImage,
  AvatarFallback,
  AvatarMarble,
  AvatarGroup,
  AvatarGroupCount,
  AvatarBadge,
};
