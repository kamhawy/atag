import React, { useState, useEffect } from "react";
import { useNavigate } from "@tanstack/react-router";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { Dropdown } from "primereact/dropdown";
import { Card } from "primereact/card";
import { useToast } from "@/hooks/useToast";
import { sampleAssetCategories } from "@/data/sampleData";
import "./AssetCategoryForm.css";
import { Toast } from "primereact/toast";
import { Category } from "@/types/models";

interface AssetCategoryFormProps {
  categoryId: string;
  mode?: "add" | "edit";
  toastRef?: React.RefObject<Toast | null>;
}

export const AssetCategoryForm: React.FC<AssetCategoryFormProps> = ({
  categoryId,
  mode,
  toastRef
}) => {
  const navigate = useNavigate();
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
  const isEditMode = categoryId !== "new";
  const isAddMode = mode === "add" || categoryId === "new";

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

      navigate({ to: "/master/categories" });
    } catch {
      showError("Failed to save category");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigate({ to: "/master/categories" });
  };

  const parentCategoryOptions = sampleAssetCategories
    .filter((cat) => cat.id !== categoryId)
    .map((cat) => ({ label: cat.name, value: cat.id }));

  const iconOptions = [
    { label: "Chair", value: "chair" },
    { label: "Desk", value: "desk" },
    { label: "Monitor", value: "monitor" },
    { label: "Computer", value: "computer" },
    { label: "Package", value: "package" },
    { label: "Flask", value: "flask" },
    { label: "Settings", value: "settings" },
    { label: "Tag", value: "tag" }
  ];

  const colorOptions = [
    { label: "Blue", value: "#3B82F6" },
    { label: "Green", value: "#10B981" },
    { label: "Yellow", value: "#F59E0B" },
    { label: "Red", value: "#EF4444" },
    { label: "Purple", value: "#8B5CF6" },
    { label: "Gray", value: "#6B7280" }
  ];

  return (
    <div className="asset-category-form">
      <Card>
        <div className="form-header">
          <h2>{isAddMode ? "Add Category" : "Edit Category"}</h2>
          <div className="form-actions">
            <Button
              label="Cancel"
              icon="pi pi-times"
              className="p-button-secondary"
              onClick={handleCancel}
            />
            <Button
              label={isAddMode ? "Create" : "Update"}
              icon="pi pi-check"
              onClick={handleSubmit}
              loading={loading}
            />
          </div>
        </div>

        <form onSubmit={handleSubmit} className="category-form">
          <div className="form-grid">
            <div className="form-field">
              <label htmlFor="name">Category Name *</label>
              <InputText
                id="name"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                placeholder="Enter category name"
                required
              />
            </div>

            <div className="form-field">
              <label htmlFor="code">Category Code *</label>
              <InputText
                id="code"
                value={formData.code}
                onChange={(e) => handleInputChange("code", e.target.value)}
                placeholder="Enter category code"
                required
              />
            </div>

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
              <label htmlFor="color">Color</label>
              <Dropdown
                id="color"
                value={formData.color}
                options={colorOptions}
                onChange={(e) => handleInputChange("color", e.value)}
                placeholder="Select color"
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

            <div className="form-field full-width">
              <label htmlFor="description">Description</label>
              <InputTextarea
                id="description"
                value={formData.description}
                onChange={(e) =>
                  handleInputChange("description", e.target.value)
                }
                placeholder="Enter category description"
                rows={4}
              />
            </div>
          </div>
        </form>
      </Card>
    </div>
  );
};
