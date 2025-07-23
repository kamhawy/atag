import { createFileRoute, RouteComponent } from "@tanstack/react-router";
import { AssetBrandForm } from "@/pages/master/brands/AssetBrandForm";

export const Route = createFileRoute("/master/brands/$brandId")({
  component: ((props: { params: { brandId: string } }) => (
    <AssetBrandForm brandId={props.params.brandId} />
  )) as RouteComponent
});
