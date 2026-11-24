"use client";

import { useCallback, useEffect, useRef, useState } from "react";

export type AsyncActionStatus = "idle" | "pending" | "success" | "error";

/** Throw from an action to return to idle without success/error (e.g. validation). */
export class AsyncActionAbortError extends Error {
  constructor(message = "aborted") {
    super(message);
    this.name = "AsyncActionAbortError";
  }
}

export type UseAsyncActionOptions = {
  action: () => unknown;
  resetAfter?: number;
  onError?: (error: unknown) => void;
  onStatusChange?: (status: AsyncActionStatus) => void;
};

export function useAsyncAction({
  action,
  resetAfter = 1400,
  onError,
  onStatusChange,
}: UseAsyncActionOptions) {
  const [status, setStatus] = useState<AsyncActionStatus>("idle");

  const phase = useRef<AsyncActionStatus>("idle");
  const runId = useRef(0);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const alive = useRef(true);

  const act = useRef(action);
  const fail = useRef(onError);
  const statusChange = useRef(onStatusChange);

  useEffect(() => {
    act.current = action;
    fail.current = onError;
    statusChange.current = onStatusChange;
  });

  const publish = useCallback((next: AsyncActionStatus) => {
    phase.current = next;
    setStatus(next);
    statusChange.current?.(next);
  }, []);

  const clear = useCallback(() => {
    if (timer.current) {
      clearTimeout(timer.current);
      timer.current = null;
    }
  }, []);

  const reset = useCallback(() => {
    runId.current += 1;
    clear();
    publish("idle");
  }, [clear, publish]);

  const run = useCallback(() => {
    if (phase.current === "pending") return;

    clear();
    const id = ++runId.current;
    publish("pending");

    const settle = (next: "success" | "error") => {
      if (!alive.current || id !== runId.current) return;
      clear();
      publish(next);
      timer.current = setTimeout(() => {
        if (!alive.current || id !== runId.current) return;
        publish("idle");
      }, resetAfter);
    };

    Promise.resolve()
      .then(() => act.current())
      .then(
        () => settle("success"),
        (error: unknown) => {
          if (error instanceof AsyncActionAbortError) {
            if (!alive.current || id !== runId.current) return;
            clear();
            publish("idle");
            return;
          }
          fail.current?.(error);
          settle("error");
        },
      );
  }, [clear, publish, resetAfter]);

  useEffect(() => {
    alive.current = true;
    return () => {
      alive.current = false;
      clear();
    };
  }, [clear]);

  return {
    status,
    run,
    reset,
    pending: status === "pending",
  };
}
