import { Input as InputPrimitive } from "@base-ui/react/input";
import type * as React from "react";

import { cn } from "@/registry/core/lib/utils";

const DECIMAL = /^\d*\.?\d*$/;

// Shrink the type as the value grows so a long amount stays on one line.
function sizeForLength(length: number) {
	if (length > 16) {
		return "text-lg";
	}
	if (length > 12) {
		return "text-xl";
	}
	if (length > 9) {
		return "text-2xl";
	}
	return "text-3xl";
}

function AmountInput({
	className,
	value,
	maxLength = 20,
	onChange,
	onFocus,
	...props
}: React.ComponentProps<"input">) {
	return (
		<InputPrimitive
			data-slot="amount-input"
			inputMode="decimal"
			autoComplete="off"
			placeholder="0"
			value={value}
			maxLength={maxLength}
			className={cn(
				"h-10 w-full min-w-0 bg-transparent p-0 font-medium leading-none tracking-tight text-foreground tabular-nums outline-none placeholder:text-muted-foreground/50 read-only:cursor-default disabled:cursor-not-allowed disabled:opacity-50",
				sizeForLength(String(value ?? "").length),
				className,
			)}
			{...props}
			onFocus={(event) => {
				const end = event.currentTarget.value.length;
				event.currentTarget.setSelectionRange(end, end);
				onFocus?.(event);
			}}
			onChange={(event) => {
				if (DECIMAL.test(event.target.value)) {
					onChange?.(event);
				}
			}}
		/>
	);
}

export { AmountInput };
