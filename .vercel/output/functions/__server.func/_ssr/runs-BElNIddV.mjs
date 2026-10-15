import { w as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as useApp, c as inr, d as CROPS, p as cropName } from "./router-DUh-9jiU.mjs";
import { t as useT } from "./i18n-B3f9H9bs.mjs";
import { t as Button } from "./button-CAZK6dCO.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/runs-BElNIddV.js
var import_jsx_runtime = require_jsx_runtime();
function RunsPage() {
	const { t, lang } = useT();
	const jobs = useApp((s) => s.jobs.filter((j) => j.status === "accepted" || j.status === "picked"));
	const advance = useApp((s) => s.advanceJob);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "font-display text-3xl",
			children: t("myRuns")
		}), jobs.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-sm text-muted-foreground",
			children: t("emptyRuns")
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "space-y-3",
			children: jobs.map((j) => {
				const crop = CROPS.find((c) => c.id === j.cropId);
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "rounded-[var(--radius-lg)] bg-surface p-4 shadow-[var(--shadow-border)]",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs font-medium uppercase tracking-wide text-accent",
							children: t("activeRun")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-display text-xl",
							children: crop ? cropName(crop, lang) : j.cropId
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-sm text-muted-foreground",
							children: [
								j.pickup,
								" → ",
								j.drop
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 tabular text-lg font-semibold text-accent",
							children: inr(j.payInr, lang)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							className: "mt-3 w-full",
							onClick: () => advance(j.id),
							children: j.status === "accepted" ? t("markPick") : t("markDrop")
						})
					]
				}, j.id);
			})
		})]
	});
}
//#endregion
export { RunsPage as component };
