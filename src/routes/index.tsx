import { createFileRoute } from "@tanstack/react-router";
import { Dashboard } from "@/pages/home/Dashboard";

export const Route = createFileRoute("/")({
  component: Dashboard
});
