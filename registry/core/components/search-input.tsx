import { SearchIcon, XIcon } from "lucide-react";
import type * as React from "react";

import {
	InputGroup,
	InputGroupAddon,
	InputGroupButton,
	InputGroupInput,
} from "@/registry/core/ui/input-group";

type SearchInputProps = React.ComponentProps<typeof InputGroupInput> & {
	onClear?: () => void;
};

function SearchInput({ value, onClear, ...props }: SearchInputProps) {
	const hasValue = value != null && value !== "";
	return (
		<InputGroup>
			<InputGroupAddon className="pl-2.5">
				<SearchIcon className="size-6" />
			</InputGroupAddon>
			<InputGroupInput
				inputMode="search"
				autoComplete="off"
				value={value}
				{...props}
			/>
			{hasValue && onClear ? (
				<InputGroupAddon align="inline-end">
					<InputGroupButton
						size="icon-xs"
						aria-label="Clear"
						onClick={onClear}
						className="size-7 rounded-full"
					>
						<XIcon className="size-5" />
					</InputGroupButton>
				</InputGroupAddon>
			) : null}
		</InputGroup>
	);
}

export { SearchInput };
