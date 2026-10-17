//#region node_modules/.nitro/vite/services/ssr/assets/ai-parse-DhCLcDqF.js
/** The 12 numeric parameters printed on an Indian Soil Health Card. */
var SOIL_NUMERIC_FIELDS = [
	"pH",
	"EC",
	"OC",
	"N",
	"P",
	"K",
	"S",
	"Zn",
	"Fe",
	"Mn",
	"Cu",
	"B"
];
/**
* Plausibility limits used only to catch misreads and typos.
* These are NOT agronomic thresholds. Soil Scientist (B3) to confirm before relying on them.
*/
var SOIL_PLAUSIBLE_RANGE = {
	pH: [3, 11],
	EC: [0, 20],
	OC: [0, 5],
	N: [0, 1500],
	P: [0, 300],
	K: [0, 2e3],
	S: [0, 200],
	Zn: [0, 50],
	Fe: [0, 300],
	Mn: [0, 300],
	Cu: [0, 50],
	B: [0, 20]
};
function isPlausible(field, value) {
	if (typeof value !== "number" || !Number.isFinite(value)) return false;
	const [min, max] = SOIL_PLAUSIBLE_RANGE[field];
	return value >= min && value <= max;
}
/** Fields that are missing, not a number, or outside the plausible range. */
function invalidSoilFields(r) {
	return SOIL_NUMERIC_FIELDS.filter((f) => !isPlausible(f, r[f]));
}
/** An empty form: every number is NaN, nothing is pre-filled with typical values. */
function blankSoilDraft(texture) {
	return {
		pH: NaN,
		EC: NaN,
		OC: NaN,
		N: NaN,
		P: NaN,
		K: NaN,
		S: NaN,
		Zn: NaN,
		Fe: NaN,
		Mn: NaN,
		Cu: NaN,
		B: NaN,
		texture,
		source: "manual"
	};
}
/** Closed vocabulary: the model may only pick from these. The app, not the model, writes all farmer-facing text. */
var LEAF_SIGNS = [
	"yellowing_uniform",
	"yellowing_between_veins",
	"purple_red_tint",
	"brown_or_dark_spots",
	"edge_scorch",
	"wilting_drooping",
	"chewed_holes",
	"curling_or_twisting",
	"white_or_grey_coating",
	"fine_speckling",
	"none_visible"
];
var DATA_URL = /^data:image\/(?:jpeg|png|webp);base64,[A-Za-z0-9+/=]+$/;
function validateAnalyzeInput(input) {
	if (typeof input !== "object" || input === null) return {
		ok: false,
		error: "bad_input"
	};
	const o = input;
	if (o.kind !== "leaf" && o.kind !== "soil-card") return {
		ok: false,
		error: "bad_kind"
	};
	const img = o.imageBase64;
	if (typeof img !== "string" || img.length === 0 || img.length > 4e6) return {
		ok: false,
		error: "bad_image_size"
	};
	if (!DATA_URL.test(img)) return {
		ok: false,
		error: "bad_image_format"
	};
	const lang = typeof o.lang === "string" && /^[a-z]{2,3}$/.test(o.lang) ? o.lang : "en";
	const hint = typeof o.cropHint === "string" && /^[\p{L}\p{N} -]{1,40}$/u.test(o.cropHint.trim()) ? o.cropHint.trim() : void 0;
	return {
		ok: true,
		value: {
			imageUrl: img,
			kind: o.kind,
			lang,
			cropHint: hint
		}
	};
}
/** Best-effort global limiter. Serverless instances do not share memory, so this only bounds worst-case spend per instance. */
function createLimiter(max, windowMs, now = Date.now) {
	let hits = [];
	return { tryAcquire() {
		const t = now();
		hits = hits.filter((h) => t - h < windowMs);
		if (hits.length >= max) return false;
		hits.push(t);
		return true;
	} };
}
function extractJson(text) {
	const raw = (text.match(/```(?:json)?\s*([\s\S]*?)```/)?.[1] ?? text).trim();
	const start = raw.indexOf("{");
	const end = raw.lastIndexOf("}");
	if (start < 0 || end < 0) throw new Error("No JSON");
	return JSON.parse(raw.slice(start, end + 1));
}
/**
* Keep only values that are numbers (or numeric strings) inside the plausible range.
* Anything else is reported as missing. Nothing is estimated or defaulted.
*/
function parseSoilCard(parsed) {
	const o = typeof parsed === "object" && parsed !== null ? parsed : {};
	const values = {};
	const missing = [];
	for (const f of SOIL_NUMERIC_FIELDS) {
		const v = o[f];
		const n = typeof v === "number" ? v : typeof v === "string" && v.trim() !== "" ? Number(v) : NaN;
		if (isPlausible(f, n)) values[f] = n;
		else missing.push(f);
	}
	return {
		values,
		missing,
		lab: (typeof o.lab === "string" ? o.lab.replace(/[\u0000-\u001f<>]/g, "").trim().slice(0, 80) : "") || void 0
	};
}
function parseLeaf(parsed) {
	const o = typeof parsed === "object" && parsed !== null ? parsed : {};
	const quality = o.photoQuality === "good" || o.photoQuality === "poor" ? o.photoQuality : "unusable";
	const raw = Array.isArray(o.signs) ? o.signs : [];
	const signs = [...new Set(raw.filter((s) => LEAF_SIGNS.includes(s)))].slice(0, 4);
	const real = signs.filter((s) => s !== "none_visible");
	return {
		quality,
		signs: real.length > 0 ? real : signs.slice(0, 1)
	};
}
//#endregion
export { invalidSoilFields as a, validateAnalyzeInput as c, extractJson as i, blankSoilDraft as n, parseLeaf as o, createLimiter as r, parseSoilCard as s, LEAF_SIGNS as t };
