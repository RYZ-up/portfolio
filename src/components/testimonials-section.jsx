import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// Efferd testimonials-2, adapted: the quote, name and role come from props, and
// the side-by-side layout follows the width of the card (container query), not
// the window, so it stays stacked in the narrow left column.
export function TestimonialsSection({ avatarSrc, avatarAlt = "", fallback, name, role, children, className }) {
	return (
		<div className={cn("@container w-full", className)}>
			<figure className="mx-auto flex w-full flex-col items-center justify-center @md:grid @md:grid-cols-[auto_1fr]">
				<div className="relative">
					{/* Vertical lines */}
					<MaskLine className="left-0" orientation="vertical" />
					<MaskLine className="right-0" orientation="vertical" />
					{/* Horizontal lines */}
					<MaskLine className="top-0 @md:w-xl" orientation="horizontal" />
					<MaskLine className="bottom-0 @md:w-xl" orientation="horizontal" />

					<Avatar className="mask-[radial-gradient(circle,black_60%,transparent)] size-24 rounded-none *:rounded-none after:rounded-none @md:size-28">
						{avatarSrc && <AvatarImage alt={avatarAlt} src={avatarSrc} />}
						<AvatarFallback className="bg-transparent">{fallback}</AvatarFallback>
					</Avatar>
				</div>
				<figcaption className="space-y-4 px-2 pt-8 text-center @md:p-6 @md:text-left">
					<blockquote className="m-0 text-lg text-muted-foreground leading-snug tracking-tight">
						{children}
					</blockquote>

					<div>
						<cite className="font-medium text-foreground text-sm not-italic">{name}</cite>
						<div className="text-xs text-muted-foreground">{role}</div>
					</div>
				</figcaption>
			</figure>
		</div>
	);
}

export function MaskLine({ className, orientation, ...props }) {
	return (
		<div
			aria-hidden="true"
			className={cn(
				"absolute bg-foreground/20",
				orientation === "vertical" &&
					"mask-t-from-80% mask-b-from-80% -inset-y-1/2 w-px",
				orientation === "horizontal" &&
					"mask-l-from-80% mask-r-from-80% -inset-x-1/2 h-px",
				className
			)}
			{...props}
		/>
	);
}
