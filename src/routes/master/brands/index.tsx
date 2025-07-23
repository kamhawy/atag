import { createFileRoute } from "@tanstack/react-router";
import { AssetBrands } from "@/pages/master/brands/AssetBrands";

export const Route = createFileRoute("/master/brands/")({
  component: AssetBrands
});
