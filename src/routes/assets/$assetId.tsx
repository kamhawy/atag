import { createFileRoute } from "@tanstack/react-router";
import { AssetDetail } from "@/pages/assets/AssetDetail";

export const Route = createFileRoute("/assets/$assetId")({
  component: AssetDetailRoute,
  validateSearch: (search: Record<string, unknown>) => {
    return {
      mode: search.mode as string | undefined
    };
  }
});

function AssetDetailRoute() {
  const { assetId } = Route.useParams();
  const { mode } = Route.useSearch();
  
  // Parameter validation
  if (!assetId || assetId === "") {
    return <div>Error: Asset ID is required</div>;
  }
  
  return <AssetDetail assetId={assetId} mode={mode} />;
}
