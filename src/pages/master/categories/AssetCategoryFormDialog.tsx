import React, { useState, useEffect } from "react";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { Dropdown } from "primereact/dropdown";
import { useToast } from "@/hooks/useToast";
import { sampleAssetCategories } from "@/data/sampleData";
import "./AssetCategoryForm.css";
import { Toast } from "primereact/toast";
import { Category } from "@/types/models";

interface AssetCategoryFormDialogProps {
  onSave: (category: Category) => void;
  onCancel: () => void;
  categoryId?: string;
  mode?: "add" | "edit";
  toastRef?: React.RefObject<Toast | null>;
}

export const AssetCategoryFormDialog: React.FC<AssetCategoryFormDialogProps> = ({
  onSave,
  onCancel,
  categoryId,
  mode = "add",
  toastRef
}) => {
  const { showSuccess, showError } = useToast(toastRef || { current: null });

  const [formData, setFormData] = useState<Category>({
    id: "",
    name: "",
    code: "",
    description: "",
    parentCategory: "",
    color: "#3B82F6",
    icon: "tag",
    status: "active",
    assetCount: 0,
    lastUpdated: ""
  });

  const [loading, setLoading] = useState(false);
  const isEditMode = mode === "edit" && categoryId && categoryId !== "new";

  useEffect(() => {
    if (isEditMode && categoryId) {
      // Load existing category data
      const existingCategory = sampleAssetCategories.find(
        (cat) => cat.id === categoryId
      );
      if (existingCategory) {
        setFormData({
          id: existingCategory.id,
          name: existingCategory.name,
          code: existingCategory.code,
          description: existingCategory.description,
          parentCategory: existingCategory.parentCategory || "",
          color: existingCategory.color,
          icon: existingCategory.icon,
          status: existingCategory.status || "active",
          assetCount: existingCategory.assetCount || 0,
          lastUpdated: existingCategory.lastUpdated || ""
        });
      }
    }
  }, [categoryId, isEditMode]);

  const handleInputChange = (field: keyof Category, value: unknown) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      if (isEditMode) {
        showSuccess("Category updated successfully");
      } else {
        showSuccess("Category created successfully");
      }

      onSave(formData);
    } catch {
      showError("Failed to save category");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    onCancel();
  };

  const statusOptions = [
    { label: "Active", value: "active" },
    { label: "Inactive", value: "inactive" }
  ];

  const iconOptions = [
    { label: "Tag", value: "tag" },
    { label: "Box", value: "box" },
    { label: "Tool", value: "tool" },
    { label: "Cog", value: "cog" },
    { label: "Wrench", value: "wrench" }
  ];

  const parentCategoryOptions = sampleAssetCategories.map((cat) => ({
    label: cat.name,
    value: cat.id
  }));

  return (
    <div className="asset-category-form-dialog">
      <form onSubmit={handleSubmit} className="asset-form">
        <div className="form-row">
          <div className="form-field">
            <label htmlFor="name">Name *</label>
            <InputText
              id="name"
              value={formData.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
              placeholder="Enter category name"
              required
            />
          </div>
          <div className="form-field">
            <label htmlFor="code">Code *</label>
            <InputText
              id="code"
              value={formData.code}
              onChange={(e) => handleInputChange("code", e.target.value)}
              placeholder="Enter category code"
              required
            />
          </div>
        </div>

        <div className="form-field">
          <label htmlFor="description">Description</label>
          <InputTextarea
            id="description"
            value={formData.description}
            onChange={(e) => handleInputChange("description", e.target.value)}
            placeholder="Enter category description"
            rows={3}
          />
        </div>

        <div className="form-row">
          <div className="form-field">
            <label htmlFor="parentCategory">Parent Category</label>
            <Dropdown
              id="parentCategory"
              value={formData.parentCategory}
              options={parentCategoryOptions}
              onChange={(e) => handleInputChange("parentCategory", e.value)}
              placeholder="Select parent category"
              showClear
            />
          </div>
          <div className="form-field">
            <label htmlFor="status">Status</label>
            <Dropdown
              id="status"
              value={formData.status}
              options={statusOptions}
              onChange={(e) => handleInputChange("status", e.value)}
              placeholder="Select status"
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-field">
            <label htmlFor="color">Color</label>
            <InputText
              id="color"
              type="color"
              value={formData.color}
              onChange={(e) => handleInputChange("color", e.target.value)}
            />
          </div>
          <div className="form-field">
            <label htmlFor="icon">Icon</label>
            <Dropdown
              id="icon"
              value={formData.icon}
              options={iconOptions}
              onChange={(e) => handleInputChange("icon", e.value)}
              placeholder="Select icon"
            />
          </div>
        </div>

        <div className="form-actions">
          <Button
            type="button"
            label="Cancel"
            icon="pi pi-times"
            onClick={handleCancel}
            className="p-button-secondary"
          />
          <Button
            type="submit"
            label={isEditMode ? "Update Category" : "Create Category"}
            icon="pi pi-check"
            loading={loading}
            className="p-button-primary"
          />
        </div>
      </form>
    </div>
  );
}; 
