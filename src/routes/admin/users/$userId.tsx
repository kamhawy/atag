import { createFileRoute, RouteComponent } from "@tanstack/react-router";
import { UserForm } from "@/pages/admin/users/UserForm";

export const Route = createFileRoute("/admin/users/$userId")({
  component: ((props: { params: { userId: string } }) => (
    <UserForm userId={props.params.userId} mode="edit" />
  )) as RouteComponent
});
