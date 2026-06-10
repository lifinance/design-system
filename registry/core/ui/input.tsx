import { Input as InputPrimitive } from "@base-ui/react/input";
import type * as React from "react";

import { cn } from "@/lib/utils";

// Structural props read --lifi-input-* tokens; the var() fallbacks are the shadcn
// defaults, so a brand themes the input by overriding these tokens (colors flow
// through the role tokens: --input, --muted-foreground, --ring, --destructive).
function Input({ className, type, ...props }: React.ComponentProps<"input">) {
	return (
		<InputPrimitive
			type={type}
			data-slot="input"
			className={cn(
				"flex w-full min-w-0 border border-input px-3 py-1 shadow-xs transition-[color,box-shadow] outline-none selection:bg-primary selection:text-primary-foreground file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
				"[height:var(--lifi-input-height,2.25rem)] [border-radius:var(--lifi-input-radius,var(--radius-md))] [font-weight:var(--lifi-input-font-weight,400)]",
				"[background-color:var(--lifi-input-background,transparent)] dark:[background-color:var(--lifi-input-background,color-mix(in_oklab,var(--color-input)_30%,transparent))]",
				"[font-size:var(--lifi-input-font-size,1rem)] md:[font-size:var(--lifi-input-font-size,0.875rem)]",
				"focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50",
				"aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40",
				className,
			)}
			{...props}
		/>
	);
}

export { Input };
