import { createFileRoute } from "@tanstack/react-router";
import { AssetLocations } from "@/pages/master/locations/AssetLocations";

export const Route = createFileRoute("/master/locations/")({
  component: AssetLocations
});
