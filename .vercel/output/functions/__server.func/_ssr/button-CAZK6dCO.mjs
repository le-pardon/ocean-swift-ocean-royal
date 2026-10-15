import "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { w as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { t as cn } from "./cn-Ccejyh36.mjs";
import { t as Slot } from "../_libs/radix-ui__react-slot.mjs";
require_react();
var import_jsx_runtime = require_jsx_runtime();
var buttonVariants = cva("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-[var(--radius-md)] text-sm font-medium transition-[opacity,transform,background-color] duration-150 ease-[cubic-bezier(0.23,1,0.32,1)] disabled:pointer-events-none disabled:opacity-45 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring min-h-11 active:scale-[0.98]", {
	variants: {
		variant: {
			default: "bg-primary text-primary-foreground hover:opacity-92",
			accent: "bg-accent text-accent-foreground hover:opacity-92",
			outline: "border border-border bg-surface text-foreground hover:bg-cream",
			ghost: "text-foreground hover:bg-muted",
			soil: "bg-soil text-soil-foreground hover:opacity-92"
		},
		size: {
			default: "h-11 px-4",
			sm: "h-9 px-3 text-sm",
			lg: "h-12 px-5 text-base",
			icon: "size-11"
		}
	},
	defaultVariants: {
		variant: "default",
		size: "default"
	}
});
function Button({ className, variant, size, asChild = false, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(asChild ? Slot : "button", {
		className: cn(buttonVariants({
			variant,
			size
		}), className),
		...props
	});
}
//#endregion
export { Button as t };
