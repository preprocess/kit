"use client";

import { useCallback, useEffect, useRef, useState } from "react";

export type ValidationStatus = "idle" | "pending" | "valid" | "invalid";

export type Validator = (value: string) => string | null;

export type UseInlineValidationOptions = {
  value: string;
  validate: Validator;
  debounce?: number;
};

export type UseInlineValidationReturn = {
  status: ValidationStatus;
  error: string | null;
  message: string;
  touched: boolean;
  commit: () => void;
  reset: () => void;
  fieldProps: {
    onBlur: () => void;
    "aria-invalid": boolean;
  };
};

type Settled = {
  status: ValidationStatus;
  error: string | null;
  message: string;
};

const CLEAN: Settled = { status: "idle", error: null, message: "" };

/**
 * Debounced inline field validation (interior.dev pattern).
 * Clearing an error is immediate; new errors wait for `debounce`.
 */
export function useInlineValidation({
  value,
  validate,
  debounce = 400,
}: UseInlineValidationOptions): UseInlineValidationReturn {
  const [touched, setTouched] = useState(false);
  const [settled, setSettled] = useState<Settled>(CLEAN);

  const check = useRef(validate);
  const latest = useRef(value);

  useEffect(() => {
    check.current = validate;
    latest.current = value;
  });

  useEffect(() => {
    if (!touched) return;

    const next = check.current(value);
    const resolved: ValidationStatus = value.length > 0 ? "valid" : "idle";

    if (next === null) {
      setSettled((prev) =>
        prev.status === resolved && prev.error === null
          ? prev
          : { status: resolved, error: null, message: prev.message },
      );
      return;
    }

    setSettled((prev) =>
      prev.status === "invalid"
        ? prev
        : { status: "pending", error: null, message: prev.message },
    );

    const timer = setTimeout(() => {
      setSettled((prev) =>
        prev.error === next
          ? prev
          : { status: "invalid", error: next, message: next },
      );
    }, debounce);

    return () => clearTimeout(timer);
  }, [value, touched, debounce]);

  const commit = useCallback(() => {
    setTouched(true);
    const current = latest.current;
    const next = check.current(current);
    setSettled((prev) =>
      next === null
        ? {
            status: current.length > 0 ? "valid" : "idle",
            error: null,
            message: prev.message,
          }
        : { status: "invalid", error: next, message: next },
    );
  }, []);

  const reset = useCallback(() => {
    setTouched(false);
    setSettled(CLEAN);
  }, []);

  return {
    status: settled.status,
    error: settled.error,
    message: settled.message,
    touched,
    commit,
    reset,
    fieldProps: {
      onBlur: commit,
      "aria-invalid": settled.status === "invalid",
    },
  };
}
