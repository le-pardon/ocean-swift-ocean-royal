import { w as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { d as MapPin, u as Navigation } from "../_libs/lucide-react.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { a as useApp, c as inr, d as CROPS, p as cropName } from "./router-DUh-9jiU.mjs";
import { t as useT } from "./i18n-B3f9H9bs.mjs";
import { t as Button } from "./button-CAZK6dCO.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/partner-CYGwrv8N.js
var import_jsx_runtime = require_jsx_runtime();
function JobsPage() {
	const { t, lang } = useT();
	const jobs = useApp((s) => s.jobs.filter((j) => j.status === "open"));
	const accept = useApp((s) => s.acceptJob);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "font-display text-3xl",
			children: t("openJobs")
		}), jobs.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-sm text-muted-foreground",
			children: t("emptyJobs")
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "space-y-3",
			children: jobs.map((j) => {
				const crop = CROPS.find((c) => c.id === j.cropId);
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "rounded-[var(--radius-lg)] bg-surface p-4 shadow-[var(--shadow-border)]",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-start justify-between gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-display text-xl",
								children: crop ? cropName(crop, lang) : j.cropId
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-sm text-muted-foreground",
								children: [
									j.qtyQtl,
									" ",
									t("quintal")
								]
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "tabular text-xl font-semibold text-accent",
								children: inr(j.payInr, lang)
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-3 flex items-start gap-2 text-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "mt-0.5 size-4 text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
								t("pickup"),
								": ",
								j.pickup
							] })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-1 flex items-start gap-2 text-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Navigation, { className: "mt-0.5 size-4 text-soil" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
								t("drop"),
								": ",
								j.drop
							] })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-2 text-xs text-muted-foreground",
							children: [
								j.km,
								" ",
								t("km"),
								" · ",
								t("fareEst"),
								" ",
								inr(j.payInr, lang)
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							className: "mt-3 w-full",
							onClick: () => {
								accept(j.id);
								toast.success(t("jobAccepted"));
							},
							children: t("accept")
						})
					]
				}, j.id);
			})
		})]
	});
}
//#endregion
export { JobsPage as component };
