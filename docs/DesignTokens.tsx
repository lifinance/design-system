import { Check, X } from "lucide-react";
import type * as React from "react";

import { cn } from "@/registry/core/lib/utils";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "./ui/table";

export type ColorRow = {
	name: string;
	foreground?: string;
	use: string;
};

export type RadiusRow = {
	token: string;
	utility: string;
	use: string;
};

export type ComponentTokenRow = {
	sample: React.ReactNode;
	token: string;
	utility: string;
	use: string;
};

export type Guideline = {
	point: string;
	why: string;
	do: string;
	dont: string;
};

function Chip({ children }: { children: React.ReactNode }) {
	return (
		<code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs text-foreground">
			{children}
		</code>
	);
}

function Section({
	title,
	children,
}: {
	title: string;
	children: React.ReactNode;
}) {
	return (
		<section className="flex flex-col gap-3">
			<h3 className="text-base font-semibold text-foreground">{title}</h3>
			{children}
		</section>
	);
}

export function ColorTokenTable({
	caption,
	rows,
}: {
	caption: string;
	rows: ColorRow[];
}) {
	return (
		<Section title={caption}>
			<Table>
				<TableHeader>
					<TableRow>
						<TableHead className="w-24">Sample</TableHead>
						<TableHead>Token</TableHead>
						<TableHead className="w-full">Role</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{rows.map((row) => (
						<TableRow key={row.name}>
							<TableCell>
								<span
									className="inline-flex h-10 w-16 items-center justify-center rounded-md border text-xl font-bold"
									style={{
										background: `var(--${row.name})`,
										color: row.foreground
											? `var(--${row.foreground})`
											: "transparent",
									}}
								>
									{row.foreground ? "Aa" : ""}
								</span>
							</TableCell>
							<TableCell className="font-mono text-[13px]">
								<div>--{row.name}</div>
								{row.foreground ? (
									<div className="text-muted-foreground">
										--{row.foreground}
									</div>
								) : null}
							</TableCell>
							<TableCell className="whitespace-normal text-sm">
								{row.use}
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</Section>
	);
}

export function RoundedTokenTable({
	caption,
	rows,
}: {
	caption: string;
	rows: RadiusRow[];
}) {
	return (
		<Section title={caption}>
			<Table>
				<TableHeader>
					<TableRow>
						<TableHead className="w-24">Sample</TableHead>
						<TableHead>Token</TableHead>
						<TableHead>Utility</TableHead>
						<TableHead className="w-full">Role</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{rows.map((row) => (
						<TableRow key={row.token}>
							<TableCell>
								<span
									className={cn(row.utility, "block h-10 w-16 border bg-muted")}
								/>
							</TableCell>
							<TableCell className="font-mono text-[13px]">
								--{row.token}
							</TableCell>
							<TableCell>
								<Chip>{row.utility}</Chip>
							</TableCell>
							<TableCell className="whitespace-normal text-sm">
								{row.use}
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</Section>
	);
}

export function ComponentTokenTable({ rows }: { rows: ComponentTokenRow[] }) {
	return (
		<Table>
			<TableHeader>
				<TableRow>
					<TableHead className="w-24">Sample</TableHead>
					<TableHead>Token</TableHead>
					<TableHead>Utility</TableHead>
					<TableHead className="w-full">Role</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{rows.map((row) => (
					<TableRow key={row.token}>
						<TableCell>{row.sample}</TableCell>
						<TableCell className="font-mono text-[13px]">
							--{row.token}
						</TableCell>
						<TableCell>
							<Chip>{row.utility}</Chip>
						</TableCell>
						<TableCell className="whitespace-normal text-sm">
							{row.use}
						</TableCell>
					</TableRow>
				))}
			</TableBody>
		</Table>
	);
}

const TYPE_SCALE = ["text-2xl", "text-xl", "text-base", "text-sm"];

export function TypographyTokens() {
	return (
		<div className="divide-y">
			{TYPE_SCALE.map((utility) => (
				<div
					key={utility}
					className="flex items-baseline gap-8 py-5 first:pt-0 last:pb-0"
				>
					<span className="w-20 shrink-0 font-mono text-xs text-muted-foreground">
						{utility}
					</span>
					<span className={cn(utility, "leading-tight text-foreground")}>
						Bridge anything, anywhere.
					</span>
				</div>
			))}
		</div>
	);
}

export function InfoTable({
	headers,
	rows,
}: {
	headers: string[];
	rows: React.ReactNode[][];
}) {
	return (
		<Table>
			<TableHeader>
				<TableRow>
					{headers.map((header) => (
						<TableHead key={header}>{header}</TableHead>
					))}
				</TableRow>
			</TableHeader>
			<TableBody>
				{rows.map((row) => (
					<TableRow key={String(row[0])}>
						{row.map((value, index) => (
							<TableCell
								key={headers[index]}
								className={cn(
									"whitespace-normal text-sm",
									index === 0 && "font-medium",
								)}
							>
								{value}
							</TableCell>
						))}
					</TableRow>
				))}
			</TableBody>
		</Table>
	);
}

function Badge({ kind }: { kind: "do" | "dont" }) {
	const isDo = kind === "do";
	return (
		<span
			className={cn(
				"inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-bold tracking-wide text-foreground",
				isDo ? "bg-success/15" : "bg-destructive/10",
			)}
		>
			{isDo ? <Check className="size-3.5" /> : <X className="size-3.5" />}
			{isDo ? "DO" : "DON'T"}
		</span>
	);
}

function GuideCard({ kind, code }: { kind: "do" | "dont"; code: string }) {
	return (
		<div className="overflow-hidden rounded-lg border bg-card">
			<div className="border-b px-4 py-3">
				<Badge kind={kind} />
			</div>
			<pre className="overflow-x-auto p-4 text-[13px]">
				<code className="font-mono text-foreground">{code}</code>
			</pre>
		</div>
	);
}

export function DoDont({ items }: { items: Guideline[] }) {
	return (
		<div className="flex flex-col gap-10">
			{items.map((guideline) => (
				<div key={guideline.point} className="flex flex-col gap-3">
					<h4 className="text-base font-semibold text-foreground">
						{guideline.point}
					</h4>
					<p className="text-sm text-muted-foreground">{guideline.why}</p>
					<div className="grid gap-4 sm:grid-cols-2">
						<GuideCard kind="do" code={guideline.do} />
						<GuideCard kind="dont" code={guideline.dont} />
					</div>
				</div>
			))}
		</div>
	);
}
