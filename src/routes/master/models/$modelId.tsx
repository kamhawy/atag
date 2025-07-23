import { createFileRoute, RouteComponent } from "@tanstack/react-router";
import { AssetModelForm } from "@/pages/master/models/AssetModelForm";

export const Route = createFileRoute("/master/models/$modelId")({
  component: ((props: { params: { modelId: string } }) => (
    <AssetModelForm modelId={props.params.modelId} />
  )) as RouteComponent
});
