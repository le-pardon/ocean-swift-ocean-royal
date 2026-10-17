import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { S as useNavigate, w as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as useApp } from "./router-CVrjSalQ.mjs";
import { t as AppShell } from "./AppShell-B4i8i6n1.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/partner-BG7j-Vp4.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function PartnerLayout() {
	const navigate = useNavigate();
	const hydrated = useApp((s) => s.hydrated);
	const onboarded = useApp((s) => s.onboarded);
	const role = useApp((s) => s.role);
	(0, import_react.useEffect)(() => {
		if (!hydrated) return;
		if (!onboarded) navigate({ to: "/" });
		else if (role === "farmer") navigate({ to: "/farmer" });
	}, [
		hydrated,
		onboarded,
		role,
		navigate
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, { kind: "partner" });
}
//#endregion
export { PartnerLayout as component };
