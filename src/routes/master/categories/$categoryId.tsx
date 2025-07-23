import { createFileRoute, RouteComponent } from "@tanstack/react-router";
import { AssetCategoryForm } from "@/pages/master/categories/AssetCategoryForm";

export const Route = createFileRoute("/master/categories/$categoryId")({
  component: ((props: { params: { categoryId: string } }) => (
    <AssetCategoryForm categoryId={props.params.categoryId} />
  )) as RouteComponent
});
