"use client";

import type * as React from "react";

import { cn } from "@/registry/core/lib/utils";

function Label({ className, ...props }: React.ComponentProps<"label">) {
	return (
		// biome-ignore lint/a11y/noLabelWithoutControl: the control association arrives through htmlFor or children props
		<label
			data-slot="label"
			className={cn(
				"cn-label flex items-center select-none group-data-[disabled=true]:pointer-events-none peer-disabled:cursor-not-allowed",
				className,
			)}
			{...props}
		/>
	);
}

export { Label };
