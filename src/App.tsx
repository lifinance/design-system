function App() {
	return (
		<div className="mx-auto flex min-h-svh max-w-2xl flex-col justify-center gap-6 px-6 py-12">
			<header className="flex flex-col gap-2">
				<p className="text-sm font-medium tracking-wide text-muted-foreground uppercase">
					LI.FI Design System
				</p>
				<h1 className="text-3xl font-bold tracking-tight">core registry</h1>
				<p className="text-muted-foreground">
					The shared shadcn registry for LI.FI. Components are distributed as
					source and installed with the shadcn CLI — teams own the copied code.
				</p>
			</header>

			<section className="flex flex-col gap-3 rounded-lg border p-5">
				<h2 className="text-sm font-semibold">Token layer</h2>
				<p className="text-sm text-muted-foreground">
					shadcn base tokens (neutral) are used as-is; the{" "}
					<code className="rounded bg-muted px-1 py-0.5 text-xs">--lifi-</code>{" "}
					namespace is reserved for tokens that need a unique prefix.
				</p>
				<div className="flex flex-wrap gap-2 pt-1">
					<span className="rounded-md bg-primary px-3 py-1 text-sm text-primary-foreground">
						primary
					</span>
					<span className="rounded-md bg-secondary px-3 py-1 text-sm text-secondary-foreground">
						secondary
					</span>
					<span className="rounded-md bg-muted px-3 py-1 text-sm text-muted-foreground">
						muted
					</span>
					<span className="rounded-md bg-accent px-3 py-1 text-sm text-accent-foreground">
						accent
					</span>
				</div>
			</section>

			<p className="text-sm text-muted-foreground">
				See <code className="text-xs">REGISTRY.md</code> for the registry model,
				namespaces, and conventions.
			</p>
		</div>
	);
}

export default App;
