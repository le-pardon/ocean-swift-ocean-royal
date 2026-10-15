import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { AppShell } from "@/components/AppShell";
import { useApp } from "@/lib/store";

export const Route = createFileRoute("/farmer")({
  component: FarmerLayout,
});

function FarmerLayout() {
  const navigate = useNavigate();
  const hydrated = useApp((s) => s.hydrated);
  const onboarded = useApp((s) => s.onboarded);
  const role = useApp((s) => s.role);

  useEffect(() => {
    if (!hydrated) return;
    if (!onboarded) void navigate({ to: "/" });
    else if (role === "partner") void navigate({ to: "/partner" });
  }, [hydrated, onboarded, role, navigate]);

  return <AppShell kind="farmer" />;
}
