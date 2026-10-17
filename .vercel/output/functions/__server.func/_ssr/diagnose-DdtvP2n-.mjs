import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { w as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as TSS_SERVER_FUNCTION, r as getServerFnById, t as createServerFn } from "./ssr.mjs";
import { a as invalidSoilFields, c as validateAnalyzeInput, n as blankSoilDraft } from "./ai-parse-DhCLcDqF.mjs";
import { _ as Camera, c as ScrollText, m as ImagePlus } from "../_libs/lucide-react.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { C as statusK, D as statusP, E as statusOC, O as statusZn, S as statusFe, T as statusN, _ as planFertilizers, a as useApp, b as statusB, l as shortDate, n as Route$7, o as fileToJpegDataUrl, u as uid, v as sampleMaharashtraSoil, w as statusMn, x as statusCu, y as shopsFor } from "./router-CVrjSalQ.mjs";
import { t as useT } from "./i18n-DEMkNnHY.mjs";
import { t as cn } from "./cn-Ccejyh36.mjs";
import { t as GrowLoop } from "./GrowLoop-DeR5WKmP.mjs";
import { t as FertilizerCards } from "./FertilizerCards-RC_JDDzt.mjs";
import { t as Button } from "./button-CAZK6dCO.mjs";
import { n as Label, r as Select, t as Input } from "./input-AFeAwbhg.mjs";
import { n as signLabel, t as notice } from "./notices-BjITZ17I.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/diagnose-DdtvP2n-.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var createSsrRpc = (functionId) => {
	const url = "/_serverFn/" + functionId;
	const serverFnMeta = { id: functionId };
	const fn = async (...args) => {
		return (await getServerFnById(functionId, { origin: "server" }))(...args);
	};
	return Object.assign(fn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
var analyzePhoto = createServerFn({ method: "POST" }).validator((input) => {
	const v = validateAnalyzeInput(input);
	if (!v.ok) throw new Error(v.error);
	return v.value;
}).handler(createSsrRpc("f39dd9ba443980ac6f5a940ea15dcc47c84f19fc4cf165abd645c4b6d061e9f0"));
function LeafArt({ tint, className = "" }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		viewBox: "0 0 120 140",
		className,
		"aria-hidden": true,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ellipse", {
				cx: "60",
				cy: "128",
				rx: "28",
				ry: "6",
				fill: "rgba(28,36,24,0.12)"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M60 128 C60 90 20 70 24 36 C40 20 56 18 60 8 C64 18 80 20 96 36 C100 70 60 90 60 128 Z",
				fill: tint
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M60 16 C60 16 60 120 60 124",
				stroke: "#1c2418",
				strokeOpacity: "0.35",
				strokeWidth: "1.5",
				fill: "none"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M60 48 C46 54 38 62 32 74",
				stroke: "#1c2418",
				strokeOpacity: "0.22",
				fill: "none"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M60 48 C74 54 82 62 88 74",
				stroke: "#1c2418",
				strokeOpacity: "0.22",
				fill: "none"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M60 72 C48 80 42 90 38 102",
				stroke: "#1c2418",
				strokeOpacity: "0.18",
				fill: "none"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M60 72 C72 80 78 90 82 102",
				stroke: "#1c2418",
				strokeOpacity: "0.18",
				fill: "none"
			})
		]
	});
}
var shops = shopsFor("Maharashtra");
function fert(id, name, purpose, dosePerAcre, doseKg, bagSizeKg, bagCostInr, notes) {
	return {
		id,
		name,
		purpose,
		dosePerAcre,
		doseKg,
		bagSizeKg,
		bagCostInr,
		shops,
		notes
	};
}
var LEAF_SAMPLES = [
	{
		id: "n",
		titleKey: "sampleN",
		tint: "#c9b24a",
		diagnosis: {
			issueType: "deficiency",
			issue: "Nitrogen deficiency",
			severity: "mid",
			cropGuess: "Maize / paddy",
			summary: "Older leaves have gone a uniform pale yellow from the tip. Growth looks thin. This is classic nitrogen hunger, not a virus.",
			treatment: "Top-dress urea immediately, then irrigate. A foliar 2% urea spray buys 5 days if the crop is already tall.",
			fertilizers: [fert("urea", "Urea 46-0-0", "Fast nitrogen for yellowing older leaves.", "50 kg / acre, split", 50, 45, 266)]
		}
	},
	{
		id: "p",
		titleKey: "sampleP",
		tint: "#7a4a8a",
		diagnosis: {
			issueType: "deficiency",
			issue: "Phosphorus deficiency",
			severity: "mid",
			cropGuess: "Tomato / wheat",
			summary: "Leaves are a dark, dull green with purple-red undersides. Plants look stunted from the start — phosphorus never reached the roots.",
			treatment: "Band DAP below the next sowing. For a standing crop, foliar DAP 1% in the evening, twice, 7 days apart.",
			fertilizers: [fert("dap", "DAP 18-46-0", "Correct low phosphorus at the root zone.", "50 kg / acre", 50, 50, 1350)]
		}
	},
	{
		id: "k",
		titleKey: "sampleK",
		tint: "#b56a1e",
		diagnosis: {
			issueType: "deficiency",
			issue: "Potassium deficiency",
			severity: "high",
			cropGuess: "Cotton",
			summary: "Leaf margins scorch brown while the centre stays green. Bolls (or grain) fill poorly. This is potassium, not sunburn.",
			treatment: "Apply MOP and irrigate. Foliar 1% potassium nitrate if the crop is already flowering.",
			fertilizers: [fert("mop", "MOP 0-0-60", "Restore potassium for grain / boll fill.", "25 kg / acre", 25, 50, 900)]
		}
	},
	{
		id: "zn",
		titleKey: "sampleZn",
		tint: "#8a7a3c",
		diagnosis: {
			issueType: "deficiency",
			issue: "Zinc deficiency (khaira)",
			severity: "mid",
			cropGuess: "Paddy",
			summary: "Dusty brown rusty patches on mid-leaves, plants look dusty even after rain. Classic zinc hunger on alkaline paddies.",
			treatment: "Basal zinc sulphate this season. Foliar 0.5% ZnSO₄ + 0.25% lime if the crop is already in water.",
			fertilizers: [fert("znso4", "Zinc sulphate 21%", "Correct khaira / white bud. Once in two years on most soils.", "10 kg / acre", 10, 10, 480)]
		}
	}
];
function DiagnosePage() {
	const { tab } = Route$7.useSearch();
	const navigate = Route$7.useNavigate();
	const { t } = useT();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-3xl",
				children: t("scanTitle")
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-muted-foreground",
				children: tab === "soil" ? t("soilLead") : t("waitingPhoto")
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid grid-cols-2 rounded-full bg-muted p-1",
				children: ["leaf", "soil"].map((k) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => navigate({ search: { tab: k } }),
					className: cn("min-h-10 rounded-full text-sm font-medium", tab === k ? "bg-surface text-foreground shadow-[var(--shadow-border)]" : "text-muted-foreground"),
					children: t(k === "leaf" ? "leafTab" : "soilTab")
				}, k))
			}),
			tab === "soil" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SoilPanel, {}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LeafPanel, {})
		]
	});
}
var CONSENT_KEY = "khetsaathi-photo-consent-v1";
/** Photos leave the device for an outside AI service, so ask first. Stored per device. */
function usePhotoConsent() {
	const [ok, setOk] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		try {
			setOk(localStorage.getItem(CONSENT_KEY) === "1");
		} catch {}
	}, []);
	const grant = () => {
		setOk(true);
		try {
			localStorage.setItem(CONSENT_KEY, "1");
		} catch {}
	};
	return {
		ok,
		grant
	};
}
function ConsentGate({ lang, grant }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-2 rounded-[var(--radius-lg)] bg-surface p-4 text-sm shadow-[var(--shadow-border)]",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: notice(lang, "photoConsentText") }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			type: "button",
			variant: "outline",
			onClick: grant,
			children: notice(lang, "photoConsentCheck")
		})]
	});
}
function LeafPanel() {
	const { t, lang } = useT();
	const add = useApp((s) => s.addDiagnosis);
	const camRef = (0, import_react.useRef)(null);
	const galRef = (0, import_react.useRef)(null);
	const [busy, setBusy] = (0, import_react.useState)(false);
	const [photo, setPhoto] = (0, import_react.useState)(null);
	const [result, setResult] = (0, import_react.useState)(null);
	const [failed, setFailed] = (0, import_react.useState)(false);
	const [note, setNote] = (0, import_react.useState)(null);
	const consent = usePhotoConsent();
	async function fromFile(file) {
		setFailed(false);
		setNote(null);
		setResult(null);
		const dataUrl = await fileToJpegDataUrl(file);
		setPhoto(dataUrl);
		setBusy(true);
		const minWait = new Promise((r) => setTimeout(r, 2e3));
		try {
			const res = await analyzePhoto({ data: {
				imageBase64: dataUrl,
				kind: "leaf",
				lang
			} });
			await minWait;
			if (!res.ok || res.kind !== "leaf") {
				setFailed(true);
				toast.error(t("aiOff"));
				return;
			}
			if (res.quality === "unusable") {
				setNote(notice(lang, "leafUnusable"));
				return;
			}
			const shown = res.signs.filter((x) => x !== "none_visible");
			const d = {
				id: uid("dx"),
				date: (/* @__PURE__ */ new Date()).toISOString(),
				photoDataUrl: dataUrl,
				origin: "ai",
				issueType: "unclear",
				issue: shown.length ? shown.map((x) => signLabel(lang, x)).join("; ") : signLabel(lang, "none_visible"),
				summary: [
					shown.length ? "" : notice(lang, "leafNoSigns"),
					res.quality === "poor" ? notice(lang, "leafUnusable") : "",
					notice(lang, "leafNotice")
				].filter(Boolean).join(" "),
				treatment: notice(lang, "leafGuidance"),
				fertilizers: []
			};
			setResult(d);
			add(d);
		} catch {
			await minWait;
			setFailed(true);
		} finally {
			setBusy(false);
		}
	}
	function applySample(sample = LEAF_SAMPLES[0]) {
		const d = {
			...sample.diagnosis,
			id: uid("dx"),
			date: (/* @__PURE__ */ new Date()).toISOString(),
			origin: "demo"
		};
		setPhoto(null);
		setResult(d);
		setFailed(false);
		setNote(null);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
				ref: camRef,
				type: "file",
				accept: "image/*",
				capture: "environment",
				className: "hidden",
				onChange: (e) => e.target.files?.[0] && void fromFile(e.target.files[0])
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
				ref: galRef,
				type: "file",
				accept: "image/*",
				className: "hidden",
				onChange: (e) => e.target.files?.[0] && void fromFile(e.target.files[0])
			}),
			busy ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "overflow-hidden rounded-[var(--radius-xl)] shadow-[var(--shadow-border)]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GrowLoop, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "bg-surface px-4 py-3 text-center text-sm text-muted-foreground",
					children: t("analysing")
				})]
			}) : photo ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: photo,
				alt: "",
				className: "h-48 w-full rounded-[var(--radius-lg)] object-cover"
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "rounded-[var(--radius-lg)] border border-dashed border-border bg-cream px-4 py-8 text-center text-sm text-muted-foreground",
				children: t("waitingPhoto")
			}),
			consent.ok ? null : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ConsentGate, {
				lang,
				grant: consent.grant
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-2 gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					disabled: !consent.ok,
					onClick: () => camRef.current?.click(),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Camera, { className: "size-4" }), t("takePhoto")]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					variant: "outline",
					disabled: !consent.ok,
					onClick: () => galRef.current?.click(),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ImagePlus, { className: "size-4" }), t("gallery")]
				})]
			}),
			note ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "rounded-[var(--radius-md)] bg-cream px-3 py-2 text-sm",
				children: note
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mb-2 text-sm font-medium text-muted-foreground",
				children: t("samples")
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid grid-cols-4 gap-2",
				children: LEAF_SAMPLES.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: () => applySample(s),
					className: "rounded-[var(--radius-md)] bg-surface p-2 shadow-[var(--shadow-border)]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LeafArt, {
						tint: s.tint,
						className: "mx-auto h-16"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "mt-1 block text-center text-[11px] leading-tight",
						children: t(s.titleKey)
					})]
				}, s.id))
			})] }),
			failed ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-2 rounded-[var(--radius-lg)] bg-surface p-4 text-sm shadow-[var(--shadow-border)]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: t("aiOff") }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: notice(lang, "expertFallback") })]
			}) : null,
			result ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DiagnosisCard, { d: result }) : null
		]
	});
}
function DiagnosisCard({ d }) {
	const { t, lang } = useT();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "space-y-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
			className: "rounded-[var(--radius-lg)] bg-surface p-4 shadow-[var(--shadow-border)]",
			children: [
				d.origin === "demo" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mb-2 rounded-[var(--radius-sm)] bg-accent/15 px-2.5 py-1.5 text-xs font-medium text-accent",
					children: notice(lang, "demoBanner")
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs font-medium uppercase tracking-wide text-muted-foreground",
					children: t("issue")
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-2xl",
					children: d.issue
				}),
				d.cropGuess ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted-foreground",
					children: d.cropGuess
				}) : null,
				d.severity ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-2 inline-block rounded-full bg-accent/15 px-2.5 py-0.5 text-xs font-medium text-accent",
					children: [
						t("severity"),
						": ",
						t({
							low: "low",
							mid: "mid",
							high: "high"
						}[d.severity])
					]
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 text-sm",
					children: d.summary
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-2 text-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "font-medium",
						children: [t("fix"), ". "]
					}), d.treatment]
				})
			]
		}), d.fertilizers.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
			className: "font-display text-xl",
			children: t("buy")
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FertilizerCards, { items: d.fertilizers })] }) : null]
	});
}
function SoilPanel() {
	const { t, lang } = useT();
	const store = useApp();
	const camRef = (0, import_react.useRef)(null);
	const galRef = (0, import_react.useRef)(null);
	const [busy, setBusy] = (0, import_react.useState)(false);
	const [draft, setDraft] = (0, import_react.useState)(null);
	const [photo, setPhoto] = (0, import_react.useState)(null);
	const [activeId, setActiveId] = (0, import_react.useState)(null);
	const [soilNote, setSoilNote] = (0, import_react.useState)(null);
	const consent = usePhotoConsent();
	async function fromFile(file) {
		const dataUrl = await fileToJpegDataUrl(file);
		setPhoto(dataUrl);
		setBusy(true);
		setSoilNote(null);
		const minWait = new Promise((r) => setTimeout(r, 2e3));
		const blank = {
			...blankSoilDraft(store.soilType),
			photoDataUrl: dataUrl
		};
		try {
			const res = await analyzePhoto({ data: {
				imageBase64: dataUrl,
				kind: "soil-card",
				lang
			} });
			await minWait;
			if (!res.ok || res.kind !== "soil-card") {
				toast.error(t("aiOff"));
				setSoilNote(notice(lang, "soilNotRead"));
				setDraft(blank);
				return;
			}
			setDraft({
				...blank,
				...res.values,
				lab: res.lab,
				source: "card"
			});
			setSoilNote(res.missing.length ? notice(lang, "soilUnreadable", { fields: res.missing.join(", ") }) : null);
		} catch {
			await minWait;
			toast.error(t("aiOff"));
			setSoilNote(notice(lang, "soilNotRead"));
			setDraft(blank);
		} finally {
			setBusy(false);
		}
	}
	function save() {
		if (!draft) return;
		if (draft.source === "sample") {
			toast.error(notice(lang, "soilSampleNotSavable"));
			return;
		}
		const bad = invalidSoilFields(draft);
		if (bad.length > 0) {
			toast.error(notice(lang, "soilIncomplete", { fields: bad.join(", ") }));
			return;
		}
		const saved = {
			...draft,
			id: uid("soil"),
			date: (/* @__PURE__ */ new Date()).toISOString()
		};
		store.addSoilTest(saved);
		if (draft.texture) store.updateProfile({ soilType: draft.texture });
		setActiveId(saved.id);
		setDraft(null);
		toast.success(t("saved"));
	}
	const active = store.soilTests.find((s) => s.id === activeId) ?? store.soilTests[0];
	const draftComplete = draft ? invalidSoilFields(draft).length === 0 : false;
	const preview = draft && draftComplete ? planFertilizers({
		...draft,
		id: "draft",
		date: ""
	}, store.state) : [];
	const savedPlan = active ? planFertilizers(active, store.state) : [];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
				ref: camRef,
				type: "file",
				accept: "image/*",
				capture: "environment",
				className: "hidden",
				onChange: (e) => e.target.files?.[0] && void fromFile(e.target.files[0])
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
				ref: galRef,
				type: "file",
				accept: "image/*",
				className: "hidden",
				onChange: (e) => e.target.files?.[0] && void fromFile(e.target.files[0])
			}),
			busy ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "overflow-hidden rounded-[var(--radius-xl)] shadow-[var(--shadow-border)]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GrowLoop, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "bg-surface px-4 py-3 text-center text-sm text-muted-foreground",
					children: t("reading")
				})]
			}) : photo ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: photo,
				alt: "",
				className: "h-44 w-full rounded-[var(--radius-lg)] object-cover"
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "rounded-[var(--radius-lg)] border border-dashed border-border bg-cream px-4 py-6 text-center text-sm text-muted-foreground",
				children: t("waitingCard")
			}),
			consent.ok ? null : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ConsentGate, {
				lang,
				grant: consent.grant
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-2 gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					disabled: !consent.ok,
					onClick: () => camRef.current?.click(),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Camera, { className: "size-4" }), t("snapHealthCard")]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					variant: "outline",
					disabled: !consent.ok,
					onClick: () => galRef.current?.click(),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ImagePlus, { className: "size-4" }), t("gallery")]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-2 gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					variant: "outline",
					onClick: () => {
						setDraft(sampleMaharashtraSoil());
						setPhoto(null);
						setSoilNote(notice(lang, "soilSampleNotSavable"));
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScrollText, { className: "size-4" }), t("sampleCard")]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "ghost",
					onClick: () => {
						setDraft(blankSoilDraft(store.soilType));
						setPhoto(null);
						setSoilNote(null);
					},
					children: t("manual")
				})]
			}),
			draft ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				className: "space-y-3 rounded-[var(--radius-xl)] bg-surface p-4 shadow-[var(--shadow-border)]",
				onSubmit: (e) => {
					e.preventDefault();
					save();
				},
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-xl",
						children: t("confirmSoil")
					}),
					soilNote ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "rounded-[var(--radius-sm)] bg-cream px-3 py-2 text-sm",
						children: soilNote
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid grid-cols-2 gap-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Num, {
								label: t("pH"),
								value: draft.pH,
								onChange: (pH) => setDraft({
									...draft,
									pH
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Num, {
								label: "EC",
								value: draft.EC,
								onChange: (EC) => setDraft({
									...draft,
									EC
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Num, {
								label: t("organicC"),
								value: draft.OC,
								onChange: (OC) => setDraft({
									...draft,
									OC
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Num, {
								label: t("nitrogen"),
								value: draft.N,
								onChange: (N) => setDraft({
									...draft,
									N
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Num, {
								label: t("phosphorus"),
								value: draft.P,
								onChange: (P) => setDraft({
									...draft,
									P
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Num, {
								label: t("potassium"),
								value: draft.K,
								onChange: (K) => setDraft({
									...draft,
									K
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Num, {
								label: t("sulphur"),
								value: draft.S,
								onChange: (S) => setDraft({
									...draft,
									S
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Num, {
								label: t("zinc"),
								value: draft.Zn,
								onChange: (Zn) => setDraft({
									...draft,
									Zn
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Num, {
								label: t("iron"),
								value: draft.Fe,
								onChange: (Fe) => setDraft({
									...draft,
									Fe
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Num, {
								label: t("manganese"),
								value: draft.Mn,
								onChange: (Mn) => setDraft({
									...draft,
									Mn
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Num, {
								label: t("copper"),
								value: draft.Cu,
								onChange: (Cu) => setDraft({
									...draft,
									Cu
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Num, {
								label: t("boron"),
								value: draft.B,
								onChange: (B) => setDraft({
									...draft,
									B
								})
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: t("texture") }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mb-1 text-xs text-muted-foreground",
							children: notice(lang, "soilTextureNote")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Select, {
							value: draft.texture,
							onChange: (e) => setDraft({
								...draft,
								texture: e.target.value
							}),
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
						})
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: t("lab") }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						value: draft.lab ?? "",
						onChange: (e) => setDraft({
							...draft,
							lab: e.target.value
						})
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "font-display text-lg",
						children: t("plan")
					}),
					draftComplete ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NutrientStrip, { soil: {
						...draft,
						id: "draft",
						date: ""
					} }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FertilizerCards, { items: preview })] }) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "submit",
						className: "w-full",
						children: t("addTest")
					})
				]
			}) : null,
			active && !draft ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "space-y-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-xl",
						children: t("plan")
					}),
					active.photoDataUrl ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: active.photoDataUrl,
						alt: "",
						className: "h-32 w-full rounded-[var(--radius-lg)] object-cover"
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-sm text-muted-foreground",
						children: [shortDate(active.date, lang), active.lab ? ` · ${active.lab}` : ""]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NutrientStrip, { soil: active }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FertilizerCards, { items: savedPlan })
				]
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-display text-xl",
				children: t("testsSaved")
			}), store.soilTests.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-sm text-muted-foreground",
				children: t("historyEmpty")
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "mt-2 space-y-2",
				children: store.soilTests.map((s) => {
					const on = active?.id === s.id && !draft;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => {
							setActiveId(s.id);
							setDraft(null);
							setPhoto(s.photoDataUrl ?? null);
						},
						className: cn("flex w-full items-center gap-3 rounded-[var(--radius-md)] bg-surface px-3 py-2 text-start text-sm shadow-[var(--shadow-border)]", on && "ring-2 ring-primary"),
						children: [s.photoDataUrl ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: s.photoDataUrl,
							alt: "",
							className: "size-12 shrink-0 rounded-[var(--radius-sm)] object-cover"
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "flex size-12 shrink-0 items-center justify-center rounded-[var(--radius-sm)] bg-cream text-primary",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScrollText, { className: "size-5" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "block font-medium",
							children: shortDate(s.date, lang)
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "block text-muted-foreground",
							children: [
								"N ",
								Math.round(s.N),
								" · P ",
								Math.round(s.P),
								" · K ",
								Math.round(s.K),
								" · pH ",
								s.pH.toFixed(1),
								s.lab ? ` · ${s.lab}` : ""
							]
						})] })]
					}) }, s.id);
				})
			})] })
		]
	});
}
function Num({ label, value, onChange }) {
	const shown = Number.isFinite(value) ? String(Math.round(value * 100) / 100) : "";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: label }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
		type: "number",
		step: "any",
		value: shown,
		onChange: (e) => onChange(e.target.value === "" ? NaN : Number(e.target.value))
	})] });
}
function NutrientStrip({ soil }) {
	const { t } = useT();
	const rows = [
		{
			k: t("nitrogen"),
			s: statusN(soil.N)
		},
		{
			k: t("phosphorus"),
			s: statusP(soil.P)
		},
		{
			k: t("potassium"),
			s: statusK(soil.K)
		},
		{
			k: t("organicC"),
			s: statusOC(soil.OC)
		},
		{
			k: t("sulphur"),
			s: soil.S < 10 ? "deficient" : "opt"
		},
		{
			k: t("zinc"),
			s: statusZn(soil.Zn)
		},
		{
			k: t("iron"),
			s: statusFe(soil.Fe ?? 99)
		},
		{
			k: t("manganese"),
			s: statusMn(soil.Mn ?? 99)
		},
		{
			k: t("copper"),
			s: statusCu(soil.Cu ?? 99)
		},
		{
			k: t("boron"),
			s: statusB(soil.B ?? 99)
		}
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
		className: "grid grid-cols-2 gap-2",
		children: rows.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
			className: "rounded-[var(--radius-sm)] bg-cream px-3 py-2 text-sm",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs text-muted-foreground",
				children: r.k
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: r.s === "deficient" ? "font-medium text-accent" : "font-medium text-primary",
				children: t(r.s)
			})]
		}, r.k))
	});
}
//#endregion
export { DiagnosePage as component };
