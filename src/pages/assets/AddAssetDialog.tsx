import React, { useState, useEffect, useRef } from "react";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { Calendar } from "primereact/calendar";
import { InputNumber } from "primereact/inputnumber";
import { InputTextarea } from "primereact/inputtextarea";
import { Asset } from "@/types/models";
import { dropdownOptions } from "@/data/sampleData";
import "./AddAssetDialog.css";

interface AddAssetDialogProps {
  onSave: (asset: Asset) => void;
  onCancel: () => void;
  preSelectedCategory?: string;
}

export const AddAssetDialog: React.FC<AddAssetDialogProps> = ({
  onSave,
  onCancel,
  preSelectedCategory
}) => {
  const formRef = useRef<HTMLDivElement>(null);
  
  const [asset, setAsset] = useState<Asset>({
    id: "",
    name: "",
    assetTag: "",
    category: preSelectedCategory || "",
    location: "",
    status: "active",
    condition: "good",
    purchaseDate: new Date(),
    purchasePrice: 0,
    supplier: "",
    warrantyExpiry: new Date(),
    assignedTo: "",
    description: "",
    serialNumber: "",
    model: "",
    manufacturer: "",
    lastMaintenance: new Date(),
    nextMaintenance: new Date(),
    lastUpdated: ""
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  // Prevent auto-scrolling when dialog opens
  useEffect(() => {
    if (formRef.current) {
      formRef.current.scrollTop = 0;
    }
  }, []);

  // Use centralized dropdown options
  const categories = dropdownOptions.categories;
  const locations = dropdownOptions.locations;
  const statuses = dropdownOptions.statuses;
  const conditions = dropdownOptions.conditions;

  const validateForm = (): boolean => {
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

  const handleSave = () => {
    if (validateForm()) {
      const assetToSave = {
        ...asset,
        id: `AST${String(Math.floor(Math.random() * 1000)).padStart(3, "0")}`,
        lastUpdated: new Date().toISOString().split("T")[0]
      };
      onSave(assetToSave);
    }
  };

  return (
    <div className="asset-form-dialog" ref={formRef}>
      <div className="asset-form">
        <div className="form-row">
          <div className="form-field">
            <label htmlFor="name">Asset Name *</label>
            <InputText
              id="name"
              value={asset.name}
              onChange={(e) => setAsset({ ...asset, name: e.target.value })}
              className={`w-full ${errors.name ? "p-invalid" : ""}`}
            />
            {errors.name && <small className="p-error">{errors.name}</small>}
          </div>
          <div className="form-field">
            <label htmlFor="assetTag">Asset Tag *</label>
            <InputText
              id="assetTag"
              value={asset.assetTag}
              onChange={(e) => setAsset({ ...asset, assetTag: e.target.value })}
              className={`w-full ${errors.assetTag ? "p-invalid" : ""}`}
            />
            {errors.assetTag && (
              <small className="p-error">{errors.assetTag}</small>
            )}
          </div>
        </div>

        <div className="form-row">
          <div className="form-field">
            <label htmlFor="category">Category *</label>
            <Dropdown
              id="category"
              value={asset.category}
              options={categories}
              onChange={(e) => setAsset({ ...asset, category: e.value })}
              className={`w-full ${errors.category ? "p-invalid" : ""}`}
              placeholder="Select Category"
              showClear
              filter
              filterPlaceholder="Search categories..."
              optionLabel="label"
              optionValue="value"
            />
            {errors.category && (
              <small className="p-error">{errors.category}</small>
            )}
          </div>
          <div className="form-field">
            <label htmlFor="location">Location *</label>
            <Dropdown
              id="location"
              value={asset.location}
              options={locations}
              onChange={(e) => setAsset({ ...asset, location: e.value })}
              className={`w-full ${errors.location ? "p-invalid" : ""}`}
              placeholder="Select Location"
              showClear
              filter
              filterPlaceholder="Search locations..."
              optionLabel="label"
              optionValue="value"
            />
            {errors.location && (
              <small className="p-error">{errors.location}</small>
            )}
          </div>
        </div>

        <div className="form-row">
          <div className="form-field">
            <label htmlFor="status">Status</label>
            <Dropdown
              id="status"
              value={asset.status}
              options={statuses}
              onChange={(e) => setAsset({ ...asset, status: e.value })}
              className="w-full"
              placeholder="Select Status"
              showClear
              filter
              filterPlaceholder="Search statuses..."
              optionLabel="label"
              optionValue="value"
            />
          </div>
          <div className="form-field">
            <label htmlFor="condition">Condition</label>
            <Dropdown
              id="condition"
              value={asset.condition}
              options={conditions}
              onChange={(e) => setAsset({ ...asset, condition: e.value })}
              className="w-full"
              placeholder="Select Condition"
              showClear
              filter
              filterPlaceholder="Search conditions..."
              optionLabel="label"
              optionValue="value"
            />
          </div>
        </div>

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
              onChange={(e) => setAsset({ ...asset, model: e.target.value })}
              className={`w-full ${errors.model ? "p-invalid" : ""}`}
            />
            {errors.model && <small className="p-error">{errors.model}</small>}
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
            />
          </div>
        </div>

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
              onChange={(e) => setAsset({ ...asset, supplier: e.target.value })}
              className="w-full"
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
              showIcon
            />
          </div>
        </div>

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
              showIcon
            />
          </div>
        </div>

        <div className="form-field">
          <label htmlFor="description">Description</label>
          <InputTextarea
            id="description"
            value={asset.description}
            onChange={(e) =>
              setAsset({ ...asset, description: e.target.value })
            }
            rows={3}
            className="w-full"
          />
        </div>

        <div className="form-actions">
          <Button
            label="Cancel"
            icon="pi pi-times"
            onClick={onCancel}
            className="p-button-text"
          />
          <Button
            label="Create Asset"
            icon="pi pi-check"
            onClick={handleSave}
            className="p-button-primary"
          />
        </div>
      </div>
    </div>
  );
};
