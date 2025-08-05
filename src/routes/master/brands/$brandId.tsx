import { createFileRoute } from "@tanstack/react-router";
import { AssetBrandForm } from "@/pages/master/brands/AssetBrandForm";

export const Route = createFileRoute("/master/brands/$brandId")({
  component: BrandDetailRoute
});

function BrandDetailRoute() {
  const { brandId } = Route.useParams();
  
  // Parameter validation
  if (!brandId || brandId === "") {
    return <div>Error: Brand ID is required</div>;
  }
  
  return <AssetBrandForm brandId={brandId} />;
}
