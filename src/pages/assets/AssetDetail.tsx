import React, { useState, useEffect } from "react";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { Calendar } from "primereact/calendar";
import { InputNumber } from "primereact/inputnumber";
import { InputTextarea } from "primereact/inputtextarea";
import { Tag } from "primereact/tag";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import { ArrowLeft, Edit, Save, X, Trash2, Eye } from "lucide-react";
import { Asset } from "@/types/models";
import { dropdownOptions, sampleAssets } from "@/data/sampleData";
import { useToast } from "@/hooks/useToast";
import { useNavigate } from "@tanstack/react-router";
import "./AssetDetail.css";
import { Toast } from "primereact/toast";

interface AssetDetailProps {
  toastRef?: React.RefObject<Toast | null>;
  assetId?: string;
  mode?: string;
}

export const AssetDetail: React.FC<AssetDetailProps> = ({
  toastRef,
  assetId: propAssetId,
  mode: propMode
}) => {
  const navigate = useNavigate();
  const toast = useToast(toastRef || { current: null });

  const [asset, setAsset] = useState<Asset | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [originalAsset, setOriginalAsset] = useState<Asset | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Use centralized dropdown options
  const categories = dropdownOptions.categories;
  const locations = dropdownOptions.locations;
  const statuses = dropdownOptions.statuses;
  const conditions = dropdownOptions.conditions;

  useEffect(() => {
    if (propAssetId) {
      const foundAsset = sampleAssets.find((a) => a.id === propAssetId);
      if (foundAsset) {
        setAsset({ ...foundAsset });
        setOriginalAsset({ ...foundAsset });
      } else {
        toast.showError("Asset not found");
        navigate({ to: "/assets" });
      }
    }
  }, [propAssetId, navigate, toast]);

  useEffect(() => {
    // Check for edit mode from props
    setIsEditMode(propMode === "edit");
  }, [propMode]);

  const getStatusSeverity = (status: string) => {
    switch (status) {
      case "active":
        return "success";
      case "inactive":
        return "danger";
      case "maintenance":
        return "warning";
      case "retired":
        return "secondary";
      default:
        return "info";
    }
  };

  const getConditionSeverity = (condition: string) => {
    switch (condition) {
      case "excellent":
        return "success";
      case "good":
        return "info";
      case "fair":
        return "warning";
      case "poor":
        return "danger";
      default:
        return "info";
    }
  };

  const validateForm = (): boolean => {
    if (!asset) return false;

    const newErrors: Record<string, string> = {};

    if (!asset.name.trim()) {
      newErrors.name = "Asset name is required";
    }
    if (!asset.assetTag.trim()) {
      newErrors.assetTag = "Asset tag is required";
    }
    if (!asset.category) {
      newErrors.category = "Category is required";
    }
    if (!asset.location) {
      newErrors.location = "Location is required";
    }
    if (!asset.manufacturer.trim()) {
      newErrors.manufacturer = "Manufacturer is required";
    }
    if (!asset.model.trim()) {
      newErrors.model = "Model is required";
    }
    if (asset.purchasePrice <= 0) {
      newErrors.purchasePrice = "Purchase price must be greater than 0";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleEdit = () => {
    navigate({
      to: "/assets/$assetId",
      params: { assetId: propAssetId! },
      search: { mode: "edit" }
    });
  };

  const handleSave = () => {
    if (validateForm() && asset) {
      // In a real app, this would update the backend
      setOriginalAsset({ ...asset });
      setIsEditMode(false);
      toast.showUpdated("Asset");
      // Navigate back to view mode
      navigate({
        to: "/assets/$assetId",
        params: { assetId: propAssetId! },
        search: { mode: undefined }
      });
    }
  };

  const handleCancel = () => {
    if (originalAsset) {
      setAsset({ ...originalAsset });
      setIsEditMode(false);
      setErrors({});
    }
    // Navigate back to view mode
    navigate({
      to: "/assets/$assetId",
      params: { assetId: propAssetId! },
      search: { mode: undefined }
    });
  };

  const handleDelete = () => {
    confirmDialog({
      message: `Are you sure you want to delete asset "${asset?.name}"?`,
      header: "Delete Confirmation",
      icon: "pi pi-exclamation-triangle",
      accept: () => {
        // In a real app, this would delete from backend
        toast.showDeleted("Asset");
        navigate({ to: "/assets" });
      }
    });
  };

  const handleBack = () => {
    navigate({ to: "/assets" });
  };

  if (!asset) {
    return (
      <div className="asset-detail-loading">
        <div className="loading-content">
          <i className="pi pi-spin pi-spinner" style={{ fontSize: "2rem" }}></i>
          <p>Loading asset details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="asset-detail-page">
      {/* Header */}
      <div className="asset-detail-header">
        <div className="header-left">
          <Button
            icon={<ArrowLeft size={20} />}
            className="p-button-text back-btn"
            onClick={handleBack}
            tooltip="Back to Assets"
          />
          <div className="header-info">
            <h1>{asset.name}</h1>
            <div className="asset-meta">
              <Tag
                value={asset.status}
                severity={getStatusSeverity(asset.status)}
              />
              <Tag
                value={asset.condition}
                severity={getConditionSeverity(asset.condition)}
              />
              <span className="asset-id">#{asset.id}</span>
            </div>
          </div>
        </div>
        <div className="header-actions">
          {!isEditMode ? (
            <>
              <Button
                icon={<Eye size={16} />}
                label="View"
                className="p-button-outlined"
                disabled
              />
              <Button
                icon={<Edit size={16} />}
                label="Edit"
                className="p-button-primary"
                onClick={handleEdit}
              />
              <Button
                icon={<Trash2 size={16} />}
                label="Delete"
                className="p-button-danger p-button-outlined"
                onClick={handleDelete}
              />
            </>
          ) : (
            <>
              <Button
                icon={<X size={16} />}
                label="Cancel"
                className="p-button-outlined"
                onClick={handleCancel}
              />
              <Button
                icon={<Save size={16} />}
                label="Save Changes"
                className="p-button-primary"
                onClick={handleSave}
              />
            </>
          )}
        </div>
      </div>

      <div className="asset-detail-content">
        <div className="content-grid">
          {/* Basic Information */}
          <Card className="info-card basic-info-card">
            <div className="card-header">
              <h2>Basic Information</h2>
            </div>
            <div className="card-content">
              <div className="form-row">
                <div className="form-field">
                  <label htmlFor="name">Asset Name *</label>
                  <InputText
                    id="name"
                    value={asset.name}
                    onChange={(e) =>
                      setAsset({ ...asset, name: e.target.value })
                    }
                    className={`w-full ${errors.name ? "p-invalid" : ""}`}
                    disabled={!isEditMode}
                  />
                  {errors.name && (
                    <small className="p-error">{errors.name}</small>
                  )}
                </div>
              </div>
              <div className="form-row">
                <div className="form-field">
                  <label htmlFor="assetTag">Asset Tag *</label>
                  <InputText
                    id="assetTag"
                    value={asset.assetTag}
                    onChange={(e) =>
                      setAsset({ ...asset, assetTag: e.target.value })
                    }
                    className={`w-full ${errors.assetTag ? "p-invalid" : ""}`}
                    disabled={!isEditMode}
                  />
                  {errors.assetTag && (
                    <small className="p-error">{errors.assetTag}</small>
                  )}
                </div>
                <div className="form-field">
                  <label htmlFor="category">Category *</label>
                  <Dropdown
                    id="category"
                    value={asset.category}
                    options={categories}
                    onChange={(e) => setAsset({ ...asset, category: e.value })}
                    className={`w-full ${errors.category ? "p-invalid" : ""}`}
                    disabled={!isEditMode}
                    placeholder="Select Category"
                  />
                  {errors.category && (
                    <small className="p-error">{errors.category}</small>
                  )}
                </div>
              </div>
              <div className="form-row">
                <div className="form-field">
                  <label htmlFor="location">Location *</label>
                  <Dropdown
                    id="location"
                    value={asset.location}
                    options={locations}
                    onChange={(e) => setAsset({ ...asset, location: e.value })}
                    className={`w-full ${errors.location ? "p-invalid" : ""}`}
                    disabled={!isEditMode}
                    placeholder="Select Location"
                  />
                  {errors.location && (
                    <small className="p-error">{errors.location}</small>
                  )}
                </div>
                <div className="form-field">
                  <label htmlFor="status">Status</label>
                  <Dropdown
                    id="status"
                    value={asset.status}
                    options={statuses}
                    onChange={(e) => setAsset({ ...asset, status: e.value })}
                    className="w-full"
                    disabled={!isEditMode}
                    placeholder="Select Status"
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-field">
                  <label htmlFor="condition">Condition</label>
                  <Dropdown
                    id="condition"
                    value={asset.condition}
                    options={conditions}
                    onChange={(e) => setAsset({ ...asset, condition: e.value })}
                    className="w-full"
                    disabled={!isEditMode}
                    placeholder="Select Condition"
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-field">
                  <label htmlFor="description">Description</label>
                  <InputTextarea
                    id="description"
                    value={asset.description}
                    onChange={(e) =>
                      setAsset({ ...asset, description: e.target.value })
                    }
                    rows={4}
                    className="w-full"
                    disabled={!isEditMode}
                  />
                </div>
              </div>
            </div>
          </Card>

          {/* Technical Details */}
          <Card className="info-card technical-info-card">
            <div className="card-header">
              <h2>Technical Details</h2>
            </div>
            <div className="card-content">
              <div className="form-row">
                <div className="form-field">
                  <label htmlFor="manufacturer">Manufacturer *</label>
                  <InputText
                    id="manufacturer"
                    value={asset.manufacturer}
                    onChange={(e) =>
                      setAsset({ ...asset, manufacturer: e.target.value })
                    }
                    className={`w-full ${errors.manufacturer ? "p-invalid" : ""}`}
                    disabled={!isEditMode}
                  />
                  {errors.manufacturer && (
                    <small className="p-error">{errors.manufacturer}</small>
                  )}
                </div>
                <div className="form-field">
                  <label htmlFor="model">Model *</label>
                  <InputText
                    id="model"
                    value={asset.model}
                    onChange={(e) =>
                      setAsset({ ...asset, model: e.target.value })
                    }
                    className={`w-full ${errors.model ? "p-invalid" : ""}`}
                    disabled={!isEditMode}
                  />
                  {errors.model && (
                    <small className="p-error">{errors.model}</small>
                  )}
                </div>
              </div>

              <div className="form-row">
                <div className="form-field">
                  <label htmlFor="serialNumber">Serial Number</label>
                  <InputText
                    id="serialNumber"
                    value={asset.serialNumber}
                    onChange={(e) =>
                      setAsset({ ...asset, serialNumber: e.target.value })
                    }
                    className="w-full"
                    disabled={!isEditMode}
                  />
                </div>
                <div className="form-field">
                  <label htmlFor="assignedTo">Assigned To</label>
                  <InputText
                    id="assignedTo"
                    value={asset.assignedTo}
                    onChange={(e) =>
                      setAsset({ ...asset, assignedTo: e.target.value })
                    }
                    className="w-full"
                    disabled={!isEditMode}
                  />
                </div>
              </div>
            </div>
          </Card>

          {/* Financial Information */}
          <Card className="info-card financial-info-card">
            <div className="card-header">
              <h2>Financial Information</h2>
            </div>
            <div className="card-content">
              <div className="form-row">
                <div className="form-field">
                  <label htmlFor="purchaseDate">Purchase Date</label>
                  <Calendar
                    id="purchaseDate"
                    value={asset.purchaseDate}
                    onChange={(e) =>
                      setAsset({ ...asset, purchaseDate: e.value as Date })
                    }
                    className="w-full"
                    disabled={!isEditMode}
                    showIcon
                  />
                </div>
                <div className="form-field">
                  <label htmlFor="purchasePrice">Purchase Price *</label>
                  <InputNumber
                    id="purchasePrice"
                    value={asset.purchasePrice}
                    onValueChange={(e) =>
                      setAsset({ ...asset, purchasePrice: e.value || 0 })
                    }
                    className={`w-full ${errors.purchasePrice ? "p-invalid" : ""}`}
                    disabled={!isEditMode}
                    mode="currency"
                    currency="USD"
                    minFractionDigits={2}
                    maxFractionDigits={2}
                  />
                  {errors.purchasePrice && (
                    <small className="p-error">{errors.purchasePrice}</small>
                  )}
                </div>
              </div>

              <div className="form-row">
                <div className="form-field">
                  <label htmlFor="supplier">Supplier</label>
                  <InputText
                    id="supplier"
                    value={asset.supplier}
                    onChange={(e) =>
                      setAsset({ ...asset, supplier: e.target.value })
                    }
                    className="w-full"
                    disabled={!isEditMode}
                  />
                </div>
                <div className="form-field">
                  <label htmlFor="warrantyExpiry">Warranty Expiry</label>
                  <Calendar
                    id="warrantyExpiry"
                    value={asset.warrantyExpiry}
                    onChange={(e) =>
                      setAsset({ ...asset, warrantyExpiry: e.value as Date })
                    }
                    className="w-full"
                    disabled={!isEditMode}
                    showIcon
                  />
                </div>
              </div>
            </div>
          </Card>

          {/* Maintenance Information */}
          <Card className="info-card maintenance-info-card">
            <div className="card-header">
              <h2>Maintenance Information</h2>
            </div>
            <div className="card-content">
              <div className="form-row">
                <div className="form-field">
                  <label htmlFor="lastMaintenance">Last Maintenance</label>
                  <Calendar
                    id="lastMaintenance"
                    value={asset.lastMaintenance}
                    onChange={(e) =>
                      setAsset({ ...asset, lastMaintenance: e.value as Date })
                    }
                    className="w-full"
                    disabled={!isEditMode}
                    showIcon
                  />
                </div>
                <div className="form-field">
                  <label htmlFor="nextMaintenance">Next Maintenance</label>
                  <Calendar
                    id="nextMaintenance"
                    value={asset.nextMaintenance}
                    onChange={(e) =>
                      setAsset({ ...asset, nextMaintenance: e.value as Date })
                    }
                    className="w-full"
                    disabled={!isEditMode}
                    showIcon
                  />
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>

      <ConfirmDialog />
    </div>
  );
};
