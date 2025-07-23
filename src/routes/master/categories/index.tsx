import { createFileRoute } from "@tanstack/react-router";
import { AssetCategories } from "@/pages/master/categories/AssetCategories";

export const Route = createFileRoute("/master/categories/")({
  component: AssetCategories
});
