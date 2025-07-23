import { createFileRoute } from "@tanstack/react-router";
import { UserForm } from "@/pages/admin/users/UserForm";

export const Route = createFileRoute("/admin/users/new")({
  component: () => <UserForm userId="new" mode="add" />
});
