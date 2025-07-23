import { createFileRoute, RouteComponent } from "@tanstack/react-router";
import { AssetLocationForm } from "@/pages/master/locations/AssetLocationForm";

export const Route = createFileRoute("/master/locations/$locationId")({
  component: ((props: { params: { locationId: string } }) => (
    <AssetLocationForm locationId={props.params.locationId} />
  )) as RouteComponent
});
