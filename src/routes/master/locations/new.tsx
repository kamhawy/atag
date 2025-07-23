import { createFileRoute } from "@tanstack/react-router";
import { AssetLocationForm } from "@/pages/master/locations/AssetLocationForm";

export const Route = createFileRoute("/master/locations/new")({
  component: () => <AssetLocationForm locationId="new" mode="add" />
});
