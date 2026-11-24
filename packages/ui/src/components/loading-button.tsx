"use client";

import { forwardRef, useImperativeHandle, type ComponentProps } from "react";
import { motion, useReducedMotion } from "motion/react";

import { Button, type ButtonProps } from "#components/button";
import {
  AsyncActionAbortError,
  useAsyncAction,
  type AsyncActionStatus,
} from "#hooks/use-async-action";
import { Check, Loader, TriangleAlertIcon } from "#lib/icons";
import { spring } from "#lib/springs";
import { cn } from "#utils";

const CROSSFADE = spring.moderate;
const INSTANT = { duration: 0 } as const;
const TAP = spring.fast;

export type LoadingButtonHandle = {
  run: () => void;
  reset: () => void;
  status: AsyncActionStatus;
  pending: boolean;
};

export type LoadingButtonProps = {
  onAction: () => unknown;
  children: string;
  pendingLabel?: string;
  successLabel?: string;
  errorLabel?: string;
  resetAfter?: number;
  disabled?: boolean;
  onError?: (error: unknown) => void;
  onStatusChange?: (status: AsyncActionStatus) => void;
  className?: string;
  type?: "button" | "submit";
  variant?: ButtonProps["variant"];
  size?: ButtonProps["size"];
  trailingIcon?: ButtonProps["trailingIcon"];
} & Omit<
  ComponentProps<"button">,
  "children" | "onClick" | "type" | "disabled" | "className"
>;

function Spinner({ still }: { still: boolean }) {
  return (
    <span className="inline-flex shrink-0">
      <Loader
        size={14}
        strokeWidth={1.5}
        aria-hidden
        className={still ? undefined : "animate-spinner"}
      />
    </span>
  );
}

const LoadingButton = forwardRef<LoadingButtonHandle, LoadingButtonProps>(
  function LoadingButton(
    {
      onAction,
      children,
      pendingLabel = children,
      successLabel = "Done",
      errorLabel = "Try again",
      resetAfter = 1400,
      disabled = false,
      onError,
      onStatusChange,
      className,
      type = "button",
      variant = "primary",
      size = "md",
      trailingIcon,
      ...props
    },
    ref,
  ) {
    const reduced = useReducedMotion();
    const fade = reduced ? INSTANT : CROSSFADE;

    const { status, run, reset, pending } = useAsyncAction({
      action: onAction,
      resetAfter,
      onError,
      onStatusChange,
    });

    useImperativeHandle(ref, () => ({ run, reset, status, pending }), [
      run,
      reset,
      status,
      pending,
    ]);

    const label =
      status === "pending"
        ? pendingLabel
        : status === "success"
          ? successLabel
          : status === "error"
            ? errorLabel
            : children;

    const tonal =
      variant === "secondary" || variant === "tertiary" || variant === "ghost";

    const faces = [
      {
        key: "idle" as const,
        text: children,
        tone: tonal ? "text-foreground" : "text-inherit",
        icon: null,
      },
      {
        key: "pending" as const,
        text: pendingLabel,
        tone: tonal ? "text-muted-foreground" : "text-inherit opacity-80",
        icon: <Spinner still={reduced === true || status !== "pending"} />,
      },
      {
        key: "success" as const,
        text: successLabel,
        tone: tonal ? "text-foreground" : "text-inherit",
        icon: <Check size={14} strokeWidth={1.5} aria-hidden />,
      },
      {
        key: "error" as const,
        text: errorLabel,
        tone: tonal ? "text-destructive" : "text-inherit",
        icon: <TriangleAlertIcon size={14} strokeWidth={1.5} aria-hidden />,
      },
    ];

    return (
      <>
        <motion.div
          className={cn("inline-flex w-full", className)}
          whileTap={disabled || pending || reduced ? undefined : { y: 1 }}
          transition={TAP}
        >
          <Button
            type={type}
            variant={variant}
            size={size}
            disabled={disabled}
            aria-label={label}
            aria-busy={pending || undefined}
            aria-disabled={pending || undefined}
            className="w-full"
            data-slot="loading-button"
            trailingIcon={trailingIcon}
            onClick={(event) => {
              if (pending) {
                event.preventDefault();
                return;
              }
              if (type === "button") {
                event.preventDefault();
                run();
              }
            }}
            {...props}
          >
            <span aria-hidden className="relative grid place-items-center">
              {faces.map((face) => (
                <motion.span
                  key={face.key}
                  initial={false}
                  animate={
                    face.key === status
                      ? { opacity: 1, y: 0, filter: "blur(0px)" }
                      : { opacity: 0, y: 3, filter: "blur(3px)" }
                  }
                  transition={fade}
                  className={cn(
                    "col-start-1 row-start-1 flex items-center justify-center gap-1.5 whitespace-nowrap",
                    face.tone,
                  )}
                >
                  {face.icon}
                  {face.text}
                </motion.span>
              ))}
            </span>
          </Button>
        </motion.div>

        <span role="status" aria-live="polite" className="sr-only">
          {status === "success"
            ? successLabel
            : status === "error"
              ? errorLabel
              : ""}
        </span>
      </>
    );
  },
);

export { LoadingButton, AsyncActionAbortError };
export type { AsyncActionStatus };
