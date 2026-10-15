import { createRootRoute, HeadContent, Outlet, Scripts } from "@tanstack/react-router";
import { useEffect } from "react";
import { AuthProvider } from "@/lib/auth/provider";
import { PreviewHostBridge } from "@/components/preview-host-bridge";
import { useApp } from "@/lib/store";
import { langMeta, FONT_HREF } from "@/lib/languages";
import { Toaster } from "sonner";
import appCss from "../styles.css?url";

const APP_NAME = "KhetSaathi";

function RootShell() {
  const lang = useApp((s) => s.lang);
  const meta = langMeta(lang);

  useEffect(() => {
    void useApp.persist.rehydrate();
    const id = window.setTimeout(() => {
      if (!useApp.getState().hydrated) useApp.setState({ hydrated: true });
    }, 600);
    return () => window.clearTimeout(id);
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = meta.dir;
  }, [lang, meta.dir]);

  return (
    <html lang={lang} dir={meta.dir} suppressHydrationWarning className="antialiased">
      <head>
        <HeadContent />
      </head>
      <body className="min-h-dvh bg-background text-foreground">
        <PreviewHostBridge />
        <AuthProvider>
          <Outlet />
          <Toaster
            position="top-center"
            toastOptions={{
              className: "font-sans !bg-surface !text-foreground !border-border",
            }}
          />
        </AuthProvider>
        <Scripts />
      </body>
    </html>
  );
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1, viewport-fit=cover" },
      { title: APP_NAME },
      { name: "theme-color", content: "#2C5A32" },
      {
        name: "description",
        content: "Plant today. Profit at harvest. Crop advice, soil cards, leaf scan, and mandi lots.",
      },
    ],
    links: [
      { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
      { rel: "stylesheet", href: appCss },
      { rel: "stylesheet", href: FONT_HREF },
      { rel: "manifest", href: "/__grok/manifest.webmanifest" },
      { rel: "apple-touch-icon", href: "/__grok/icon-180.png" },
    ],
  }),
  component: RootShell,
});
