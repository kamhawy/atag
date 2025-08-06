import React, { useState, useEffect } from "react";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { Dropdown } from "primereact/dropdown";
import { useToast } from "@/hooks/useToast";
import { sampleModels, sampleBrands, sampleAssetCategories } from "@/data/sampleData";
import "./AssetModelForm.css";
import { Toast } from "primereact/toast";
import { Model } from "@/types/models";

interface AssetModelFormDialogProps {
  onSave: (model: Model) => void;
  onCancel: () => void;
  modelId?: string;
  mode?: "add" | "edit";
  toastRef?: React.RefObject<Toast | null>;
}

export const AssetModelFormDialog: React.FC<AssetModelFormDialogProps> = ({
  onSave,
  onCancel,
  modelId,
  mode = "add",
  toastRef
}) => {
  const { showSuccess, showError } = useToast(toastRef || { current: null });

  const [formData, setFormData] = useState<Model>({
    id: "",
    name: "",
    code: "",
    description: "",
    brandId: "",
    categoryId: "",
    year: new Date().getFullYear(),
    specifications: "",
    isActive: true
  });

  const [loading, setLoading] = useState(false);
  const isEditMode = mode === "edit" && modelId && modelId !== "new";

  useEffect(() => {
    if (isEditMode && modelId) {
      // Load existing model data
      const existingModel = sampleModels.find(
        (model: Model) => model.id === modelId
      );
      if (existingModel) {
        setFormData({
          id: existingModel.id,
          name: existingModel.name,
          code: existingModel.code,
          description: existingModel.description,
          brandId: existingModel.brandId || "",
          categoryId: existingModel.categoryId || "",
          year: existingModel.year,
          specifications: existingModel.specifications || "",
          isActive: existingModel.isActive
        });
      }
    }
  }, [modelId, isEditMode]);

  const handleInputChange = (field: keyof Model, value: unknown) => {
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
        showSuccess("Model updated successfully");
      } else {
        showSuccess("Model created successfully");
      }

      onSave(formData);
    } catch {
      showError("Failed to save model");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    onCancel();
  };

  const statusOptions = [
    { label: "Active", value: true },
    { label: "Inactive", value: false }
  ];

  // Use actual sample data for dropdowns
  const brandOptions = sampleBrands.map(brand => ({
    label: brand.name,
    value: brand.id
  }));

  const categoryOptions = sampleAssetCategories.map(category => ({
    label: category.name,
    value: category.id
  }));

  // Generate year options (current year - 10 years to current year + 5 years)
  const currentYear = new Date().getFullYear();
  const yearOptions = Array.from({ length: 16 }, (_, i) => ({
    label: (currentYear - 10 + i).toString(),
    value: currentYear - 10 + i
  }));

  return (
    <div className="asset-model-form-dialog">
      <form onSubmit={handleSubmit} className="asset-form">
        <div className="form-row">
          <div className="form-field">
            <label htmlFor="name">Name *</label>
            <InputText
              id="name"
              value={formData.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
              placeholder="Enter model name"
              required
            />
          </div>
          <div className="form-field">
            <label htmlFor="code">Code *</label>
            <InputText
              id="code"
              value={formData.code}
              onChange={(e) => handleInputChange("code", e.target.value)}
              placeholder="Enter model code"
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
            placeholder="Enter model description"
            rows={3}
          />
        </div>

        <div className="form-row">
          <div className="form-field">
            <label htmlFor="brandId">Brand</label>
            <Dropdown
              id="brandId"
              value={formData.brandId}
              options={brandOptions}
              onChange={(e) => handleInputChange("brandId", e.value)}
              placeholder="Select brand"
              showClear
            />
          </div>
          <div className="form-field">
            <label htmlFor="categoryId">Category</label>
            <Dropdown
              id="categoryId"
              value={formData.categoryId}
              options={categoryOptions}
              onChange={(e) => handleInputChange("categoryId", e.value)}
              placeholder="Select category"
              showClear
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-field">
            <label htmlFor="year">Year</label>
            <Dropdown
              id="year"
              value={formData.year}
              options={yearOptions}
              onChange={(e) => handleInputChange("year", e.value)}
              placeholder="Select year"
            />
          </div>
          <div className="form-field">
            <label htmlFor="status">Status</label>
            <Dropdown
              id="status"
              value={formData.isActive}
              options={statusOptions}
              onChange={(e) => handleInputChange("isActive", e.value)}
              placeholder="Select status"
            />
          </div>
        </div>

        <div className="form-field">
          <label htmlFor="specifications">Specifications</label>
          <InputTextarea
            id="specifications"
            value={formData.specifications}
            onChange={(e) => handleInputChange("specifications", e.target.value)}
            placeholder="Enter model specifications"
            rows={3}
          />
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
            label={isEditMode ? "Update Model" : "Create Model"}
            icon="pi pi-check"
            loading={loading}
            className="p-button-primary"
          />
        </div>
      </form>
    </div>
  );
}; 
