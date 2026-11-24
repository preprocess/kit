import { cn } from "#utils";
import { Loader2Icon } from "#lib/icons";

function Spinner({ className, ...props }: React.ComponentProps<"svg">) {
  return (
    <Loader2Icon
      data-slot="spinner"
      role="status"
      aria-label="Loading"
      className={cn("size-4 animate-spinner", className)}
      {...props}
    />
  );
}

export { Spinner };
