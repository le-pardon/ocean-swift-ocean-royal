# Safety patch 1 (photo analysis, soil data, honest labelling)

Written by Claude in one session, working as architect, security, agronomy-review, AI and QA roles in turn.
No independent reviewer has checked this. No human agronomist has reviewed any farmer-facing text.

## What changed

| Area | Before | After |
|---|---|---|
| Soil card fallback | On AI failure, a hard-coded Nagpur reading was loaded and labelled `source: "card"` | Blank form. Unread values stay blank. Nothing is estimated (`diagnose.tsx`, `ai-parse.ts`) |
| Manual soil entry | Pre-filled with typical numbers (pH 7, N 280...) | Blank form (`blankSoilDraft`) |
| Saving soil tests | No checks | Blocked unless all 12 values are present and plausible. Sample values cannot be saved |
| Soil texture | Guessed by the AI from a card that has no texture | Chosen by the farmer, defaulting to their profile |
| Leaf photo | AI returned diagnosis, treatment, fertiliser doses, bag prices | AI may only pick from a fixed list of visible signs plus a photo-quality rating. All text is written by the app. Always advises KVK or agriculture officer. No product, dose or price |
| Leaf failure | Canned sample diagnoses shown as results and saved | Message to ask a KVK. Demo examples are labelled and never saved |
| AI endpoint | Any input accepted, no limits | Format, size (about 3 MB), kind, language and crop-hint checks. Best-effort global limit (20 per 5 min per server instance). 25 s timeout. `AI_PHOTO_ENABLED=false` switches it off. Upstream error text no longer returned |
| Photo consent | None | Per-device consent before any photo is sent |
| Crop fit score | Included profit, so profit counted twice | Suitability only (test added) |
| Placeholder data | Presented as results | Banner on the crop screen and a label on the home screen |
| Tagline | "Profit at harvest" promise | English, Hindi, Kannada changed. Other 19 languages unchanged |

New files: `src/lib/validation.ts`, `src/lib/ai-parse.ts`, `src/lib/notices.ts`, `src/lib/safety.test.ts`.
Removed: `SYMPTOM_FALLBACK` in `samples.ts` (grep-confirmed unused after the change).

## Verified here

- `node --experimental-strip-types --test src/lib/safety.test.ts`: 14 passed, 0 failed.
- Mutation check: with the old fit-score line reintroduced, 1 test fails; restored, 14 pass.
- `tsc` strict on the logic modules: no errors.
- Partial `tsc` on the edited screens with third-party packages missing: no syntax errors. It found one real type error (now fixed). Errors for unresolved packages and `process` were ignored.

## NOT verified

The full build, full typecheck, lint, existing tests, and the screens in a browser. Dependencies are not installed here and there is no network. Run `npm install && npm run typecheck && npm test && npm run lint` before merging.

## Not done (open)

1. **Ranking still sorts by net return.** Changing it needs the Agricultural Economist and Agriculture Science Lead specs (issue I-04).
2. **Possible cost double-count:** `planFertilizers` cost is subtracted on top of `costPerAcre`, which may already include fertiliser. Needs B9.
3. **Generic fertiliser doses** (same dose for every crop, hard-coded bag prices) still show in the soil tab. P and K thresholds need checking against the official Soil Health Card ratings (B3).
4. All yields, costs and prices remain unsourced placeholders.
5. No sign-in (disabled), so no per-user quotas. The rate limit is per server instance only.
6. Photos are still saved in the browser's local storage.
7. Marketplace and delivery are still simulated on each device. No buyer app, no shared backend.
8. Hindi and Kannada notices are drafts needing native review. Other languages show English notices.
9. No Kolar, ragi or groundnut data.
