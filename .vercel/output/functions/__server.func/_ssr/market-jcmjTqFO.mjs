import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { w as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { a as useApp, c as inr, d as CROPS, p as cropName } from "./router-DUh-9jiU.mjs";
import { t as useT } from "./i18n-B3f9H9bs.mjs";
import { t as cn } from "./cn-Ccejyh36.mjs";
import { t as Button } from "./button-CAZK6dCO.mjs";
import { i as Textarea, n as Label, r as Select, t as Input } from "./input-AFeAwbhg.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/market-jcmjTqFO.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function MarketPage() {
	const { t, lang } = useT();
	const [tab, setTab] = (0, import_react.useState)("browse");
	const [compose, setCompose] = (0, import_react.useState)(false);
	const listings = useApp((s) => s.listings);
	const name = useApp((s) => s.name);
	const village = useApp((s) => s.village);
	const state = useApp((s) => s.state);
	const addListing = useApp((s) => s.addListing);
	const myName = name || t("farmer");
	const [cropId, setCropId] = (0, import_react.useState)(CROPS[0].id);
	const [qty, setQty] = (0, import_react.useState)("20");
	const [price, setPrice] = (0, import_react.useState)("2400");
	const [grade, setGrade] = (0, import_react.useState)("A");
	const [notes, setNotes] = (0, import_react.useState)("");
	const [need, setNeed] = (0, import_react.useState)(true);
	const mine = listings.filter((l) => l.farmerName === myName);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-end justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "font-display text-3xl",
					children: t("marketTitle")
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					size: "sm",
					onClick: () => {
						setTab("sell");
						setCompose(true);
					},
					children: t("newListing")
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid grid-cols-2 rounded-full bg-muted p-1",
				children: ["browse", "sell"].map((k) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => setTab(k),
					className: cn("min-h-10 rounded-full text-sm font-medium", tab === k ? "bg-surface shadow-[var(--shadow-border)]" : "text-muted-foreground"),
					children: t(k === "sell" ? "sell" : "browse")
				}, k))
			}),
			tab === "sell" && compose ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				className: "space-y-3 rounded-[var(--radius-xl)] bg-surface p-4 shadow-[var(--shadow-border)]",
				onSubmit: (e) => {
					e.preventDefault();
					addListing({
						farmerName: myName,
						village: village || "Village",
						state,
						cropId,
						qtyQtl: Number(qty) || 1,
						pricePerQtl: Number(price) || 0,
						grade,
						notes,
						needDelivery: need,
						harvestDate: (/* @__PURE__ */ new Date()).toISOString()
					});
					toast.success(t("lotPosted"));
					setCompose(false);
				},
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: t("crop") }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Select, {
						value: cropId,
						onChange: (e) => setCropId(e.target.value),
						children: CROPS.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: c.id,
							children: cropName(c, lang)
						}, c.id))
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid grid-cols-2 gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Label, { children: [
							t("qty"),
							" (",
							t("quintal"),
							")"
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							type: "number",
							value: qty,
							onChange: (e) => setQty(e.target.value)
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: t("price") }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							type: "number",
							value: price,
							onChange: (e) => setPrice(e.target.value)
						})] })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: t("grade") }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
						value: grade,
						onChange: (e) => setGrade(e.target.value),
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "A" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "FAQ" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "B" })
						]
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: t("notes") }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
						value: notes,
						onChange: (e) => setNotes(e.target.value)
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "flex min-h-11 items-center gap-2 text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "checkbox",
							checked: need,
							onChange: (e) => setNeed(e.target.checked),
							className: "size-4"
						}), t("needVan")]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "submit",
						className: "w-full",
						children: t("publish")
					})
				]
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "space-y-3",
				children: (tab === "sell" ? mine : listings).length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted-foreground",
					children: t("emptyLots")
				}) : (tab === "sell" ? mine : listings).map((l) => {
					const crop = CROPS.find((c) => c.id === l.cropId);
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "overflow-hidden rounded-[var(--radius-lg)] bg-surface shadow-[var(--shadow-border)]",
						children: [crop ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: crop.photo,
							alt: "",
							className: "h-28 w-full object-cover"
						}) : null, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "p-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-start justify-between gap-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "font-display text-xl",
										children: crop ? cropName(crop, lang) : l.cropId
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "text-sm text-muted-foreground",
										children: [
											l.farmerName,
											" · ",
											l.village,
											", ",
											l.state
										]
									})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "tabular text-xl font-semibold text-accent",
										children: inr(l.pricePerQtl, lang)
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "mt-2 text-sm",
									children: [
										l.qtyQtl,
										" ",
										t("quintal"),
										" · ",
										t("grade"),
										" ",
										l.grade
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1 text-xs font-medium text-primary",
									children: l.needDelivery ? t("deliveryOn") : t("deliveryOff")
								}),
								l.notes ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1 text-sm text-muted-foreground",
									children: l.notes
								}) : null
							]
						})]
					}, l.id);
				})
			})
		]
	});
}
//#endregion
export { MarketPage as component };
