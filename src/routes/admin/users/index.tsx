import { createFileRoute } from "@tanstack/react-router";
import { Users } from "@/pages/admin/users/Users";

export const Route = createFileRoute("/admin/users/")({
  component: Users
});
