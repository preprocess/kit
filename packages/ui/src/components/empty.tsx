"use client";

import { cva, type VariantProps } from "class-variance-authority";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  type AnimatePresenceProps,
} from "motion/react";
import type { ReactNode } from "react";

import { SearchIcon } from "#lib/icons";
import { cn } from "#utils";

const emptyPresenceEase = [0.22, 1, 0.36, 1] as const;

function emptyPresenceTransition(reduceMotion: boolean) {
  return reduceMotion
    ? { duration: 0 }
    : { duration: 0.4, ease: emptyPresenceEase };
}

function Empty({
  className,
  ...props
}: React.ComponentProps<typeof motion.div>) {
  const reduceMotion = useReducedMotion() ?? false;

  return (
    <motion.div
      data-slot="empty"
      className={cn(
        "flex w-full min-w-0 flex-1 flex-col items-center justify-center gap-4 rounded-none border-dashed p-6 text-center text-balance",
        className,
      )}
      initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -4 }}
      transition={emptyPresenceTransition(reduceMotion)}
      {...props}
    />
  );
}

function EmptyPresence({
  children,
  mode = "sync",
  initial = true,
}: {
  children: ReactNode;
  mode?: AnimatePresenceProps["mode"];
  initial?: boolean;
}) {
  return (
    <AnimatePresence initial={initial} mode={mode}>
      {children}
    </AnimatePresence>
  );
}

function EmptyPresenceLayer({
  active,
  className,
  children,
  ...props
}: React.ComponentProps<typeof motion.div> & { active: boolean }) {
  const reduceMotion = useReducedMotion() ?? false;

  return (
    <motion.div
      aria-hidden={!active}
      className={cn("absolute inset-0", className)}
      initial={{ opacity: 0 }}
      animate={{ opacity: active ? 1 : 0 }}
      transition={emptyPresenceTransition(reduceMotion)}
      {...props}
      style={{ pointerEvents: active ? "auto" : "none", ...props.style }}
    >
      {children}
    </motion.div>
  );
}

function EmptyHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="empty-header"
      className={cn("flex max-w-sm flex-col items-center gap-2", className)}
      {...props}
    />
  );
}

const emptyMediaVariants = cva(
  "mb-2 flex shrink-0 items-center justify-center [&_svg]:pointer-events-none [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-transparent",
        icon: "flex size-8 shrink-0 items-center justify-center rounded-none bg-muted text-foreground [&_svg:not([class*='size-'])]:size-4",
        graphic: "bg-transparent",
        image:
          "border border-border bg-surface-4 p-4 [&_img]:size-32 [&_img]:rounded-none [&_img]:object-cover",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

function EmptyMedia({
  className,
  variant = "default",
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof emptyMediaVariants>) {
  return (
    <div
      data-slot="empty-icon"
      data-variant={variant}
      className={cn(emptyMediaVariants({ variant, className }))}
      {...props}
    />
  );
}

const EMPTY_SHEET_LINE_WIDTHS = ["w-full", "w-3/4", "w-full", "w-1/2"] as const;

function EmptyGraphic({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="empty-graphic"
      className={cn("relative h-[4.75rem] w-32", className)}
      {...props}
    />
  );
}

const emptySheetCutoutClass = "shadow-[0_0_0_4px_var(--surface-2)]";

const emptySheetFadeClass = {
  35: "opacity-35",
  40: "opacity-40",
  50: "opacity-50",
  65: "opacity-65",
} as const;

type EmptySheetFade = keyof typeof emptySheetFadeClass;

function EmptyListGraphic({
  className,
  ...props
}: React.ComponentProps<typeof EmptyGraphic>) {
  return (
    <EmptyGraphic className={cn("w-[4.75rem]", className)} {...props}>
      <EmptySheet
        className="absolute left-0 top-3 h-11 w-8 px-1 opacity-50 transition-transform duration-300 ease-out group-hover:-translate-x-1"
        lines={4}
      />
      <EmptySheet
        className="absolute right-0 top-3 h-11 w-8 px-1 opacity-50 transition-transform duration-300 ease-out group-hover:translate-x-1"
        lines={4}
      />
      <EmptySheet
        className="absolute left-1/2 top-1 h-14 w-10 -translate-x-1/2"
        cutout
        lines={4}
      />
    </EmptyGraphic>
  );
}

function EmptyMemberSheet({
  className,
  compact = false,
  cutout = false,
}: {
  className?: string;
  compact?: boolean;
  cutout?: boolean;
}) {
  return (
    <EmptySheet
      className={cn(
        "items-center",
        compact ? "h-11 w-8 px-1" : "h-14 w-10",
        className,
      )}
      cutout={cutout}
    >
      <span
        className={cn(
          "shrink-0 rounded-full bg-surface-6",
          compact ? "size-2.5" : "size-3",
        )}
      />
      <span className="h-1 w-full bg-surface-6" />
      <span className="h-1 w-3/4 bg-surface-6" />
      {compact ? null : <span className="h-1 w-1/2 bg-surface-6" />}
    </EmptySheet>
  );
}

function EmptyMembersGraphic({
  className,
  ...props
}: React.ComponentProps<typeof EmptyGraphic>) {
  return (
    <EmptyGraphic className={cn("w-[4.75rem]", className)} {...props}>
      <EmptyMemberSheet
        className="absolute top-3 left-0 opacity-50 transition-transform duration-300 ease-out group-hover:-translate-x-1"
        compact
      />
      <EmptyMemberSheet
        className="absolute top-3 right-0 opacity-50 transition-transform duration-300 ease-out group-hover:translate-x-1"
        compact
      />
      <EmptyMemberSheet
        className="absolute top-1 left-1/2 -translate-x-1/2"
        cutout
      />
    </EmptyGraphic>
  );
}

function EmptyMembersSearchGraphic({
  className,
  ...props
}: React.ComponentProps<typeof EmptyGraphic>) {
  return (
    <EmptyGraphic className={cn("w-[4.75rem]", className)} {...props}>
      <EmptyMemberSheet className="absolute top-1 left-1/2 -translate-x-1/2 opacity-65" />
      <span
        className={cn(
          "absolute right-0.5 bottom-0.5 flex size-7 items-center justify-center border border-border bg-surface-4",
          emptySheetCutoutClass,
        )}
      >
        <SearchIcon
          aria-hidden="true"
          className="size-3.5 text-muted-foreground"
        />
      </span>
    </EmptyGraphic>
  );
}

function EmptySearchGraphic({
  className,
  ...props
}: React.ComponentProps<typeof EmptyGraphic>) {
  return (
    <EmptyGraphic className={cn("w-[4.75rem]", className)} {...props}>
      <EmptySheet
        className="absolute left-1/2 top-1 h-14 w-10 -translate-x-1/2 opacity-65"
        lines={4}
      />
      <span
        className={cn(
          "absolute right-0.5 bottom-0.5 flex size-7 items-center justify-center border border-border bg-surface-4",
          emptySheetCutoutClass,
        )}
      >
        <SearchIcon
          aria-hidden="true"
          className="size-3.5 text-muted-foreground"
        />
      </span>
    </EmptyGraphic>
  );
}

function EmptyTableRowSheet({
  className,
  ...props
}: React.ComponentProps<typeof EmptySheet>) {
  return (
    <EmptySheet
      className={cn("h-7 flex-row items-center gap-1.5 px-2.5 pt-0", className)}
      cutout
      {...props}
    >
      <span className="h-1.5 w-[30%] bg-surface-6" />
      <span className="h-1.5 w-[16%] bg-surface-6" />
      <span className="h-1.5 w-7 shrink-0 bg-surface-6" />
      <span className="h-1.5 w-[14%] bg-surface-6" />
      <span className="h-1.5 min-w-0 flex-1 bg-surface-6" />
    </EmptySheet>
  );
}

function EmptyTableGraphic({
  className,
  ...props
}: React.ComponentProps<typeof EmptyGraphic>) {
  return (
    <EmptyGraphic className={cn("w-64", className)} {...props}>
      <EmptySheet className="absolute inset-x-4 top-3 h-7 opacity-35 transition-[top] duration-300 ease-out group-hover:top-0.5" />
      <EmptySheet
        className="absolute inset-x-2 top-5 h-7 transition-[top] duration-300 ease-out group-hover:top-3.5"
        cutout
        fade={65}
      />
      <EmptyTableRowSheet className="absolute inset-x-0 top-7" />
    </EmptyGraphic>
  );
}

function EmptyTableSearchGraphic({
  className,
  ...props
}: React.ComponentProps<typeof EmptyGraphic>) {
  return (
    <EmptyGraphic
      className={cn("flex items-center justify-center w-64", className)}
      {...props}
    >
      <span className="relative w-full">
        <EmptyTableRowSheet className="w-full" />
        <span
          className={cn(
            "absolute right-0 bottom-0 flex size-7 translate-x-1/2 translate-y-1/2 items-center justify-center border border-border bg-surface-4",
            emptySheetCutoutClass,
          )}
        >
          <SearchIcon
            aria-hidden="true"
            className="size-3.5 text-muted-foreground"
          />
        </span>
      </span>
    </EmptyGraphic>
  );
}

function EmptySheet({
  className,
  cutout = false,
  fade,
  lines = 0,
  children,
  ...props
}: React.ComponentProps<"div"> & {
  cutout?: boolean;
  fade?: EmptySheetFade;
  lines?: number;
}) {
  const fadeClass = fade == null ? undefined : emptySheetFadeClass[fade];
  const content =
    children ??
    EMPTY_SHEET_LINE_WIDTHS.slice(0, lines).map((width, index) => (
      <span className={cn("h-1 bg-surface-6", width)} key={index} />
    ));

  if (cutout && fadeClass != null) {
    return (
      <div className={cn(emptySheetCutoutClass, className)} {...props}>
        <div
          data-slot="empty-sheet"
          className={cn(
            "flex h-full w-full flex-col gap-1 border border-border bg-surface-4 px-1.5 pt-1.5",
            fadeClass,
          )}
        >
          {content}
        </div>
      </div>
    );
  }

  return (
    <div
      data-slot="empty-sheet"
      className={cn(
        "flex flex-col gap-1 border border-border bg-surface-4 px-1.5 pt-1.5",
        cutout && emptySheetCutoutClass,
        fadeClass,
        className,
      )}
      {...props}
    >
      {content}
    </div>
  );
}

function EmptyTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="empty-title"
      className={cn("text-base font-medium tracking-tight", className)}
      {...props}
    />
  );
}

function EmptyDescription({ className, ...props }: React.ComponentProps<"p">) {
  return (
    <div
      data-slot="empty-description"
      className={cn(
        "text-base/relaxed text-muted-foreground [&>a]:underline [&>a]:underline-offset-4 [&>a:hover]:text-primary",
        className,
      )}
      {...props}
    />
  );
}

function EmptyContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="empty-content"
      className={cn(
        "flex w-full max-w-sm min-w-0 flex-col items-center gap-2.5 text-base text-balance",
        className,
      )}
      {...props}
    />
  );
}

export {
  Empty,
  EmptyPresence,
  EmptyPresenceLayer,
  EmptyHeader,
  EmptyTitle,
  EmptyDescription,
  EmptyContent,
  EmptyMedia,
  EmptyGraphic,
  EmptyListGraphic,
  EmptyMembersGraphic,
  EmptyMembersSearchGraphic,
  EmptySearchGraphic,
  EmptyTableGraphic,
  EmptyTableSearchGraphic,
  EmptySheet,
  emptySheetCutoutClass,
};
