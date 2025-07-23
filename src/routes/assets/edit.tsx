import { createFileRoute } from "@tanstack/react-router";
import { AssetForm } from "@/pages/assets/AssetForm";

export const Route = createFileRoute("/assets/edit")({
  component: () => <AssetForm mode="edit" />
});
