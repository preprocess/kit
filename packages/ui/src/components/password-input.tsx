"use client";

import { forwardRef, useState } from "react";
import { cn } from "#utils";
import { Eye, EyeSlash } from "#lib/icons";
import { nestedRadius, useShape } from "#lib/shape-context";
import { useSize } from "#lib/size-context";
import { Input, type InputProps } from "#components/input";

// ---------------------------------------------------------------------------
// A password Input with a show/hide toggle. It wraps Fluid's Input rather than
// editing it: the eye button sits inset at the right like Input's number
// stepper buttons (28px, 4px from the edge; 24px, 2px compact), with corners
// nested inside the field's.
// ---------------------------------------------------------------------------

type PasswordInputProps = Omit<InputProps, "type">;

const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ className, size, disabled, readOnly, ...props }, ref) => {
    const shape = useShape();
    const sizeClasses = useSize(size);
    const compact = sizeClasses.variant === "compact";
    const [revealed, setRevealed] = useState(false);
    const inset = compact ? 2 : 4;
    const Icon = revealed ? EyeSlash : Eye;

    return (
      <span
        data-slot="input-password"
        className="relative block w-full min-w-0"
      >
        <Input
          ref={ref}
          type={revealed ? "text" : "password"}
          size={size}
          disabled={disabled}
          readOnly={readOnly}
          // Room for the button, its inset and the gap before the text:
          // 4 + 28 + 8, 2 + 24 + 4 compact.
          className={cn(compact ? "pr-[30px]" : "pr-10", className)}
          {...props}
        />
        <button
          type="button"
          aria-label={revealed ? "Hide password" : "Show password"}
          aria-pressed={revealed}
          disabled={disabled}
          onMouseDown={(e) => e.preventDefault()}
          onClick={() => setRevealed((current) => !current)}
          className={cn(
            "absolute top-1/2 flex -translate-y-1/2 cursor-pointer items-center justify-center text-muted-foreground outline-none",
            "transition-colors duration-80 hover:bg-hover hover:text-foreground",
            "focus-visible:outline-1 focus-visible:outline-(--focus-ring)",
            "disabled:pointer-events-none disabled:opacity-50",
            compact ? "size-6" : "size-7",
          )}
          style={{
            right: inset,
            borderRadius: nestedRadius(shape.bgRadius, inset),
          }}
        >
          <Icon size={sizeClasses.icon} strokeWidth={1.5} aria-hidden />
        </button>
      </span>
    );
  },
);

PasswordInput.displayName = "PasswordInput";

export { PasswordInput };
export type { PasswordInputProps };
export default PasswordInput;
