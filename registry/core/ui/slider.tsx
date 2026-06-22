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
	// One thumb per value; a lone number stays a single thumb (Base UI's [min, max] fallback renders two).
	const _value = value ?? defaultValue;
	const _values = Array.isArray(_value) ? _value : [_value ?? min];

	return (
		<SliderPrimitive.Root
			className={cn("data-horizontal:w-full data-vertical:h-full", className)}
			data-slot="slider"
			defaultValue={defaultValue}
			value={value}
			min={min}
			max={max}
			thumbAlignment="edge"
			{...props}
		>
			<SliderPrimitive.Control className="cn-slider relative flex w-full touch-none items-center select-none data-disabled:opacity-50 data-vertical:h-full data-vertical:w-auto data-vertical:flex-col">
				<SliderPrimitive.Track
					data-slot="slider-track"
					className="cn-slider-track relative grow overflow-hidden select-none"
				>
					<SliderPrimitive.Indicator
						data-slot="slider-range"
						className="cn-slider-range select-none data-horizontal:h-full data-vertical:w-full"
					/>
				</SliderPrimitive.Track>
				{Array.from({ length: _values.length }, (_, index) => (
					<SliderPrimitive.Thumb
						data-slot="slider-thumb"
						// biome-ignore lint/suspicious/noArrayIndexKey: a thumb is identified by its position in the value array
						key={index}
						aria-label={thumbLabels?.[index]}
						className="cn-slider-thumb block shrink-0 select-none disabled:pointer-events-none disabled:opacity-50"
					/>
				))}
			</SliderPrimitive.Control>
		</SliderPrimitive.Root>
	);
}

export { Slider };
