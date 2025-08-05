import { createFileRoute } from "@tanstack/react-router";
import { UserForm } from "@/pages/admin/users/UserForm";

export const Route = createFileRoute("/admin/users/$userId")({
  component: UserDetailRoute
});

function UserDetailRoute() {
  const { userId } = Route.useParams();
  
  // Parameter validation
  if (!userId || userId === "") {
    return <div>Error: User ID is required</div>;
  }
  
  return <UserForm userId={userId} mode="edit" />;
}
