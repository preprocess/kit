import type { ComponentProps } from "react";
import { Avatar as AvatarPrimitive } from "@base-ui/react/avatar";
import BoringAvatar from "boring-avatars";

import { cn } from "#utils";

/** Muted peach / lavender / teal marble on a paper-stone base. Same in light
 *  and dark; no cream or ink. */
export const AVATAR_MARBLE_COLORS = [
  "#5c4152",
  "#b4585d",
  "#d97f76",
  "#f7d0a9",
  "#a1c0ae",
] as const;

export function avatarMarbleSeed(person: {
  id?: string | null;
  name?: string | null;
  firstName?: string | null;
  lastName?: string | null;
  email?: string | null;
}): string {
  const name =
    person.name?.trim() ||
    [person.firstName, person.lastName].filter(Boolean).join(" ");
  return person.id || name || person.email?.trim() || "user";
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
  /** Stable seed for the marble pattern. Use a person id or full name. */
  name: string;
  size?: number;
}) {
  return (
    <BoringAvatar
      colors={[...AVATAR_MARBLE_COLORS]}
      name={name}
      size={size}
      title={false}
      variant="marble"
    />
  );
}

function AvatarFallback({
  className,
  name,
  children,
  ...props
}: AvatarPrimitive.Fallback.Props & {
  /** Stable seed for the marble pattern. Use a person id or full name. */
  name: string;
}) {
  return (
    <AvatarPrimitive.Fallback
      data-slot="avatar-fallback"
      className={cn(
        "relative flex size-full items-center justify-center rounded-full text-base text-white group-data-[size=sm]/avatar:text-sm",
        className,
      )}
      {...props}
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden rounded-full [&_svg]:size-full"
      >
        <AvatarMarble name={name} />
      </span>
      {children != null && children !== "" ? (
        <span className="relative z-10">{children}</span>
      ) : null}
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
