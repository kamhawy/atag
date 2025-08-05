import { createFileRoute } from "@tanstack/react-router";
import { AssetsCatalogue } from "@/pages/assets/AssetsCatalogue";

export const Route = createFileRoute("/assets/")({
  component: AssetsCatalogue
});
