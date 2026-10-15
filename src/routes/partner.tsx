import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { AppShell } from "@/components/AppShell";
import { useApp } from "@/lib/store";

export const Route = createFileRoute("/partner")({
  component: PartnerLayout,
});

function PartnerLayout() {
  const navigate = useNavigate();
  const hydrated = useApp((s) => s.hydrated);
  const onboarded = useApp((s) => s.onboarded);
  const role = useApp((s) => s.role);

  useEffect(() => {
    if (!hydrated) return;
    if (!onboarded) void navigate({ to: "/" });
    else if (role === "farmer") void navigate({ to: "/farmer" });
  }, [hydrated, onboarded, role, navigate]);

  return <AppShell kind="partner" />;
}
