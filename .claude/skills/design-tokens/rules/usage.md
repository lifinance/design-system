# Consuming tokens in a component

## Contents

- Use token utilities, not raw values
- Pair a surface with its foreground
- Size with the Tailwind scale

---

## Use token utilities, not raw values

A literal color or radius ignores the active theme and breaks in dark mode and under other brands.

**Incorrect:**

```tsx
<div style={{ background: "#ffffff", borderRadius: 10 }} />
```

**Correct:**

```tsx
<div className="bg-card rounded-lg" />
```

---

## Pair a surface with its foreground

Each foreground token is tuned for legible contrast on its surface in every theme and mode. Apply both halves of a pair together.

**Incorrect:**

```tsx
<button className="bg-primary text-foreground">Save</button>
```

**Correct:**

```tsx
<button className="bg-primary text-primary-foreground">Save</button>
```

---

## Size with the Tailwind scale

Size is component design, not a brand's configurable surface, so it is not a token. Use the Tailwind spacing scale, not tokens or arbitrary values.

**Incorrect:**

```tsx
<input style={{ height: 46 }} />
```

**Correct:**

```tsx
<input className="h-11.5 px-3.5" />
```

---

## Avoid arbitrary pixel values

An arbitrary value such as `h-[420px]` or `w-[323px]` bakes a fixed pixel measurement into the markup. It ignores the spacing scale, does not adapt to its container, and reads as a value lifted from another framework. The Tailwind scale covers any spacing as a multiple of the spacing unit (`h-105` is the same as `420px`), so reach for a scale step. Prefer a proportional rule over a fixed one: `aspect-square` keeps an image square at any width, and a fluid `w-full` lets the parent decide the size.

This rule holds when porting. Upstream and the nova preset author arbitrary pixel values; convert each to the scale step that equals it rather than copying it verbatim. The scale wins over a literal one-to-one copy.

| Upstream | Use |
| --- | --- |
| `ring-[3px]` | `ring-3` |
| `min-w-[96px]` | `min-w-24` |
| `w-[32px]` `h-[14px]` | `w-8` `h-3.5` |
| `top-[-10px]` | `-top-2.5` |
| `translate-x-[2.5rem]` | `translate-x-10` |

Keep the arbitrary value only when no scale step equals it: an off-scale measurement (`h-[18.4px]`), a font size with no scale token (`text-[0.8rem]`), a `calc()`, `min()`, or `var()` expression, or a fixed radius the token scale does not cover (`rounded-[4px]`).

**Incorrect:**

```tsx
<div className="h-[420px] w-[323px]">
	<img className="h-80 w-full object-cover" />
</div>
```

**Correct:**

```tsx
<div className="w-full">
	<img className="aspect-square w-full object-cover" />
</div>
```
