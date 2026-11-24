"use client";

import * as React from "react";
import { FluidHoverHighlight } from "#components/fluid-hover-highlight";
import {
  useFluidHover,
  useRegisterFluidHoverItem,
  type ItemRect,
} from "#hooks/use-fluid-hover";
import { useShape } from "#lib/shape-context";
import { cn } from "#utils";

// One hover highlight per nav list that glides between items (pointer and
// keyboard focus) instead of each item lighting its own background. Wrap the
// list in HoverScope and register each item with useHoverScopeItem. Used by
// the app sidebars (vertical), the marketing header nav (axis="x") and its
// dropdown panels (axis="xy").
// The highlight is bg-hover on the shape radius and snaps under reduced
// motion (FluidHoverHighlight). `inset` trims the measured row on both sides,
// for rows whose visible fill is narrower than their hit area.

type HoverScopeValue = {
  registerItem: (index: number, element: HTMLElement | null) => void;
  setActiveIndex: React.Dispatch<React.SetStateAction<number | null>>;
  pointerInside: React.RefObject<boolean>;
};

const HoverScopeContext = React.createContext<HoverScopeValue | null>(null);

function insetRect(rect: ItemRect | null, inset: number): ItemRect | null {
  if (!rect) return null;
  return {
    top: rect.top,
    height: rect.height,
    left: rect.left + inset,
    width: Math.max(rect.width - inset * 2, 0),
  };
}

function HoverScope({
  inset = 0,
  axis = "y",
  holdInGaps = false,
  className,
  children,
  onMouseEnter,
  onMouseMove,
  onMouseLeave,
  onClick,
  ...props
}: Omit<React.ComponentProps<"div">, "ref"> & {
  /** Pixels trimmed from each side of a row's measured box. */
  inset?: number;
  /** "y" for vertical lists, "x" for a horizontal row of links, "xy" for
   *  a grid. */
  axis?: "x" | "y" | "xy";
  /** Keep the highlight where it is while the pointer is between items
   *  (see useFluidHover). */
  holdInGaps?: boolean;
}) {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const pointerInside = React.useRef(false);
  const shape = useShape();
  const {
    activeIndex,
    setActiveIndex,
    itemRects,
    isMeasured,
    session,
    handlers,
    registerItem,
  } = useFluidHover(containerRef, { axis, holdInGaps });

  const rect = insetRect(
    isMeasured && activeIndex !== null
      ? (itemRects[activeIndex] ?? null)
      : null,
    inset,
  );

  const value = React.useMemo(
    () => ({ registerItem, setActiveIndex, pointerInside }),
    [registerItem, setActiveIndex],
  );

  return (
    <HoverScopeContext.Provider value={value}>
      <div
        ref={containerRef}
        data-slot="hover-scope"
        className={cn("relative", className)}
        onMouseEnter={(event) => {
          pointerInside.current = true;
          handlers.onMouseEnter();
          onMouseEnter?.(event);
        }}
        onMouseMove={(event) => {
          pointerInside.current = true;
          handlers.onMouseMove(event);
          onMouseMove?.(event);
        }}
        onMouseLeave={(event) => {
          pointerInside.current = false;
          handlers.onMouseLeave();
          onMouseLeave?.(event);
        }}
        onClick={(event) => {
          handlers.onClick(event);
          onClick?.(event);
        }}
        {...props}
      >
        <FluidHoverHighlight
          rect={rect}
          session={session}
          className={shape.bg}
        />
        {children}
      </div>
    </HoverScopeContext.Provider>
  );
}

function matchesFocusVisible(element: Element) {
  try {
    return element.matches(":focus-visible");
  } catch {
    return false;
  }
}

/** Registers a row with the surrounding HoverScope. Spread the
 *  returned handlers on the row element and attach `ref` to it. */
function useHoverScopeItem<T extends HTMLElement = HTMLElement>(index: number) {
  const scope = React.useContext(HoverScopeContext);
  const ref = React.useRef<T>(null);
  useRegisterFluidHoverItem(scope?.registerItem, index, ref);
  const setActiveIndex = scope?.setActiveIndex;
  const pointerInside = scope?.pointerInside;

  const onFocus = React.useCallback(
    (event: React.FocusEvent<HTMLElement>) => {
      if (setActiveIndex && matchesFocusVisible(event.currentTarget)) {
        setActiveIndex(index);
      }
    },
    [index, setActiveIndex],
  );
  const onBlur = React.useCallback(() => {
    if (setActiveIndex && !pointerInside?.current) {
      setActiveIndex((current) => (current === index ? null : current));
    }
  }, [index, pointerInside, setActiveIndex]);

  return { ref, onFocus, onBlur };
}

export { HoverScope, useHoverScopeItem };
