import type * as React from "react";

import { cn } from "@/registry/core/lib/utils";

import "./scroll-fade.css";

interface ScrollFadeProps extends React.ComponentProps<"div"> {
	viewportClassName?: string;
	viewportProps?: Omit<React.ComponentProps<"div">, "children" | "className">;
}

function ScrollFade({
	children,
	className,
	viewportClassName,
	viewportProps,
	...props
}: ScrollFadeProps) {
	const { tabIndex = 0, ...resolvedViewportProps } = viewportProps ?? {};

	return (
		<div
			data-slot="scroll-fade"
			className={cn("cn-scroll-fade", className)}
			{...props}
		>
			<div
				{...resolvedViewportProps}
				data-slot="scroll-fade-viewport"
				tabIndex={tabIndex}
				className={cn("cn-scroll-fade-viewport", viewportClassName)}
			>
				{children}
			</div>
			<div
				aria-hidden="true"
				data-slot="scroll-fade-top"
				className="cn-scroll-fade-edge cn-scroll-fade-top"
			/>
			<div
				aria-hidden="true"
				data-slot="scroll-fade-bottom"
				className="cn-scroll-fade-edge cn-scroll-fade-bottom"
			/>
		</div>
	);
}

export type { ScrollFadeProps };
export { ScrollFade };
