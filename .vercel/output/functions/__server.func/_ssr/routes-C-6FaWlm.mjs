import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { S as useNavigate, w as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as Sprout, g as Check, p as Landmark, r as Truck, s as Search } from "../_libs/lucide-react.mjs";
import { a as useApp, r as LANGUAGES } from "./router-DUh-9jiU.mjs";
import { t as useT } from "./i18n-B3f9H9bs.mjs";
import { t as cn } from "./cn-Ccejyh36.mjs";
import { t as GrowLoop } from "./GrowLoop-DeR5WKmP.mjs";
import { t as Button } from "./button-CAZK6dCO.mjs";
import { t as Input } from "./input-AFeAwbhg.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-C-6FaWlm.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Onboarding() {
	const { t, lang } = useT();
	const navigate = useNavigate();
	const setLang = useApp((s) => s.setLang);
	const complete = useApp((s) => s.completeOnboarding);
	const onboarded = useApp((s) => s.onboarded);
	const role = useApp((s) => s.role);
	const hydrated = useApp((s) => s.hydrated);
	const [step, setStep] = (0, import_react.useState)("lang");
	const [q, setQ] = (0, import_react.useState)("");
	(0, import_react.useEffect)(() => {
		if (!hydrated) return;
		if (onboarded && role) navigate({ to: role === "farmer" ? "/farmer" : "/partner" });
	}, [
		hydrated,
		onboarded,
		role,
		navigate
	]);
	const filtered = (0, import_react.useMemo)(() => {
		const s = q.trim().toLowerCase();
		if (!s) return LANGUAGES;
		return LANGUAGES.filter((l) => l.name.toLowerCase().includes(s) || l.native.toLowerCase().includes(s) || l.code.includes(s));
	}, [q]);
	if (hydrated && onboarded && role) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto flex min-h-dvh max-w-lg flex-col justify-center px-6",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GrowLoop, { className: "overflow-hidden rounded-[var(--radius-xl)]" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-4 text-center font-display text-2xl text-primary",
			children: t("appName")
		})]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto min-h-dvh max-w-3xl px-4 pb-10 pt-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs font-medium tracking-[0.14em] text-accent",
				children: t("indianLangs")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-2 font-display text-4xl text-primary",
				children: t("appName")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-lg text-muted-foreground",
				children: t("tagline")
			}),
			step === "lang" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-8 font-display text-2xl",
					children: t("chooseLanguage")
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative mt-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "pointer-events-none absolute start-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						className: "ps-9",
						value: q,
						onChange: (e) => setQ(e.target.value),
						placeholder: t("searchLang")
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3",
					children: filtered.map((l) => {
						const on = lang === l.code;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							dir: l.dir,
							onClick: () => setLang(l.code),
							className: cn("flex min-h-16 w-full flex-col items-start rounded-[var(--radius-md)] px-3 py-2 text-start shadow-[var(--shadow-border)]", on ? "bg-primary text-primary-foreground" : "bg-surface text-foreground"),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "flex w-full items-center justify-between gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-lg leading-tight",
									children: l.native
								}), on ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "size-4 shrink-0" }) : null]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: cn("text-xs", on ? "text-primary-foreground/80" : "text-muted-foreground"),
								children: l.name
							})]
						}) }, l.code);
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					className: "mt-6 w-full",
					size: "lg",
					onClick: () => setStep("role"),
					children: t("continue")
				})
			] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					className: "mt-6 text-sm text-muted-foreground",
					onClick: () => setStep("lang"),
					children: ["← ", t("back")]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-3 font-display text-2xl",
					children: t("whoAreYou")
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-5 grid gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => {
							complete("farmer");
							navigate({ to: "/farmer" });
						},
						className: "flex gap-4 rounded-[var(--radius-xl)] bg-surface p-4 text-start shadow-[var(--shadow-border)]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "flex size-14 shrink-0 items-center justify-center rounded-[var(--radius-md)] bg-primary text-primary-foreground",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sprout, { className: "size-7" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "block font-display text-xl",
							children: t("farmer")
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "mt-1 block text-sm text-muted-foreground",
							children: t("farmerBlurb")
						})] })]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => {
							complete("partner");
							navigate({ to: "/partner" });
						},
						className: "flex gap-4 rounded-[var(--radius-xl)] bg-surface p-4 text-start shadow-[var(--shadow-border)]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "flex size-14 shrink-0 items-center justify-center rounded-[var(--radius-md)] bg-soil text-soil-foreground",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Truck, { className: "size-7" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "block font-display text-xl",
							children: t("partner")
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "mt-1 block text-sm text-muted-foreground",
							children: t("partnerBlurb")
						})] })]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-6 flex items-center gap-2 text-sm text-muted-foreground",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Landmark, { className: "size-4" }),
						t("changeLang"),
						" — ",
						t("indianLangs")
					]
				})
			] })
		]
	});
}
//#endregion
export { Onboarding as component };
