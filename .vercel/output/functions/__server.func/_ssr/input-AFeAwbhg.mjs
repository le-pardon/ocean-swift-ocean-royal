import "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { w as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as cn } from "./cn-Ccejyh36.mjs";
require_react();
var import_jsx_runtime = require_jsx_runtime();
function Input({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
		className: cn("flex h-11 w-full rounded-[var(--radius-sm)] border border-border bg-surface px-3 text-base text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring", className),
		...props
	});
}
function Select({ className, children, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
		className: cn("flex h-11 w-full rounded-[var(--radius-sm)] border border-border bg-surface px-3 text-base text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring", className),
		...props,
		children
	});
}
function Textarea({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
		className: cn("flex min-h-24 w-full rounded-[var(--radius-sm)] border border-border bg-surface px-3 py-2 text-base text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring", className),
		...props
	});
}
function Label({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
		className: cn("mb-1.5 block text-sm font-medium text-muted-foreground", className),
		...props
	});
}
//#endregion
export { Textarea as i, Label as n, Select as r, Input as t };
