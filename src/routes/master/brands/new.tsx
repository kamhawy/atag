import { createFileRoute } from "@tanstack/react-router";
import { AssetBrandForm } from "@/pages/master/brands/AssetBrandForm";

export const Route = createFileRoute("/master/brands/new")({
  component: () => <AssetBrandForm brandId="new" mode="add" />
});
