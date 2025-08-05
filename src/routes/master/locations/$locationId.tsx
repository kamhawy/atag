import { createFileRoute } from "@tanstack/react-router";
import { AssetLocationForm } from "@/pages/master/locations/AssetLocationForm";

export const Route = createFileRoute("/master/locations/$locationId")({
  component: LocationDetailRoute
});

function LocationDetailRoute() {
  const { locationId } = Route.useParams();
  
  // Parameter validation
  if (!locationId || locationId === "") {
    return <div>Error: Location ID is required</div>;
  }
  
  return <AssetLocationForm locationId={locationId} />;
}
