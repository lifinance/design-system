import { Slider as SliderPrimitive } from "@base-ui/react/slider";

import { cn } from "@/registry/core/lib/utils";

function Slider({
	className,
	defaultValue,
	value,
	min = 0,
	max = 100,
	thumbLabels,
	...props
}: SliderPrimitive.Root.Props & { thumbLabels?: string[] }) {
	// One thumb per value; a lone number stays a single thumb (upstream's [min, max] fallback renders two).
	const _value = value ?? defaultValue;
	const _values = Array.isArray(_value) ? _value : [_value ?? min];

	return (
		<SliderPrimitive.Root
			data-slot="slider"
			className={cn("data-horizontal:w-full data-vertical:h-full", className)}
			defaultValue={defaultValue}
			value={value}
			min={min}
			max={max}
			thumbAlignment="edge"
			{...props}
		>
			<SliderPrimitive.Control className="relative flex w-full touch-none items-center select-none data-disabled:opacity-50 data-vertical:h-full data-vertical:w-auto data-vertical:flex-col data-vertical:min-h-40">
				<SliderPrimitive.Track
					data-slot="slider-track"
					className="relative grow overflow-hidden rounded-full bg-muted select-none data-horizontal:h-1 data-horizontal:w-full data-vertical:h-full data-vertical:w-1"
				>
					<SliderPrimitive.Indicator
						data-slot="slider-range"
						className="select-none bg-primary data-horizontal:h-full data-vertical:w-full"
					/>
				</SliderPrimitive.Track>
				{Array.from({ length: _values.length }, (_, index) => (
					<SliderPrimitive.Thumb
						data-slot="slider-thumb"
						// biome-ignore lint/suspicious/noArrayIndexKey: a thumb is identified by its position in the value array
						key={index}
						aria-label={thumbLabels?.[index]}
						className="relative block size-3 shrink-0 rounded-full border border-ring bg-white ring-ring/50 transition-[color,box-shadow] select-none after:absolute after:-inset-2 hover:ring-3 focus-visible:ring-3 focus-visible:outline-hidden active:ring-3 disabled:pointer-events-none disabled:opacity-50 data-disabled:pointer-events-none data-disabled:opacity-50"
					/>
				))}
			</SliderPrimitive.Control>
		</SliderPrimitive.Root>
	);
}

export { Slider };
