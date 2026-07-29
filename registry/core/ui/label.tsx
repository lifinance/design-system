"use client";

import * as React from "react";

import { cn } from "@/registry/core/lib/utils";

const Label = React.forwardRef<HTMLLabelElement, React.ComponentProps<"label">>(
	function Label({ className, ...props }, ref) {
		return (
			// biome-ignore lint/a11y/noLabelWithoutControl: the control association arrives through htmlFor or children props
			<label
				ref={ref}
				data-slot="label"
				className={cn(
					"cn-label flex items-center select-none group-data-[disabled=true]:pointer-events-none peer-disabled:cursor-not-allowed",
					className,
				)}
				{...props}
			/>
		);
	},
);

export { Label };
