import React, { useState, useEffect } from "react";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { Dropdown } from "primereact/dropdown";
import { useToast } from "@/hooks/useToast";
import { sampleBrands } from "@/data/sampleData";
import "./AssetBrandForm.css";
import { Toast } from "primereact/toast";
import { Brand } from "@/types/models";

interface AssetBrandFormDialogProps {
  onSave: (brand: Brand) => void;
  onCancel: () => void;
  brandId?: string;
  mode?: "add" | "edit";
  toastRef?: React.RefObject<Toast | null>;
}

export const AssetBrandFormDialog: React.FC<AssetBrandFormDialogProps> = ({
  onSave,
  onCancel,
  brandId,
  mode = "add",
  toastRef
}) => {
  const { showSuccess, showError } = useToast(toastRef || { current: null });

  const [formData, setFormData] = useState<Brand>({
    id: "",
    name: "",
    code: "",
    description: "",
    website: "",
    contactEmail: "",
    contactPhone: "",
    isActive: true
  });

  const [loading, setLoading] = useState(false);
  const isEditMode = mode === "edit" && brandId && brandId !== "new";

  useEffect(() => {
    if (isEditMode && brandId) {
      // Load existing brand data
      const existingBrand = sampleBrands.find(
        (brand: Brand) => brand.id === brandId
      );
      if (existingBrand) {
        setFormData({
          id: existingBrand.id,
          name: existingBrand.name,
          code: existingBrand.code,
          description: existingBrand.description,
          website: existingBrand.website || "",
          contactEmail: existingBrand.contactEmail || "",
          contactPhone: existingBrand.contactPhone || "",
          isActive: existingBrand.isActive
        });
      }
    }
  }, [brandId, isEditMode]);

  const handleInputChange = (field: keyof Brand, value: unknown) => {
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
        showSuccess("Brand updated successfully");
      } else {
        showSuccess("Brand created successfully");
      }

      onSave(formData);
    } catch {
      showError("Failed to save brand");
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

  return (
    <div className="asset-brand-form-dialog">
      <form onSubmit={handleSubmit} className="asset-form">
        <div className="form-row">
          <div className="form-field">
            <label htmlFor="name">Name *</label>
            <InputText
              id="name"
              value={formData.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
              placeholder="Enter brand name"
              required
            />
          </div>
          <div className="form-field">
            <label htmlFor="code">Code *</label>
            <InputText
              id="code"
              value={formData.code}
              onChange={(e) => handleInputChange("code", e.target.value)}
              placeholder="Enter brand code"
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
            placeholder="Enter brand description"
            rows={3}
          />
        </div>

        <div className="form-row">
          <div className="form-field">
            <label htmlFor="website">Website</label>
            <InputText
              id="website"
              value={formData.website}
              onChange={(e) => handleInputChange("website", e.target.value)}
              placeholder="Enter website URL"
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

        <div className="form-row">
          <div className="form-field">
            <label htmlFor="contactEmail">Contact Email</label>
            <InputText
              id="contactEmail"
              type="email"
              value={formData.contactEmail}
              onChange={(e) =>
                handleInputChange("contactEmail", e.target.value)
              }
              placeholder="Enter contact email"
            />
          </div>
          <div className="form-field">
            <label htmlFor="contactPhone">Contact Phone</label>
            <InputText
              id="contactPhone"
              value={formData.contactPhone}
              onChange={(e) =>
                handleInputChange("contactPhone", e.target.value)
              }
              placeholder="Enter contact phone"
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
            label={isEditMode ? "Update Brand" : "Create Brand"}
            icon="pi pi-check"
            loading={loading}
            className="p-button-primary"
          />
        </div>
      </form>
    </div>
  );
};
