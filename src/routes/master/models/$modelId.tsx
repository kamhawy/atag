import { createFileRoute } from "@tanstack/react-router";
import { AssetModelForm } from "@/pages/master/models/AssetModelForm";

export const Route = createFileRoute("/master/models/$modelId")({
  component: ModelDetailRoute
});

function ModelDetailRoute() {
  const { modelId } = Route.useParams();
  
  // Parameter validation
  if (!modelId || modelId === "") {
    return <div>Error: Model ID is required</div>;
  }
  
  return <AssetModelForm modelId={modelId} />;
}
