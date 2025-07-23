import { createFileRoute } from "@tanstack/react-router";
import { AssetCategoryForm } from "@/pages/master/categories/AssetCategoryForm";

export const Route = createFileRoute("/master/categories/new")({
  component: () => <AssetCategoryForm categoryId="new" mode="add" />
});
