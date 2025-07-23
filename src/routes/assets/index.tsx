import { createFileRoute } from "@tanstack/react-router";
import { AssetsList } from "@/pages/assets/AssetsList";

export const Route = createFileRoute("/assets/")({
  component: AssetsList
});
