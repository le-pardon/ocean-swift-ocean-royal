import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { C as useRouter, _ as Outlet, b as createRootRoute, f as Scripts, g as createRouter, p as HeadContent, v as lazyRouteComponent, w as require_jsx_runtime, y as createFileRoute } from "../_libs/@tanstack/react-router+[...].mjs";
import { i as TriangleAlert } from "../_libs/lucide-react.mjs";
import { a as union, i as string, n as number, r as object, t as literal } from "../_libs/zod.mjs";
import { n as persist, r as create, t as createJSONStorage } from "../_libs/zustand.mjs";
import { t as Toaster } from "../_libs/sonner.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/router-DUh-9jiU.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var __defProp = Object.defineProperty;
var __exportAll = (all, no_symbols) => {
	let target = {};
	for (var name in all) __defProp(target, name, {
		get: all[name],
		enumerable: true
	});
	if (!no_symbols) __defProp(target, Symbol.toStringTag, { value: "Module" });
	return target;
};
var FALLBACK_MESSAGE = "An unexpected error occurred. Try reloading the page.";
function errorMessage(error) {
	if (error instanceof Error && error.message) return error.message;
	if (typeof error === "string" && error) return error;
	return FALLBACK_MESSAGE;
}
function AppErrorComponent({ error }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "flex min-h-screen flex-col items-center justify-center gap-3 px-6 text-center bg-zinc-50 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-50",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-red-500",
				"aria-hidden": "true",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, {
					className: "size-10",
					strokeWidth: 2
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-lg font-semibold",
				children: "Something went wrong"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "max-w-md text-sm break-words text-zinc-500 dark:text-zinc-400",
				children: errorMessage(error)
			})
		]
	});
}
/**
* App-wide client provider mounted once near the root (in `src/routes/__root.tsx`):
*
*   <AuthProvider><Outlet /></AuthProvider>
*
* Better Auth's React client (`@/lib/auth/client`) needs NO context provider —
* its `useSession()` works standalone — so this is a passthrough today. It's
* kept as the single, stable mount point for any future client-side providers
* (e.g. a toast or theme provider) without churning the root shell.
*/
function AuthProvider({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children });
}
var CONNECTOR_TOKEN_READY_EVENT = "grok:connector-token-ready";
function isGrokEmbedderOrigin(origin) {
	try {
		const url = new URL(origin);
		if (url.protocol !== "https:" && url.protocol !== "http:") return false;
		const host = url.hostname.toLowerCase();
		if (host === "grok.com" || host.endsWith(".grok.com")) return true;
		if (host === "localhost" || host === "127.0.0.1" || host === "[::1]") return true;
		return false;
	} catch {
		return false;
	}
}
function isSandboxPreviewGuestHost(hostname) {
	const host = hostname.toLowerCase();
	return host === "grok-sandbox.com" || host.endsWith(".grok-sandbox.com");
}
function isRemintPreviewPair(guestHost, parentHost) {
	const guest = guestHost.toLowerCase();
	const parent = parentHost.toLowerCase();
	const i = guest.indexOf(".preview.");
	if (i <= 0) return false;
	const label = guest.slice(0, i);
	const rest = guest.slice(i + 9);
	if (label.includes(".") || !rest.includes(".")) return false;
	return parent === rest || parent === `grok.${rest}`;
}
function resolveParentEmbedderOrigin(parentIsSelf, referrer, ancestorOrigin, guestHostname = "") {
	if (parentIsSelf) return null;
	for (const candidate of [referrer, ancestorOrigin ?? ""].filter(Boolean)) try {
		const url = new URL(candidate.includes("://") ? candidate : `https://${candidate}`);
		if (url.protocol !== "https:" && url.protocol !== "http:") continue;
		if (isGrokEmbedderOrigin(url.origin)) return url.origin;
		if (isSandboxPreviewGuestHost(guestHostname) || isRemintPreviewPair(guestHostname, url.hostname)) return url.origin;
	} catch {}
	return null;
}
/**
* Guest side of the grok-web ↔ sandbox preview postMessage bridge.
*
* Activates only when this page is framed by an allowlisted Grok embedder.
* Top-level runs (download/export, local `npm run dev`, deployed sites) noop.
*/
var PREVIEW_BRIDGE_CHANNEL = "grok-preview-bridge";
var EnvelopeSchema = object({
	channel: literal(PREVIEW_BRIDGE_CHANNEL),
	version: number().int().positive(),
	type: string().min(1)
});
var HelloSchema = EnvelopeSchema.extend({ type: literal("hello") });
var NavigateSchema = EnvelopeSchema.extend({
	type: literal("navigate"),
	path: string().min(1)
});
var HistorySchema = EnvelopeSchema.extend({
	type: literal("history"),
	delta: union([literal(-1), literal(1)])
});
var ConnectorTokenReadySchema = EnvelopeSchema.extend({ type: literal("connector-token-ready") });
function isSafeBridgePath(path) {
	if (!path.startsWith("/") || path.startsWith("//") || path.includes("\\")) return false;
	try {
		return new URL(path, "https://preview.invalid").origin === "https://preview.invalid";
	} catch {
		return false;
	}
}
/**
* Origin of the Grok embedder framing this page, or null when the page runs
* top-level (download/export, local `npm run dev`, deployed sites) or under a
* non-Grok parent. Client-only; null during SSR.
*/
function resolveCurrentEmbedderOrigin() {
	if (typeof window === "undefined") return null;
	const ancestorOrigin = typeof location.ancestorOrigins !== "undefined" && location.ancestorOrigins.length > 0 ? location.ancestorOrigins[0] : null;
	return resolveParentEmbedderOrigin(window.parent === window, document.referrer, ancestorOrigin, window.location.hostname);
}
/**
* Install host↔guest messaging. Returns a dispose function.
* Noops (returns a no-op dispose) when not embedded under a Grok parent.
*/
function installPreviewHostBridge(options = {}) {
	const parentOrigin = resolveCurrentEmbedderOrigin();
	if (parentOrigin === null) return () => {};
	const ROOT_STATE_KEY = "__grokPreviewBridgeRoot";
	const originalPushState = window.history.pushState.bind(window.history);
	const originalReplaceState = window.history.replaceState.bind(window.history);
	const isAtHistoryRoot = () => {
		const state = window.history.state;
		return Boolean(state && typeof state === "object" && state[ROOT_STATE_KEY] === true);
	};
	try {
		const current = window.history.state;
		if (!(current !== null && typeof current === "object" && Object.prototype.hasOwnProperty.call(current, ROOT_STATE_KEY))) {
			const isRoot = window.history.length <= 1;
			originalReplaceState(current && typeof current === "object" ? {
				...current,
				[ROOT_STATE_KEY]: isRoot
			} : { [ROOT_STATE_KEY]: isRoot }, "", window.location.href);
		}
	} catch {}
	const post = (message) => {
		window.parent.postMessage(message, parentOrigin);
	};
	const reportLocation = () => {
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "location",
			path: window.location.pathname || "/",
			search: window.location.search,
			hash: window.location.hash
		});
	};
	const reportRoutes = () => {
		const paths = options.getRoutePaths?.() ?? [];
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "routes",
			paths
		});
	};
	const defaultNavigate = (path) => {
		if (!isSafeBridgePath(path)) return;
		try {
			const url = new URL(path, window.location.origin);
			if (url.origin !== window.location.origin) return;
			const next = `${url.pathname}${url.search}${url.hash}`;
			window.history.pushState(window.history.state, "", next);
			window.dispatchEvent(new PopStateEvent("popstate", { state: window.history.state }));
		} catch {}
	};
	const navigate = (path) => {
		if (!isSafeBridgePath(path)) return;
		if (options.navigate) {
			options.navigate(path);
			return;
		}
		defaultNavigate(path);
	};
	const announce = () => {
		reportLocation();
		reportRoutes();
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "ready"
		});
	};
	const onHello = (data) => {
		if (!HelloSchema.safeParse(data).success) return;
		announce();
	};
	const onNavigate = (data) => {
		const parsed = NavigateSchema.safeParse(data);
		if (!parsed.success) return;
		navigate(parsed.data.path);
		queueMicrotask(reportLocation);
	};
	const onHistory = (data) => {
		const parsed = HistorySchema.safeParse(data);
		if (!parsed.success) return;
		if (parsed.data.delta === -1 && isAtHistoryRoot()) return;
		window.history.go(parsed.data.delta);
	};
	const onConnectorTokenReady = (data) => {
		if (!ConnectorTokenReadySchema.safeParse(data).success) return;
		window.dispatchEvent(new Event(CONNECTOR_TOKEN_READY_EVENT));
	};
	const hostMessageHandlers = /* @__PURE__ */ new Map([
		["hello", onHello],
		["navigate", onNavigate],
		["history", onHistory],
		["connector-token-ready", onConnectorTokenReady]
	]);
	const onMessage = (event) => {
		if (event.source !== window.parent) return;
		if (event.origin !== parentOrigin) return;
		const envelope = EnvelopeSchema.safeParse(event.data);
		if (!envelope.success || envelope.data.version !== 1) return;
		hostMessageHandlers.get(envelope.data.type)?.(event.data);
	};
	const onPopState = () => {
		reportLocation();
	};
	const onHashChange = () => {
		reportLocation();
	};
	window.history.pushState = (data, unused, url) => {
		const next = data && typeof data === "object" ? {
			...data,
			[ROOT_STATE_KEY]: false
		} : data;
		originalPushState(next, unused, url);
		reportLocation();
	};
	window.history.replaceState = (data, unused, url) => {
		const next = isAtHistoryRoot() ? {
			...data && typeof data === "object" ? data : {},
			[ROOT_STATE_KEY]: true
		} : data;
		originalReplaceState(next, unused, url);
		reportLocation();
	};
	window.addEventListener("message", onMessage);
	window.addEventListener("popstate", onPopState);
	window.addEventListener("hashchange", onHashChange);
	announce();
	return () => {
		window.removeEventListener("message", onMessage);
		window.removeEventListener("popstate", onPopState);
		window.removeEventListener("hashchange", onHashChange);
		window.history.pushState = originalPushState;
		window.history.replaceState = originalReplaceState;
	};
}
/** Collect static path patterns from a TanStack route tree (best-effort). */
function collectRoutePathsFromTree(routeTree) {
	const paths = /* @__PURE__ */ new Set();
	const walk = (node) => {
		if (!node || typeof node !== "object") return;
		const record = node;
		const full = typeof record.fullPath === "string" ? record.fullPath : typeof record.path === "string" ? record.path : null;
		if (full !== null && full !== "") paths.add(full.startsWith("/") ? full : `/${full}`);
		else if (full === "") paths.add("/");
		const children = record.children;
		if (Array.isArray(children)) for (const child of children) walk(child);
		else if (children && typeof children === "object") for (const child of Object.values(children)) walk(child);
	};
	walk(routeTree);
	return [...paths];
}
/**
* Mount once in `__root.tsx` so the Grok preview chrome can drive navigation
* (and later receive registered routes). Noops when the app is not embedded.
*/
function PreviewHostBridge() {
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		return installPreviewHostBridge({
			navigate: (path) => {
				router.history.push(path);
			},
			getRoutePaths: () => collectRoutePathsFromTree(router.routeTree)
		});
	}, [router]);
	return null;
}
function shopsFor(state) {
	return [
		`${state} State Cooperative Marketing Federation`,
		"IFFCO / KRIBHCO cooperative counter",
		"Licensed agri-input dealer at your mandi",
		`Krishi Vigyan Kendra (KVK), ${state}`
	];
}
function rec(id, name, purpose, doseKg, bagSizeKg, bagCostInr, shops, notes) {
	return {
		id,
		name,
		purpose,
		doseKg,
		bagSizeKg,
		bagCostInr,
		dosePerAcre: `${doseKg} kg / acre`,
		shops,
		notes
	};
}
function statusN(n) {
	if (n < 280) return "deficient";
	if (n > 560) return "excess";
	return "opt";
}
function statusP(p) {
	if (p < 25) return "deficient";
	if (p > 50) return "excess";
	return "opt";
}
function statusK(k) {
	if (k < 140) return "deficient";
	if (k > 280) return "excess";
	return "opt";
}
function statusOC(oc) {
	if (oc < .5) return "deficient";
	if (oc > .75) return "opt";
	return "opt";
}
function statusZn(zn) {
	if (zn < .6) return "deficient";
	return "opt";
}
function statusFe(fe) {
	if (fe < 4.5) return "deficient";
	return "opt";
}
function statusMn(mn) {
	if (mn < 2) return "deficient";
	return "opt";
}
function statusCu(cu) {
	if (cu < .2) return "deficient";
	return "opt";
}
function statusB(b) {
	if (b < .5) return "deficient";
	return "opt";
}
function planFertilizers(soil, state) {
	const shops = shopsFor(state);
	const out = [];
	if (soil.pH < 6) out.push(rec("lime", "Agricultural lime (CaCO₃)", "Raise acidic pH toward 6.5 so phosphorus unlocks.", 200, 50, 220, shops, "Broadcast 3–4 weeks before sowing. Do not mix with urea in the same hopper."));
	if (soil.pH > 8.2) out.push(rec("gypsum", "Gypsum (CaSO₄)", "Ease alkaline / sodic soil and add sulphur.", 200, 50, 260, shops, "Irrigate after application. Helps groundnut, cotton and pulses on black soil."));
	if (statusN(soil.N) === "deficient") out.push(rec("urea", "Urea 46-0-0", "Nitrogen is low. Split dose: half at sowing, half at 25–30 days.", 50, 45, 266, shops, "Subsidised bag. Keep dry. Never place against seed."));
	if (statusP(soil.P) === "deficient") out.push(rec("dap", "DAP 18-46-0", "Phosphorus is low. Place below the seed at sowing.", 50, 50, 1350, shops, "One bag / acre covers most rabi cereals on low-P plots."));
	if (statusK(soil.K) === "deficient") out.push(rec("mop", "MOP (muriate of potash) 0-0-60", "Potassium is low. Needed for grain fill and drought tolerance.", 25, 50, 900, shops));
	if (soil.S < 10) out.push(rec("bentonite-s", "Bentonite sulphur 90%", "Sulphur is low — oilseeds and pulses respond fast.", 8, 10, 280, shops));
	if (statusZn(soil.Zn) === "deficient") out.push(rec("znso4", "Zinc sulphate 21%", "Zinc is low (khaira risk in paddy, white bud in maize).", 10, 10, 480, shops, "Once in two years is enough on most soils. Foliar 0.5% if the crop is already in."));
	if ((soil.Fe ?? 99) < 4.5) out.push(rec("feso4", "Ferrous sulphate 19%", "Iron is low. Common on alkaline black soils — new leaves stay pale.", 10, 10, 180, shops, "Soil application at sowing, or 0.5% foliar with citric acid if the crop is up."));
	if ((soil.Mn ?? 99) < 2) out.push(rec("mnso4", "Manganese sulphate 30%", "Manganese is low. Interveinal yellowing on young leaves.", 10, 10, 220, shops, "Do not mix in the same tank as lime."));
	if ((soil.Cu ?? 99) < .2) out.push(rec("cuso4", "Copper sulphate 24%", "Copper is low. Rare, but wheat and onion on sandy plots respond.", 5, 5, 320, shops));
	if ((soil.B ?? 99) < .5) out.push(rec("borax", "Borax (disodium tetraborate) 10.5% B", "Boron is low. Cauliflower browning, hollow stem, poor pod set.", 4, 5, 160, shops, "A little goes a long way. Do not exceed the dose — boron toxicity is hard to undo."));
	if (statusOC(soil.OC) === "deficient") out.push(rec("fym", "Farmyard manure / vermicompost", "Organic carbon is thin. Rebuild the sponge before chasing bags.", 2e3, 50, 400, [`Local gaushala / compost unit, ${state}`, "DeHaat / BigHaat vermicompost"], "4 trolley FYM or 8 bags vermicompost per acre. Best in the month before sowing."));
	if (out.length === 0) out.push(rec("maintain", "Maintenance NPK (12-32-16)", "Soil is in range. A starter dose at sowing is enough.", 40, 50, 1450, shops));
	return out;
}
function sampleMaharashtraSoil() {
	return {
		pH: 7.8,
		EC: .32,
		OC: .41,
		N: 186,
		P: 12,
		K: 210,
		S: 8,
		Zn: .38,
		Fe: 4.2,
		Mn: 3.1,
		Cu: .42,
		B: .28,
		texture: "black",
		lab: "Soil Testing Lab, Nagpur",
		source: "sample"
	};
}
function costForFarm(rec, acres) {
	const bags = Math.ceil(rec.doseKg * acres / rec.bagSizeKg);
	return {
		bags,
		total: bags * rec.bagCostInr
	};
}
var STATES = [
	"Andhra Pradesh",
	"Assam",
	"Bihar",
	"Chhattisgarh",
	"Gujarat",
	"Haryana",
	"Himachal Pradesh",
	"Jharkhand",
	"Karnataka",
	"Kerala",
	"Madhya Pradesh",
	"Maharashtra",
	"Odisha",
	"Punjab",
	"Rajasthan",
	"Tamil Nadu",
	"Telangana",
	"Uttar Pradesh",
	"Uttarakhand",
	"West Bengal"
];
var ALL = [...STATES];
var CROPS = [
	{
		id: "wheat",
		photo: "/photos/wheat.jpg",
		names: {
			en: "Wheat",
			hi: "गेहूँ",
			bn: "গম",
			ta: "கோதுமை",
			te: "గోధుమ",
			mr: "गहू",
			gu: "ઘઉં",
			kn: "ಗೋಧಿ",
			ml: "ഗോതമ്പ്",
			pa: "ਕਣਕ",
			ur: "گندم",
			or: "ଗହମ",
			as: "ঘেঁহু"
		},
		seasons: ["rabi"],
		soils: [
			"loam",
			"clay",
			"silt",
			"black"
		],
		days: 120,
		wantsIrrigation: true,
		costPerAcre: 26800,
		yieldQtlIrr: 18,
		yieldQtlRain: 11,
		lastSeasonPrice: 2275,
		harvestPrice: 2450,
		states: [
			"Punjab",
			"Haryana",
			"Uttar Pradesh",
			"Madhya Pradesh",
			"Rajasthan",
			"Bihar",
			"Gujarat",
			"Maharashtra"
		],
		pHMin: 6,
		pHMax: 7.8,
		why: "Rabi staple with a firm MSP floor. Harvest lands in March–April when mills restock.",
		risks: "Late heat in March can shrink grain. Keep the last irrigation timed, not skipped."
	},
	{
		id: "mustard",
		photo: "/photos/mustard.jpg",
		names: {
			en: "Mustard",
			hi: "सरसों",
			bn: "সরিষা",
			ta: "கடுகு",
			te: "ఆవాలు",
			mr: "मोहरी",
			gu: "સરસવ",
			kn: "ಸಾಸಿವೆ",
			ml: "കടുക്",
			pa: "ਸਰੋਂ",
			ur: "سرسوں",
			or: "ସୋରିଷ"
		},
		seasons: ["rabi"],
		soils: [
			"sandy",
			"loam",
			"silt"
		],
		days: 110,
		wantsIrrigation: false,
		costPerAcre: 18200,
		yieldQtlIrr: 8.5,
		yieldQtlRain: 7,
		lastSeasonPrice: 5450,
		harvestPrice: 5850,
		states: [
			"Rajasthan",
			"Haryana",
			"Madhya Pradesh",
			"Uttar Pradesh",
			"Gujarat",
			"West Bengal",
			"Assam"
		],
		pHMin: 6,
		pHMax: 8,
		why: "Oilseed with a thin cost base. Works on residual moisture after kharif.",
		risks: "Aphids in January. One early spray beats a late rescue."
	},
	{
		id: "potato",
		photo: "/photos/potato.jpg",
		names: {
			en: "Potato",
			hi: "आलू",
			bn: "আলু",
			ta: "உருளைக்கிழங்கு",
			te: "బంగాళదుంప",
			mr: "बटाटा",
			gu: "બટાકા",
			kn: "ಆಲೂಗಡ್ಡೆ",
			ml: "ഉരുളക്കിഴങ്ങ്",
			pa: "ਆਲੂ",
			ur: "آلو",
			or: "ଆଳୁ"
		},
		seasons: ["rabi"],
		soils: [
			"sandy",
			"loam",
			"silt"
		],
		days: 90,
		wantsIrrigation: true,
		costPerAcre: 42e3,
		yieldQtlIrr: 90,
		yieldQtlRain: 45,
		lastSeasonPrice: 980,
		harvestPrice: 1120,
		states: [
			"Uttar Pradesh",
			"West Bengal",
			"Bihar",
			"Punjab",
			"Gujarat",
			"Madhya Pradesh",
			"Assam"
		],
		pHMin: 5.2,
		pHMax: 6.8,
		why: "Fast cash crop. Cold-store demand lifts January–February prices.",
		risks: "Late blight in fog. Seed cost is high — buy certified, not mandi leftovers."
	},
	{
		id: "gram",
		photo: "/photos/mustard.jpg",
		names: {
			en: "Gram (chana)",
			hi: "चना",
			bn: "ছোলা",
			ta: "கொண்டைக்கடலை",
			te: "శనగలు",
			mr: "हरभरा",
			gu: "ચણા",
			kn: "ಕಡಲೆ",
			ml: "കടല",
			pa: "ਛੋਲੇ",
			ur: "چنا",
			or: "ବୁଟ"
		},
		seasons: ["rabi"],
		soils: [
			"black",
			"clay",
			"loam"
		],
		days: 115,
		wantsIrrigation: false,
		costPerAcre: 16400,
		yieldQtlIrr: 8,
		yieldQtlRain: 6.5,
		lastSeasonPrice: 5400,
		harvestPrice: 5750,
		states: [
			"Madhya Pradesh",
			"Maharashtra",
			"Rajasthan",
			"Uttar Pradesh",
			"Karnataka",
			"Andhra Pradesh"
		],
		pHMin: 6,
		pHMax: 8.2,
		why: "Pulse that feeds the soil (nitrogen fix). Low water, solid mill demand.",
		risks: "Wilt on poorly drained black soil. Avoid low patches."
	},
	{
		id: "paddy",
		photo: "/photos/paddy.jpg",
		names: {
			en: "Paddy",
			hi: "धान",
			bn: "ধান",
			ta: "நெல்",
			te: "వరి",
			mr: "भात",
			gu: "ડાંગર",
			kn: "ಭತ್ತ",
			ml: "നെല്ല്",
			pa: "ਝੋਨਾ",
			ur: "دھان",
			or: "ଧାନ",
			as: "ধান"
		},
		seasons: ["kharif"],
		soils: [
			"clay",
			"loam",
			"silt"
		],
		days: 125,
		wantsIrrigation: true,
		costPerAcre: 31200,
		yieldQtlIrr: 22,
		yieldQtlRain: 14,
		lastSeasonPrice: 2183,
		harvestPrice: 2320,
		states: ALL,
		pHMin: 5.5,
		pHMax: 7.5,
		why: "Procurement is the floor. Works wherever standing water is reliable.",
		risks: "Stem borer and blast in humid pockets. Don’t flood after panicle initiation."
	},
	{
		id: "soybean",
		photo: "/photos/soybean.jpg",
		names: {
			en: "Soybean",
			hi: "सोयाबीन",
			bn: "সয়াবিন",
			ta: "சோயா",
			te: "సోయాబీన్",
			mr: "सोयाबीन",
			gu: "સોયાબીન",
			kn: "ಸೋಯಾಬೀನ್",
			ml: "സോയാബീൻ",
			pa: "ਸੋਇਆਬੀਨ",
			ur: "سویابین",
			or: "ସୋୟାବିନ୍"
		},
		seasons: ["kharif"],
		soils: [
			"black",
			"clay",
			"loam"
		],
		days: 100,
		wantsIrrigation: false,
		costPerAcre: 19800,
		yieldQtlIrr: 10,
		yieldQtlRain: 8,
		lastSeasonPrice: 4300,
		harvestPrice: 4680,
		states: [
			"Madhya Pradesh",
			"Maharashtra",
			"Rajasthan",
			"Karnataka",
			"Telangana"
		],
		pHMin: 6,
		pHMax: 7.5,
		why: "Oil mill crush keeps a bid under the crop. Suits black cotton soil.",
		risks: "Yellow mosaic if seed is uncertified. Drain water within 48 hours of a heavy rain."
	},
	{
		id: "cotton",
		photo: "/photos/cotton.jpg",
		names: {
			en: "Cotton",
			hi: "कपास",
			bn: "তুলা",
			ta: "பருத்தி",
			te: "పత్తి",
			mr: "कापूस",
			gu: "કપાસ",
			kn: "ಹತ್ತಿ",
			ml: "പരുത്തി",
			pa: "ਕਪਾਹ",
			ur: "کپاس",
			or: "ତୁଳା"
		},
		seasons: ["kharif"],
		soils: [
			"black",
			"sandy",
			"loam"
		],
		days: 165,
		wantsIrrigation: false,
		costPerAcre: 35500,
		yieldQtlIrr: 12,
		yieldQtlRain: 8,
		lastSeasonPrice: 6800,
		harvestPrice: 7200,
		states: [
			"Maharashtra",
			"Gujarat",
			"Telangana",
			"Andhra Pradesh",
			"Rajasthan",
			"Haryana",
			"Punjab",
			"Karnataka"
		],
		pHMin: 6,
		pHMax: 8,
		why: "Long cash cycle but gin prices have held. Pink bollworm is the tax on inattention.",
		risks: "Input bill is heavy. Skip if credit is already stretched."
	},
	{
		id: "maize",
		photo: "/photos/maize.jpg",
		names: {
			en: "Maize",
			hi: "मक्का",
			bn: "ভুট্টা",
			ta: "சோளம்",
			te: "మొక్కజొన్న",
			mr: "मका",
			gu: "મકાઈ",
			kn: "ಜೋಳ",
			ml: "ചോളം",
			pa: "ਮੱਕੀ",
			ur: "مکئی",
			or: "ମକା"
		},
		seasons: [
			"kharif",
			"rabi",
			"zaid"
		],
		soils: [
			"loam",
			"sandy",
			"silt"
		],
		days: 95,
		wantsIrrigation: true,
		costPerAcre: 22400,
		yieldQtlIrr: 28,
		yieldQtlRain: 16,
		lastSeasonPrice: 2090,
		harvestPrice: 2250,
		states: ALL,
		pHMin: 5.5,
		pHMax: 7.5,
		why: "Feed mills buy year-round. Fits as a bridge crop between seasons.",
		risks: "Fall armyworm. Scout weekly from week three."
	},
	{
		id: "sugarcane",
		photo: "/photos/sugarcane.jpg",
		names: {
			en: "Sugarcane",
			hi: "गन्ना",
			bn: "আখ",
			ta: "கரும்பு",
			te: "చెరకు",
			mr: "ऊस",
			gu: "શેરડી",
			kn: "ಕಬ್ಬು",
			ml: "കരിമ്പ്",
			pa: "ਗੰਨਾ",
			ur: "گنا",
			or: "ଆଖୁ"
		},
		seasons: ["kharif", "rabi"],
		soils: [
			"loam",
			"clay",
			"black"
		],
		days: 330,
		wantsIrrigation: true,
		costPerAcre: 72e3,
		yieldQtlIrr: 320,
		yieldQtlRain: 160,
		lastSeasonPrice: 340,
		harvestPrice: 355,
		states: [
			"Uttar Pradesh",
			"Maharashtra",
			"Karnataka",
			"Tamil Nadu",
			"Gujarat",
			"Andhra Pradesh",
			"Bihar"
		],
		pHMin: 6.5,
		pHMax: 7.5,
		why: "Mill FRP is notified. Only plant if a crushing mill is within haul.",
		risks: "Locks the field for a year. Water hungry."
	},
	{
		id: "onion",
		photo: "/photos/onion.jpg",
		names: {
			en: "Onion",
			hi: "प्याज",
			bn: "পেঁয়াজ",
			ta: "வெங்காயம்",
			te: "ఉల్లి",
			mr: "कांदा",
			gu: "ડુંગળી",
			kn: "ಈರುಳ್ಳಿ",
			ml: "സവാള",
			pa: "ਪਿਆਜ਼",
			ur: "پیاز",
			or: "ପିଆଜ"
		},
		seasons: ["rabi", "kharif"],
		soils: [
			"loam",
			"black",
			"silt"
		],
		days: 120,
		wantsIrrigation: true,
		costPerAcre: 38500,
		yieldQtlIrr: 80,
		yieldQtlRain: 40,
		lastSeasonPrice: 1650,
		harvestPrice: 2100,
		states: [
			"Maharashtra",
			"Karnataka",
			"Madhya Pradesh",
			"Gujarat",
			"Rajasthan",
			"Andhra Pradesh",
			"Bihar"
		],
		pHMin: 6,
		pHMax: 7.5,
		why: "Volatile but Lasalgaon/Pimpalgaon prices usually recover by late rabi harvest.",
		risks: "Storage rot. Don’t chase last year’s spike — size the acreage modestly."
	},
	{
		id: "tomato",
		photo: "/photos/tomato.jpg",
		names: {
			en: "Tomato",
			hi: "टमाटर",
			bn: "টমেটো",
			ta: "தக்காளி",
			te: "టమోటా",
			mr: "टोमॅटो",
			gu: "ટમેટા",
			kn: "ಟೊಮೆಟೊ",
			ml: "തക്കാളി",
			pa: "ਟਮਾਟਰ",
			ur: "ٹماٹر",
			or: "ଟମାଟୋ"
		},
		seasons: ["rabi", "zaid"],
		soils: [
			"loam",
			"silt",
			"sandy"
		],
		days: 80,
		wantsIrrigation: true,
		costPerAcre: 44800,
		yieldQtlIrr: 120,
		yieldQtlRain: 50,
		lastSeasonPrice: 1200,
		harvestPrice: 1600,
		states: ALL,
		pHMin: 6,
		pHMax: 7,
		why: "Short cycle. Stagger planting so you miss the glut week.",
		risks: "Price can collapse overnight. Sell in lots, not all at once."
	}
];
function cropName(crop, lang) {
	return crop.names[lang] ?? crop.names.en;
}
function currentSeason(d = /* @__PURE__ */ new Date()) {
	const m = d.getMonth() + 1;
	if (m >= 6 && m <= 10) return "kharif";
	if (m >= 3 && m <= 5) return "zaid";
	return "rabi";
}
function harvestDate(days, from = /* @__PURE__ */ new Date()) {
	const d = new Date(from);
	d.setDate(d.getDate() + days);
	return d.toLocaleDateString("en-IN", {
		month: "short",
		year: "numeric"
	});
}
function recommendCrops(input) {
	const fertCost = (input.soil ? planFertilizers(input.soil, input.state) : []).reduce((s, f) => s + Math.ceil(f.doseKg / f.bagSizeKg) * f.bagCostInr, 0);
	return CROPS.filter((c) => c.seasons.includes(input.season)).map((c) => {
		let fit = .55;
		const reasons = [];
		if (c.soils.includes(input.soilType)) {
			fit += .18;
			reasons.push("Matches your soil texture");
		} else {
			fit -= .12;
			reasons.push("Soil is not ideal — still workable with care");
		}
		if (c.states.includes(input.state)) {
			fit += .12;
			reasons.push(`Grown widely in ${input.state}`);
		}
		if (input.soil) {
			if (input.soil.pH >= c.pHMin && input.soil.pH <= c.pHMax) {
				fit += .1;
				reasons.push(`pH ${input.soil.pH.toFixed(1)} sits in this crop’s range`);
			} else {
				fit -= .08;
				reasons.push("pH is off — lime or gypsum is in the fertilizer plan");
			}
		}
		const yieldQtl = input.irrigated || !c.wantsIrrigation ? c.yieldQtlIrr : c.yieldQtlRain;
		if (!input.irrigated && c.wantsIrrigation) {
			fit -= .1;
			reasons.push("Yield cut for rainfed water");
		}
		const extraFert = input.soil ? fertCost : 0;
		const profit = Math.round(yieldQtl * c.harvestPrice - c.costPerAcre - extraFert);
		fit += Math.max(0, Math.min(.15, profit / 8e4));
		return {
			...c,
			profitPerAcre: profit,
			yieldQtl,
			fertilizerCost: extraFert,
			harvestDateLabel: harvestDate(c.days),
			fitScore: Math.max(.15, Math.min(1, fit)),
			reasons
		};
	}).sort((a, b) => b.profitPerAcre - a.profitPerAcre);
}
var LOCALE = {
	en: "en-IN",
	hi: "hi-IN",
	bn: "bn-IN",
	ta: "ta-IN",
	te: "te-IN",
	mr: "mr-IN",
	gu: "gu-IN",
	kn: "kn-IN",
	ml: "ml-IN",
	pa: "pa-IN",
	ur: "ur-IN",
	or: "or-IN",
	as: "as-IN",
	ne: "ne-NP"
};
function inr(n, lang = "en") {
	return new Intl.NumberFormat(LOCALE[lang] ?? "en-IN", {
		style: "currency",
		currency: "INR",
		maximumFractionDigits: 0
	}).format(Math.round(n));
}
function shortDate(iso, lang = "en") {
	return new Date(iso).toLocaleDateString(LOCALE[lang] ?? "en-IN", {
		day: "numeric",
		month: "short",
		year: "numeric"
	});
}
function uid(prefix = "id") {
	return `${prefix}-${Math.random().toString(36).slice(2, 9)}`;
}
async function fileToJpegDataUrl(file, max = 1280, quality = .72) {
	const bitmap = await createImageBitmap(file);
	const scale = Math.min(1, max / Math.max(bitmap.width, bitmap.height));
	const canvas = document.createElement("canvas");
	canvas.width = Math.round(bitmap.width * scale);
	canvas.height = Math.round(bitmap.height * scale);
	const ctx = canvas.getContext("2d");
	if (!ctx) throw new Error("Canvas unavailable");
	ctx.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
	return canvas.toDataURL("image/jpeg", quality);
}
function greetingKey(d = /* @__PURE__ */ new Date()) {
	const h = d.getHours();
	if (h < 12) return "greetMorn";
	if (h < 17) return "greetAft";
	return "greetEve";
}
function seedJobs() {
	const now = (/* @__PURE__ */ new Date()).toISOString();
	return [
		{
			id: "job-seed-1",
			cropId: "onion",
			qtyQtl: 24,
			pickup: "Saoner, Nagpur",
			drop: "Kalamna Mandi, Nagpur",
			km: 38,
			payInr: 920,
			status: "open",
			createdAt: now,
			updatedAt: now
		},
		{
			id: "job-seed-2",
			cropId: "tomato",
			qtyQtl: 12,
			pickup: "Katol",
			drop: "Sitabuldi market",
			km: 52,
			payInr: 1180,
			status: "open",
			createdAt: now,
			updatedAt: now
		},
		{
			id: "job-seed-3",
			cropId: "wheat",
			qtyQtl: 40,
			pickup: "Hingna",
			drop: "Kalambha mill gate",
			km: 22,
			payInr: 640,
			status: "open",
			createdAt: now,
			updatedAt: now
		}
	];
}
function seedListings() {
	const now = (/* @__PURE__ */ new Date()).toISOString();
	return [
		{
			id: "lot-1",
			farmerName: "Savita Patil",
			village: "Saoner",
			state: "Maharashtra",
			cropId: "onion",
			qtyQtl: 24,
			pricePerQtl: 1850,
			grade: "A",
			notes: "Nashik red, cured 8 days.",
			needDelivery: true,
			createdAt: now,
			harvestDate: now
		},
		{
			id: "lot-2",
			farmerName: "Harpreet Singh",
			village: "Khanna",
			state: "Punjab",
			cropId: "wheat",
			qtyQtl: 80,
			pricePerQtl: 2420,
			grade: "FAQ",
			notes: "HD-3086, moisture 11%.",
			needDelivery: false,
			createdAt: now,
			harvestDate: now
		},
		{
			id: "lot-3",
			farmerName: "Lakshmi Reddy",
			village: "Guntur",
			state: "Andhra Pradesh",
			cropId: "tomato",
			qtyQtl: 18,
			pricePerQtl: 1400,
			grade: "A",
			notes: "Picked this morning.",
			needDelivery: true,
			createdAt: now,
			harvestDate: now
		}
	];
}
var useApp = create()(persist((set, get) => ({
	hydrated: false,
	lang: "en",
	role: null,
	onboarded: false,
	name: "",
	village: "",
	state: "Maharashtra",
	acres: 4,
	soilType: "black",
	irrigated: true,
	season: currentSeason(),
	soilTests: [],
	diagnoses: [],
	listings: seedListings(),
	jobs: seedJobs(),
	setHydrated: (v) => set({ hydrated: v }),
	setLang: (lang) => set({ lang }),
	setRole: (role) => set({ role }),
	completeOnboarding: (role) => set({
		role,
		onboarded: true
	}),
	updateProfile: (p) => set(p),
	addSoilTest: (t) => set({ soilTests: [t, ...get().soilTests] }),
	addDiagnosis: (d) => set({ diagnoses: [d, ...get().diagnoses] }),
	addListing: (l) => {
		const listing = {
			...l,
			id: uid("lot"),
			createdAt: (/* @__PURE__ */ new Date()).toISOString()
		};
		const jobs = [...get().jobs];
		if (listing.needDelivery) {
			const km = 18 + Math.round(Math.random() * 40);
			jobs.unshift({
				id: uid("job"),
				listingId: listing.id,
				cropId: listing.cropId,
				qtyQtl: listing.qtyQtl,
				pickup: `${listing.village}, ${listing.state}`,
				drop: `Nearest mandi, ${listing.state}`,
				km,
				payInr: 280 + km * 16,
				status: "open",
				createdAt: listing.createdAt,
				updatedAt: listing.createdAt
			});
		}
		set({
			listings: [listing, ...get().listings],
			jobs
		});
	},
	seedMarket: () => {
		if (get().listings.length === 0) set({
			listings: seedListings(),
			jobs: seedJobs()
		});
	},
	acceptJob: (id) => set({ jobs: get().jobs.map((j) => j.id === id ? {
		...j,
		status: "accepted",
		updatedAt: (/* @__PURE__ */ new Date()).toISOString()
	} : j) }),
	advanceJob: (id) => set({ jobs: get().jobs.map((j) => {
		if (j.id !== id) return j;
		const next = j.status === "accepted" ? "picked" : j.status === "picked" ? "delivered" : j.status;
		return {
			...j,
			status: next,
			updatedAt: (/* @__PURE__ */ new Date()).toISOString()
		};
	}) }),
	resetRole: () => set({
		role: null,
		onboarded: false
	})
}), {
	name: "khetsaathi-v1",
	storage: createJSONStorage(() => localStorage),
	skipHydration: true,
	partialize: (s) => ({
		lang: s.lang,
		role: s.role,
		onboarded: s.onboarded,
		name: s.name,
		village: s.village,
		state: s.state,
		acres: s.acres,
		soilType: s.soilType,
		irrigated: s.irrigated,
		season: s.season,
		soilTests: s.soilTests,
		diagnoses: s.diagnoses,
		listings: s.listings,
		jobs: s.jobs
	}),
	onRehydrateStorage: () => () => {
		useApp.setState({ hydrated: true });
	}
}));
var LANGUAGES = [
	{
		code: "en",
		name: "English",
		native: "English",
		dir: "ltr"
	},
	{
		code: "as",
		name: "Assamese",
		native: "অসমীয়া",
		dir: "ltr"
	},
	{
		code: "bn",
		name: "Bengali",
		native: "বাংলা",
		dir: "ltr"
	},
	{
		code: "brx",
		name: "Bodo",
		native: "बर'",
		dir: "ltr"
	},
	{
		code: "doi",
		name: "Dogri",
		native: "डोगरी",
		dir: "ltr"
	},
	{
		code: "gu",
		name: "Gujarati",
		native: "ગુજરાતી",
		dir: "ltr"
	},
	{
		code: "hi",
		name: "Hindi",
		native: "हिन्दी",
		dir: "ltr"
	},
	{
		code: "kn",
		name: "Kannada",
		native: "ಕನ್ನಡ",
		dir: "ltr"
	},
	{
		code: "ks",
		name: "Kashmiri",
		native: "کٲشُر",
		dir: "rtl"
	},
	{
		code: "kok",
		name: "Konkani",
		native: "कोंकणी",
		dir: "ltr"
	},
	{
		code: "mai",
		name: "Maithili",
		native: "मैथिली",
		dir: "ltr"
	},
	{
		code: "ml",
		name: "Malayalam",
		native: "മലയാളം",
		dir: "ltr"
	},
	{
		code: "mni",
		name: "Manipuri",
		native: "ꯃꯤꯇꯩꯂꯣꯟ",
		dir: "ltr"
	},
	{
		code: "mr",
		name: "Marathi",
		native: "मराठी",
		dir: "ltr"
	},
	{
		code: "ne",
		name: "Nepali",
		native: "नेपाली",
		dir: "ltr"
	},
	{
		code: "or",
		name: "Odia",
		native: "ଓଡ଼ିଆ",
		dir: "ltr"
	},
	{
		code: "pa",
		name: "Punjabi",
		native: "ਪੰਜਾਬੀ",
		dir: "ltr"
	},
	{
		code: "sa",
		name: "Sanskrit",
		native: "संस्कृतम्",
		dir: "ltr"
	},
	{
		code: "sat",
		name: "Santali",
		native: "ᱥᱟᱱᱛᱟᱲᱤ",
		dir: "ltr"
	},
	{
		code: "sd",
		name: "Sindhi",
		native: "سنڌي",
		dir: "rtl"
	},
	{
		code: "ta",
		name: "Tamil",
		native: "தமிழ்",
		dir: "ltr"
	},
	{
		code: "te",
		name: "Telugu",
		native: "తెలుగు",
		dir: "ltr"
	},
	{
		code: "ur",
		name: "Urdu",
		native: "اردو",
		dir: "rtl"
	}
];
function langMeta(code) {
	return LANGUAGES.find((l) => l.code === code) ?? LANGUAGES[0];
}
var FONT_HREF = "https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;600;700&family=Outfit:wght@400;500;600;700&family=Noto+Sans:wght@400;500;600&family=Noto+Sans+Devanagari:wght@400;500;600&family=Noto+Sans+Bengali:wght@400;500;600&family=Noto+Sans+Tamil:wght@400;500;600&family=Noto+Sans+Telugu:wght@400;500;600&family=Noto+Sans+Kannada:wght@400;500;600&family=Noto+Sans+Malayalam:wght@400;500;600&family=Noto+Sans+Gujarati:wght@400;500;600&family=Noto+Sans+Gurmukhi:wght@400;500;600&family=Noto+Sans+Oriya:wght@400;500;600&family=Noto+Naskh+Arabic:wght@400;500;700&family=Noto+Sans+Meetei+Mayek:wght@400;500;700&family=Noto+Sans+Ol+Chiki:wght@400;500;700&display=swap";
var styles_default = "/assets/styles-DlFEvKAq.css";
var APP_NAME = "KhetSaathi";
function RootShell() {
	const lang = useApp((s) => s.lang);
	const meta = langMeta(lang);
	(0, import_react.useEffect)(() => {
		useApp.persist.rehydrate();
		const id = window.setTimeout(() => {
			if (!useApp.getState().hydrated) useApp.setState({ hydrated: true });
		}, 600);
		return () => window.clearTimeout(id);
	}, []);
	(0, import_react.useEffect)(() => {
		document.documentElement.lang = lang;
		document.documentElement.dir = meta.dir;
	}, [lang, meta.dir]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang,
		dir: meta.dir,
		suppressHydrationWarning: true,
		className: "antialiased",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", {
			className: "min-h-dvh bg-background text-foreground",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PreviewHostBridge, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AuthProvider, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster, {
					position: "top-center",
					toastOptions: { className: "font-sans !bg-surface !text-foreground !border-border" }
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})
			]
		})]
	});
}
var Route$12 = createRootRoute({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1, viewport-fit=cover"
			},
			{ title: APP_NAME },
			{
				name: "theme-color",
				content: "#2C5A32"
			},
			{
				name: "description",
				content: "Plant today. Profit at harvest. Crop advice, soil cards, leaf scan, and mandi lots."
			}
		],
		links: [
			{
				rel: "icon",
				type: "image/svg+xml",
				href: "/favicon.svg"
			},
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "stylesheet",
				href: FONT_HREF
			},
			{
				rel: "manifest",
				href: "/__grok/manifest.webmanifest"
			},
			{
				rel: "apple-touch-icon",
				href: "/__grok/icon-180.png"
			}
		]
	}),
	component: RootShell
});
var $$splitComponentImporter$11 = () => import("./routes-C-6FaWlm.mjs");
var Route$11 = createFileRoute("/")({ component: lazyRouteComponent($$splitComponentImporter$11, "component") });
var $$splitComponentImporter$10 = () => import("./farmer-CkrYgxH3.mjs");
var Route$10 = createFileRoute("/farmer")({ component: lazyRouteComponent($$splitComponentImporter$10, "component") });
var $$splitComponentImporter$9 = () => import("./partner-GU9oYA5V.mjs");
var Route$9 = createFileRoute("/partner")({ component: lazyRouteComponent($$splitComponentImporter$9, "component") });
var $$splitComponentImporter$8 = () => import("./farmer-BfkqAiTA.mjs");
var Route$8 = createFileRoute("/farmer/")({ component: lazyRouteComponent($$splitComponentImporter$8, "component") });
var $$splitComponentImporter$7 = () => import("./diagnose-1Ni-ZIJM.mjs");
var Route$7 = createFileRoute("/farmer/diagnose")({
	validateSearch: (s) => ({ tab: s.tab === "soil" ? "soil" : "leaf" }),
	component: lazyRouteComponent($$splitComponentImporter$7, "component")
});
var $$splitComponentImporter$6 = () => import("./market-jcmjTqFO.mjs");
var Route$6 = createFileRoute("/farmer/market")({ component: lazyRouteComponent($$splitComponentImporter$6, "component") });
var $$splitComponentImporter$5 = () => import("./plant-DGpVsI9Q.mjs");
var Route$5 = createFileRoute("/farmer/plant")({ component: lazyRouteComponent($$splitComponentImporter$5, "component") });
var $$splitComponentImporter$4 = () => import("./profile-BKGirhvo.mjs");
var Route$4 = createFileRoute("/farmer/profile")({ component: lazyRouteComponent($$splitComponentImporter$4, "component") });
var $$splitComponentImporter$3 = () => import("./partner-CYGwrv8N.mjs");
var Route$3 = createFileRoute("/partner/")({ component: lazyRouteComponent($$splitComponentImporter$3, "component") });
var $$splitComponentImporter$2 = () => import("./earnings-CmagQSO8.mjs");
var Route$2 = createFileRoute("/partner/earnings")({ component: lazyRouteComponent($$splitComponentImporter$2, "component") });
var $$splitComponentImporter$1 = () => import("./profile-COF4AXer.mjs");
var Route$1 = createFileRoute("/partner/profile")({ component: lazyRouteComponent($$splitComponentImporter$1, "component") });
var $$splitComponentImporter = () => import("./runs-BElNIddV.mjs");
var Route = createFileRoute("/partner/runs")({ component: lazyRouteComponent($$splitComponentImporter, "component") });
var IndexRoute = Route$11.update({
	id: "/",
	path: "/",
	getParentRoute: () => Route$12
});
var FarmerRoute = Route$10.update({
	id: "/farmer",
	path: "/farmer",
	getParentRoute: () => Route$12
});
var PartnerRoute = Route$9.update({
	id: "/partner",
	path: "/partner",
	getParentRoute: () => Route$12
});
var FarmerIndexRoute = Route$8.update({
	id: "/",
	path: "/",
	getParentRoute: () => FarmerRoute
});
var FarmerDiagnoseRoute = Route$7.update({
	id: "/diagnose",
	path: "/diagnose",
	getParentRoute: () => FarmerRoute
});
var FarmerMarketRoute = Route$6.update({
	id: "/market",
	path: "/market",
	getParentRoute: () => FarmerRoute
});
var FarmerPlantRoute = Route$5.update({
	id: "/plant",
	path: "/plant",
	getParentRoute: () => FarmerRoute
});
var FarmerProfileRoute = Route$4.update({
	id: "/profile",
	path: "/profile",
	getParentRoute: () => FarmerRoute
});
var PartnerIndexRoute = Route$3.update({
	id: "/",
	path: "/",
	getParentRoute: () => PartnerRoute
});
var PartnerEarningsRoute = Route$2.update({
	id: "/earnings",
	path: "/earnings",
	getParentRoute: () => PartnerRoute
});
var PartnerProfileRoute = Route$1.update({
	id: "/profile",
	path: "/profile",
	getParentRoute: () => PartnerRoute
});
var PartnerRunsRoute = Route.update({
	id: "/runs",
	path: "/runs",
	getParentRoute: () => PartnerRoute
});
var FarmerRouteChildren = {
	FarmerDiagnoseRoute,
	FarmerMarketRoute,
	FarmerPlantRoute,
	FarmerProfileRoute,
	FarmerIndexRoute
};
var FarmerRouteWithChildren = FarmerRoute._addFileChildren(FarmerRouteChildren);
var PartnerRouteChildren = {
	PartnerEarningsRoute,
	PartnerProfileRoute,
	PartnerRunsRoute,
	PartnerIndexRoute
};
var rootRouteChildren = {
	IndexRoute,
	FarmerRoute: FarmerRouteWithChildren,
	PartnerRoute: PartnerRoute._addFileChildren(PartnerRouteChildren)
};
var routeTree = Route$12._addFileChildren(rootRouteChildren)._addFileTypes();
var router_exports = /* @__PURE__ */ __exportAll({ getRouter: () => getRouter });
function getRouter() {
	return createRouter({
		routeTree,
		defaultErrorComponent: AppErrorComponent
	});
}
//#endregion
export { statusK as C, statusP as D, statusOC as E, statusZn as O, statusFe as S, statusN as T, planFertilizers as _, useApp as a, statusB as b, inr as c, CROPS as d, STATES as f, costForFarm as g, recommendCrops as h, langMeta as i, shortDate as l, currentSeason as m, Route$7 as n, fileToJpegDataUrl as o, cropName as p, LANGUAGES as r, greetingKey as s, router_exports as t, uid as u, sampleMaharashtraSoil as v, statusMn as w, statusCu as x, shopsFor as y };
