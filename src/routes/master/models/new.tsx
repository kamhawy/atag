import { createFileRoute } from "@tanstack/react-router";
import { AssetModelForm } from "@/pages/master/models/AssetModelForm";

export const Route = createFileRoute("/master/models/new")({
  component: () => <AssetModelForm modelId="new" mode="add" />
});
