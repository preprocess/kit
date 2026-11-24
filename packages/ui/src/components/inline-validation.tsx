"use client";

import {
  forwardRef,
  useCallback,
  useId,
  useImperativeHandle,
  useRef,
  useState,
  type ComponentProps,
} from "react";
import { motion, useReducedMotion } from "motion/react";

import { fontWeights } from "#lib/font-weight";
import { Check, Eye, EyeSlash, TriangleAlertIcon } from "#lib/icons";
import { useShape } from "#lib/shape-context";
import { useSize } from "#lib/size-context";
import { spring } from "#lib/springs";
import { cn } from "#utils";
import {
  useInlineValidation,
  type Validator,
} from "#hooks/use-inline-validation";

const LINE = 16;
const CROSSFADE = spring.moderate;
const INSTANT = { duration: 0 } as const;

export type InlineValidationHandle = {
  /** Marks the field touched and validates immediately. Returns true when valid. */
  commit: () => boolean;
  reset: () => void;
};

export type InlineValidationProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  validate: Validator;
  hint?: string;
  id?: string;
  name?: string;
  type?: "text" | "email" | "password" | "tel" | "url" | "search";
  placeholder?: string;
  autoComplete?: string;
  inputMode?: ComponentProps<"input">["inputMode"];
  debounce?: number;
  /** Lines reserved for the hint/error slot so the form does not shift. */
  reserveLines?: number;
  disabled?: boolean;
  required?: boolean;
  autoFocus?: boolean;
  /** When true, blur marks the field touched and may show validation. Default false — show only after commit (e.g. submit). */
  validateOnBlur?: boolean;
  className?: string;
};

const InlineValidation = forwardRef<
  InlineValidationHandle,
  InlineValidationProps
>(function InlineValidation(
  {
    label,
    value,
    onChange,
    validate,
    hint,
    id,
    name,
    type = "text",
    placeholder,
    autoComplete,
    inputMode,
    debounce = 400,
    reserveLines = 1,
    disabled = false,
    required = false,
    autoFocus = false,
    validateOnBlur = false,
    className,
  },
  ref,
) {
  const reduced = useReducedMotion();
  const fade = reduced ? INSTANT : CROSSFADE;
  const isPassword = type === "password";
  const [revealed, setRevealed] = useState(false);
  const [focused, setFocused] = useState(false);
  const controlRef = useRef<HTMLDivElement>(null);
  const shape = useShape();
  const sizes = useSize();

  const auto = useId();
  const fieldId = id ?? `${auto}-field`;
  const hintId = `${auto}-hint`;
  const errorId = `${auto}-error`;

  const { status, error, message, commit, reset, fieldProps } =
    useInlineValidation({
      value,
      validate,
      debounce,
    });

  // Replay the error shake (transitions.dev "Error state shake") from a
  // clean baseline: drop the class, force a reflow, add it back.
  const shake = useCallback(() => {
    const control = controlRef.current;
    if (!control) return;
    control.classList.remove("is-shaking");
    void control.offsetWidth;
    control.classList.add("is-shaking");
  }, []);

  const commitAndShake = useCallback(() => {
    commit();
    const ok = validate(value) === null;
    if (!ok) shake();
    return ok;
  }, [commit, shake, validate, value]);

  useImperativeHandle(ref, () => ({ commit: commitAndShake, reset }), [
    commitAndShake,
    reset,
  ]);

  const invalid = status === "invalid";
  const valid = status === "valid";

  const described = [hint ? hintId : null, invalid ? errorId : null]
    .filter(Boolean)
    .join(" ");

  const clamp = {
    display: "-webkit-box" as const,
    WebkitBoxOrient: "vertical" as const,
    WebkitLineClamp: reserveLines,
    overflow: "hidden" as const,
  };

  return (
    <div className={cn("w-full", className)} data-slot="inline-validation">
      {/* Fluid field: label inset to the text axis, and a shape-radius
          control filled with the surface tint at rest, lifted to the card
          surface on focus, and tinted red when invalid. Never an outline
          alone. */}
      <label
        htmlFor={fieldId}
        className={cn(
          "block pl-2.5",
          sizes.text,
          invalid ? "text-destructive" : "text-muted-foreground",
        )}
        style={{ fontVariationSettings: fontWeights.normal }}
      >
        {label}
      </label>

      <div
        ref={controlRef}
        onAnimationEnd={(event) => {
          if (event.animationName === "t-input-shake") {
            event.currentTarget.classList.remove("is-shaking");
          }
        }}
        className={cn(
          "t-input relative mt-1 flex items-center px-2.5 transition-[background-color,box-shadow] duration-80",
          shape.input,
          sizes.control,
          disabled && "pointer-events-none opacity-50",
          invalid
            ? "bg-destructive-light/60 ring-1 ring-destructive/50"
            : focused
              ? "bg-card ring-1 ring-border"
              : "bg-hover hover:bg-active",
        )}
      >
        <input
          id={fieldId}
          name={name}
          type={isPassword && revealed ? "text" : type}
          value={value}
          placeholder={placeholder}
          autoComplete={autoComplete}
          inputMode={inputMode}
          disabled={disabled}
          required={required}
          autoFocus={autoFocus}
          aria-required={required || undefined}
          aria-describedby={described || undefined}
          aria-invalid={fieldProps["aria-invalid"]}
          className={cn(
            "w-full min-w-0 rounded-none bg-transparent font-[inherit] text-foreground outline-none placeholder:text-muted-foreground",
            sizes.field,
            isPassword ? "pr-14" : "pr-6",
          )}
          style={{ fontVariationSettings: fontWeights.normal }}
          onFocus={() => setFocused(true)}
          onBlur={() => {
            setFocused(false);
            if (validateOnBlur) commitAndShake();
          }}
          onChange={(event) => onChange(event.target.value)}
        />

        <span
          className={cn(
            "pointer-events-none absolute top-1/2 grid size-3.5 -translate-y-1/2 place-items-center",
            isPassword ? "right-9" : "right-2.5",
          )}
          aria-hidden
        >
          <motion.span
            className="col-start-1 row-start-1 text-muted-foreground"
            initial={false}
            animate={{ opacity: valid ? 1 : 0, scale: valid ? 1 : 0.7 }}
            transition={fade}
          >
            <Check size={14} strokeWidth={1.5} />
          </motion.span>
          <motion.span
            className="col-start-1 row-start-1 text-destructive"
            initial={false}
            animate={{ opacity: invalid ? 1 : 0, scale: invalid ? 1 : 0.7 }}
            transition={fade}
          >
            <TriangleAlertIcon size={14} strokeWidth={1.5} />
          </motion.span>
        </span>

        {isPassword ? (
          <button
            aria-label={revealed ? "Hide password" : "Show password"}
            aria-pressed={revealed}
            className="absolute top-1/2 right-1.5 flex size-6 -translate-y-1/2 items-center justify-center rounded-full text-muted-foreground outline-none hover:text-foreground focus-visible:outline-1 focus-visible:outline-(--focus-ring) disabled:pointer-events-none disabled:opacity-50"
            disabled={disabled}
            onClick={() => setRevealed((current) => !current)}
            type="button"
          >
            {revealed ? (
              <EyeSlash size={14} strokeWidth={1.5} />
            ) : (
              <Eye size={14} strokeWidth={1.5} />
            )}
          </button>
        ) : null}
      </div>

      <div
        className="relative mt-1 grid pl-2.5"
        style={{ height: reserveLines * LINE }}
      >
        {hint ? (
          <motion.p
            aria-hidden
            style={clamp}
            className="col-start-1 row-start-1 text-caption text-muted-foreground"
            initial={false}
            animate={{ opacity: invalid ? 0 : 1, y: invalid ? 3 : 0 }}
            transition={fade}
          >
            {hint}
          </motion.p>
        ) : null}

        <motion.p
          aria-hidden
          style={clamp}
          className="col-start-1 row-start-1 text-caption text-destructive"
          initial={false}
          animate={{ opacity: invalid ? 1 : 0, y: invalid ? 0 : -3 }}
          transition={fade}
        >
          {error ?? message}
        </motion.p>

        {hint ? (
          <span id={hintId} className="sr-only">
            {hint}
          </span>
        ) : null}

        <span
          id={errorId}
          role="status"
          aria-live="polite"
          aria-atomic="true"
          className="sr-only"
        >
          {error ?? ""}
        </span>
      </div>
    </div>
  );
});

export { InlineValidation };
export type { Validator };
