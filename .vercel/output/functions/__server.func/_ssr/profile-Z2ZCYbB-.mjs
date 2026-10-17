import { S as useNavigate, w as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { a as useApp, f as STATES, r as LANGUAGES } from "./router-CVrjSalQ.mjs";
import { t as useT } from "./i18n-DEMkNnHY.mjs";
import { t as Button } from "./button-CAZK6dCO.mjs";
import { n as Label, r as Select, t as Input } from "./input-AFeAwbhg.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/profile-Z2ZCYbB-.js
var import_jsx_runtime = require_jsx_runtime();
function PartnerProfile() {
	const { t, lang } = useT();
	const nav = useNavigate();
	const store = useApp();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-3xl",
				children: t("profile")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				className: "space-y-3 rounded-[var(--radius-xl)] bg-surface p-4 shadow-[var(--shadow-border)]",
				onSubmit: (e) => {
					e.preventDefault();
					toast.success(t("saved"));
				},
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: t("yourName") }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						value: store.name,
						placeholder: t("namePh"),
						onChange: (e) => store.updateProfile({ name: e.target.value })
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: t("village") }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						value: store.village,
						placeholder: t("villagePh"),
						onChange: (e) => store.updateProfile({ village: e.target.value })
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: t("state") }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Select, {
						value: store.state,
						onChange: (e) => store.updateProfile({ state: e.target.value }),
						children: STATES.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: s }, s))
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "submit",
						className: "w-full",
						children: t("save")
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "rounded-[var(--radius-xl)] bg-surface p-4 shadow-[var(--shadow-border)]",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-xl",
						children: t("changeLang")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mb-3 text-sm text-muted-foreground",
						children: t("indianLangs")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Select, {
						value: lang,
						onChange: (e) => store.setLang(e.target.value),
						children: LANGUAGES.map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
							value: l.code,
							children: [
								l.native,
								" — ",
								l.name
							]
						}, l.code))
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				variant: "outline",
				className: "w-full",
				onClick: () => {
					store.resetRole();
					nav({ to: "/" });
				},
				children: t("switchToFarmer")
			})
		]
	});
}
//#endregion
export { PartnerProfile as component };
