import { createFileRoute } from "@tanstack/react-router";
import { AssetCategoryForm } from "@/pages/master/categories/AssetCategoryForm";

export const Route = createFileRoute("/master/categories/$categoryId")({
  component: CategoryDetailRoute
});

function CategoryDetailRoute() {
  const { categoryId } = Route.useParams();
  
  // Parameter validation
  if (!categoryId || categoryId === "") {
    return <div>Error: Category ID is required</div>;
  }
  
  return <AssetCategoryForm categoryId={categoryId} />;
}
