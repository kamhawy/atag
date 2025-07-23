import { createFileRoute } from "@tanstack/react-router";
import { AdminSettings } from "@/pages/admin/settings/AdminSettings";

export const Route = createFileRoute("/admin/settings/")({
  component: AdminSettings
});
