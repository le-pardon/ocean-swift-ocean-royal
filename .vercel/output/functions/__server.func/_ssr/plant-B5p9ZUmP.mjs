import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { w as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { _ as planFertilizers, a as useApp, c as inr, d as CROPS, f as STATES, h as recommendCrops, m as currentSeason, p as cropName } from "./router-CVrjSalQ.mjs";
import { t as useT } from "./i18n-DEMkNnHY.mjs";
import { t as FertilizerCards } from "./FertilizerCards-RC_JDDzt.mjs";
import { t as Button } from "./button-CAZK6dCO.mjs";
import { n as Label, r as Select, t as Input } from "./input-AFeAwbhg.mjs";
import { t as notice } from "./notices-BjITZ17I.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/plant-B5p9ZUmP.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function PlantPage() {
	const { t, lang } = useT();
	const store = useApp();
	const [state, setState] = (0, import_react.useState)(store.state);
	const [season, setSeason] = (0, import_react.useState)(store.season || currentSeason());
	const [soilType, setSoilType] = (0, import_react.useState)(store.soilTests[0]?.texture ?? store.soilType);
	const [irrigated, setIrrigated] = (0, import_react.useState)(store.irrigated);
	const [acres, setAcres] = (0, import_react.useState)(String(store.acres));
	const [show, setShow] = (0, import_react.useState)(true);
	const ranked = (0, import_react.useMemo)(() => recommendCrops({
		state,
		season,
		soilType,
		irrigated,
		acres: Number(acres) || 1,
		soil: store.soilTests[0]
	}), [
		state,
		season,
		soilType,
		irrigated,
		acres,
		store.soilTests
	]);
	const fert = store.soilTests[0] ? planFertilizers(store.soilTests[0], state) : [];
	function apply() {
		store.updateProfile({
			state,
			season,
			soilType,
			irrigated,
			acres: Number(acres) || 1
		});
		setShow(true);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-3xl",
				children: t("plantTitle")
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-muted-foreground",
				children: t("plantLead")
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				className: "space-y-3 rounded-[var(--radius-xl)] bg-surface p-4 shadow-[var(--shadow-border)]",
				onSubmit: (e) => {
					e.preventDefault();
					apply();
				},
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
						htmlFor: "state",
						children: t("state")
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Select, {
						id: "state",
						value: state,
						onChange: (e) => setState(e.target.value),
						children: STATES.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: s }, s))
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid grid-cols-2 gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							htmlFor: "season",
							children: t("season")
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Select, {
							id: "season",
							value: season,
							onChange: (e) => setSeason(e.target.value),
							children: [
								"kharif",
								"rabi",
								"zaid"
							].map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: s,
								children: t(s)
							}, s))
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							htmlFor: "soil",
							children: t("soil")
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Select, {
							id: "soil",
							value: soilType,
							onChange: (e) => setSoilType(e.target.value),
							children: [
								"sandy",
								"loam",
								"clay",
								"silt",
								"black"
							].map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: s,
								children: t(s)
							}, s))
						})] })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid grid-cols-2 gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							htmlFor: "water",
							children: t("water")
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
							id: "water",
							value: irrigated ? "irrigated" : "rainfed",
							onChange: (e) => setIrrigated(e.target.value === "irrigated"),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "irrigated",
								children: t("irrigated")
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "rainfed",
								children: t("rainfed")
							})]
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							htmlFor: "acres",
							children: t("acres")
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							id: "acres",
							type: "number",
							min: .5,
							step: .5,
							value: acres,
							onChange: (e) => setAcres(e.target.value)
						})] })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "submit",
						className: "w-full",
						children: t("adviseMe")
					})
				]
			}),
			show ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "rounded-[var(--radius-md)] bg-cream px-3 py-2 text-sm",
				children: notice(lang, "placeholderBanner")
			}) : null,
			show ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
				className: "space-y-4",
				children: ranked.map((c, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "overflow-hidden rounded-[var(--radius-xl)] bg-surface shadow-[var(--shadow-border)]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: c.photo,
							alt: "",
							className: "h-36 w-full object-cover"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "absolute start-3 top-3 rounded-full bg-background/90 px-2.5 py-1 text-sm font-semibold tabular",
							children: i + 1
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "p-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-start justify-between gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "font-display text-2xl",
									children: cropName(c, lang)
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm text-muted-foreground",
									children: t("harvestIn", { n: c.days })
								})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "text-end",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "tabular text-2xl font-semibold text-accent",
										children: inr(c.profitPerAcre, lang)
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs text-muted-foreground",
										children: t("profitAcre")
									})]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
								className: "mt-3 grid grid-cols-2 gap-2 text-sm",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
										label: t("costGrow"),
										value: inr(c.costPerAcre, lang)
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
										label: t("priceHarvest"),
										value: `${inr(c.harvestPrice, lang)} / qtl`
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
										label: t("lastYear"),
										value: `${inr(c.lastSeasonPrice, lang)} / qtl`
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
										label: t("fit"),
										value: `${Math.round(c.fitScore * 100)}%`
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-3 text-sm",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "font-medium",
									children: [t("whyThis"), ". "]
								}), c.why]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-1 text-sm text-muted-foreground",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "font-medium text-foreground",
									children: [t("risks"), ". "]
								}), c.risks]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
								className: "mt-2 list-disc ps-4 text-sm text-muted-foreground",
								children: c.reasons.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: r }, r))
							})
						]
					})]
				}, c.id))
			}) : null,
			fert.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "space-y-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-xl",
					children: t("feed")
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FertilizerCards, { items: fert })]
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-xs text-muted-foreground",
				children: [
					CROPS.length,
					" ",
					t("rankedBy")
				]
			})
		]
	});
}
function Stat({ label, value }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-[var(--radius-sm)] bg-cream px-3 py-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
			className: "text-xs text-muted-foreground",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
			className: "tabular font-medium",
			children: value
		})]
	});
}
//#endregion
export { PlantPage as component };
