import React, { useState, useEffect } from "react";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { Dropdown } from "primereact/dropdown";
import { InputNumber } from "primereact/inputnumber";
import { useToast } from "@/hooks/useToast";
import { sampleLocations } from "@/data/sampleData";
import "./AssetLocationForm.css";
import { Toast } from "primereact/toast";
import { Location } from "@/types/models";

interface AssetLocationFormDialogProps {
  onSave: (location: Location) => void;
  onCancel: () => void;
  locationId?: string;
  mode?: "add" | "edit";
  toastRef?: React.RefObject<Toast | null>;
}

export const AssetLocationFormDialog: React.FC<AssetLocationFormDialogProps> = ({
  onSave,
  onCancel,
  locationId,
  mode = "add",
  toastRef
}) => {
  const { showSuccess, showError } = useToast(toastRef || { current: null });

  const [formData, setFormData] = useState<Location>({
    id: "",
    name: "",
    code: "",
    description: "",
    parentLocation: "",
    address: "",
    contactPerson: "",
    contactEmail: "",
    contactPhone: "",
    building: "",
    floor: "",
    room: "",
    type: "office",
    capacity: 0,
    assetCount: 0,
    lastUpdated: "",
    status: "active",
    isActive: true
  });

  const [loading, setLoading] = useState(false);
  const isEditMode = mode === "edit" && locationId && locationId !== "new";

  useEffect(() => {
    if (isEditMode && locationId) {
      // Load existing location data
      const existingLocation = sampleLocations.find(
        (loc) => loc.id === locationId
      );
      if (existingLocation) {
        setFormData({
          id: existingLocation.id,
          name: existingLocation.name,
          code: existingLocation.code || "",
          description: existingLocation.description,
          parentLocation: existingLocation.parentLocation || "",
          address: existingLocation.address || "",
          contactPerson: existingLocation.contactPerson || "",
          contactEmail: existingLocation.contactEmail || "",
          contactPhone: existingLocation.contactPhone || "",
          building: existingLocation.building || "",
          floor: existingLocation.floor || "",
          room: existingLocation.room || "",
          type: existingLocation.type || "office",
          capacity: existingLocation.capacity || 0,
          assetCount: existingLocation.assetCount || 0,
          lastUpdated: existingLocation.lastUpdated || "",
          status: existingLocation.status || "active",
          isActive: existingLocation.isActive ?? true
        });
      }
    }
  }, [locationId, isEditMode]);

  const handleInputChange = (field: keyof Location, value: unknown) => {
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
        showSuccess("Location updated successfully");
      } else {
        showSuccess("Location created successfully");
      }

      onSave(formData);
    } catch {
      showError("Failed to save location");
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

  const typeOptions = [
    { label: "Office", value: "office" },
    { label: "Warehouse", value: "warehouse" },
    { label: "Factory", value: "factory" },
    { label: "Lab", value: "lab" },
    { label: "Outdoor", value: "outdoor" }
  ];

  const parentLocationOptions = sampleLocations.map((loc) => ({
    label: loc.name,
    value: loc.id
  }));

  return (
    <div className="asset-location-form-dialog">
      <form onSubmit={handleSubmit} className="asset-form">
        <div className="form-row">
          <div className="form-field">
            <label htmlFor="name">Name *</label>
            <InputText
              id="name"
              value={formData.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
              placeholder="Enter location name"
              required
            />
          </div>
          <div className="form-field">
            <label htmlFor="code">Code *</label>
            <InputText
              id="code"
              value={formData.code}
              onChange={(e) => handleInputChange("code", e.target.value)}
              placeholder="Enter location code"
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
            placeholder="Enter location description"
            rows={3}
          />
        </div>

        <div className="form-row">
          <div className="form-field">
            <label htmlFor="parentLocation">Parent Location</label>
            <Dropdown
              id="parentLocation"
              value={formData.parentLocation}
              options={parentLocationOptions}
              onChange={(e) => handleInputChange("parentLocation", e.value)}
              placeholder="Select parent location"
              showClear
            />
          </div>
          <div className="form-field">
            <label htmlFor="type">Type</label>
            <Dropdown
              id="type"
              value={formData.type}
              options={typeOptions}
              onChange={(e) => handleInputChange("type", e.value)}
              placeholder="Select location type"
            />
          </div>
        </div>

        <div className="form-field">
          <label htmlFor="address">Address</label>
          <InputTextarea
            id="address"
            value={formData.address}
            onChange={(e) => handleInputChange("address", e.target.value)}
            placeholder="Enter location address"
            rows={2}
          />
        </div>

        <div className="form-row">
          <div className="form-field">
            <label htmlFor="building">Building</label>
            <InputText
              id="building"
              value={formData.building}
              onChange={(e) => handleInputChange("building", e.target.value)}
              placeholder="Enter building"
            />
          </div>
          <div className="form-field">
            <label htmlFor="floor">Floor</label>
            <InputText
              id="floor"
              value={formData.floor}
              onChange={(e) => handleInputChange("floor", e.target.value)}
              placeholder="Enter floor"
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-field">
            <label htmlFor="room">Room</label>
            <InputText
              id="room"
              value={formData.room}
              onChange={(e) => handleInputChange("room", e.target.value)}
              placeholder="Enter room"
            />
          </div>
          <div className="form-field">
            <label htmlFor="capacity">Capacity</label>
            <InputNumber
              id="capacity"
              value={formData.capacity}
              onValueChange={(e) => handleInputChange("capacity", e.value || 0)}
              placeholder="Enter capacity"
              min={0}
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-field">
            <label htmlFor="contactPerson">Contact Person</label>
            <InputText
              id="contactPerson"
              value={formData.contactPerson}
              onChange={(e) => handleInputChange("contactPerson", e.target.value)}
              placeholder="Enter contact person"
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
            <label htmlFor="contactEmail">Contact Email</label>
            <InputText
              id="contactEmail"
              type="email"
              value={formData.contactEmail}
              onChange={(e) => handleInputChange("contactEmail", e.target.value)}
              placeholder="Enter contact email"
            />
          </div>
          <div className="form-field">
            <label htmlFor="contactPhone">Contact Phone</label>
            <InputText
              id="contactPhone"
              value={formData.contactPhone}
              onChange={(e) => handleInputChange("contactPhone", e.target.value)}
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
            label={isEditMode ? "Update Location" : "Create Location"}
            icon="pi pi-check"
            loading={loading}
            className="p-button-primary"
          />
        </div>
      </form>
    </div>
  );
}; 
