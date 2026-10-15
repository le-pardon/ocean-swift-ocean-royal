import { useApp } from "./store";
import { translate, type MsgKey } from "./messages";
import { langMeta } from "./languages";

export function useT() {
  const lang = useApp((s) => s.lang);
  const t = (key: MsgKey, vars?: Record<string, string | number>) => translate(lang, key, vars);
  return { t, lang, dir: langMeta(lang).dir, meta: langMeta(lang) };
}
