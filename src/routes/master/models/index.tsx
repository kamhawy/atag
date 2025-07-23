import { createFileRoute } from "@tanstack/react-router";
import { AssetModels } from "@/pages/master/models/AssetModels";

export const Route = createFileRoute("/master/models/")({
  component: AssetModels
});
