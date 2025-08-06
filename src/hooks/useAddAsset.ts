import { useState } from "react";
import { Asset } from "@/types/models";
import { useToast } from "./useToast";
import { Toast } from "primereact/toast";

interface UseAddAssetProps {
  toastRef?: React.RefObject<Toast | null>;
  onAssetCreated?: (asset: Asset) => void;
}

interface UseAddAssetReturn {
  showAddAssetDialog: boolean;
  selectedCategory: string | null;
  openAddAssetDialog: (category?: string) => void;
  closeAddAssetDialog: () => void;
  handleSaveAsset: (asset: Asset) => void;
  handleCancelAddAsset: () => void;
}

export const useAddAsset = ({
  toastRef,
  onAssetCreated
}: UseAddAssetProps = {}): UseAddAssetReturn => {
  const [showAddAssetDialog, setShowAddAssetDialog] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const toast = useToast(toastRef || { current: null });

  const openAddAssetDialog = (category?: string) => {
    setSelectedCategory(category || null);
    setShowAddAssetDialog(true);
  };

  const closeAddAssetDialog = () => {
    setShowAddAssetDialog(false);
    setSelectedCategory(null);
  };

  const handleSaveAsset = (asset: Asset) => {
    try {
      // Here you would typically save the asset to your data store
      // For now, we'll just show a success message
      const categoryName = selectedCategory || "General";
      toast.showSuccess(
        `Asset created successfully${selectedCategory ? ` under category "${categoryName}"` : ""}`
      );

      // Call the optional callback if provided
      if (onAssetCreated) {
        onAssetCreated(asset);
      }

      closeAddAssetDialog();
    } catch (error) {
      toast.showError(`Failed to create asset: ${error}`);
      // Log error for debugging
      //   console.error("Error creating asset:", error);
    }
  };

  const handleCancelAddAsset = () => {
    closeAddAssetDialog();
  };

  return {
    showAddAssetDialog,
    selectedCategory,
    openAddAssetDialog,
    closeAddAssetDialog,
    handleSaveAsset,
    handleCancelAddAsset
  };
};
