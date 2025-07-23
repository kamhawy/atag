import React, { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { Card } from "primereact/card";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Tag } from "primereact/tag";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import { Toast } from "primereact/toast";
import { Plus, Edit, Trash2 } from "lucide-react";
import "./AssetLocations.css";
import { Location } from "@/types/models";
import { RefObject } from "react";
import { useToast } from "@/hooks/useToast";
import { sampleLocations } from "@/data/sampleData";
import "./AssetLocations.css";

interface AssetLocationsProps {
  toastRef?: RefObject<Toast | null>;
}

export const AssetLocations: React.FC<AssetLocationsProps> = ({ toastRef }) => {
  const navigate = useNavigate();
  const toast = useToast(toastRef || { current: null });

  // Use centralized sample data
  const [locations, setLocations] = useState<Location[]>(sampleLocations);

  const getStatusSeverity = (status: string) => {
    switch (status) {
      case "active":
        return "success";
      case "inactive":
        return "danger";
      case "maintenance":
        return "warning";
      default:
        return "info";
    }
  };

  const getTypeSeverity = (type: string) => {
    switch (type) {
      case "office":
        return "info";
      case "conference":
        return "info";
      case "storage":
        return "secondary";
      case "lab":
        return "warning";
      default:
        return "info";
    }
  };

  const statusBodyTemplate = (rowData: Location) => {
    return (
      <Tag
        value={rowData.status}
        severity={getStatusSeverity(rowData.status)}
        className="status-tag"
      />
    );
  };

  const typeBodyTemplate = (rowData: Location) => {
    return (
      <Tag
        value={rowData.type}
        severity={getTypeSeverity(rowData.type)}
        className="type-tag"
      />
    );
  };

  const actionsBodyTemplate = (rowData: Location) => {
    return (
      <div className="action-buttons">
        <Button
          icon={<Edit size={16} />}
          className="p-button-text p-button-rounded p-button-sm"
          tooltip="Edit Location"
          onClick={() => editLocation(rowData)}
        />
        <Button
          icon={<Trash2 size={16} />}
          className="p-button-text p-button-rounded p-button-sm p-button-danger"
          tooltip="Delete Location"
          onClick={() => confirmDelete(rowData)}
        />
      </div>
    );
  };

  const editLocation = (location: Location) => {
    navigate({ to: `/master/locations/${location.id}` });
  };

  const confirmDelete = (location: Location) => {
    confirmDialog({
      message: `Are you sure you want to delete location "${location.name}"?`,
      header: "Delete Confirmation",
      icon: "pi pi-exclamation-triangle",
      accept: () => deleteLocation(location.id)
    });
  };

  const deleteLocation = (id: string) => {
    setLocations(locations.filter((loc) => loc.id !== id));
    toast.showDeleted("Location");
  };

  const openNew = () => {
    navigate({ to: "/master/locations/new" });
  };

  return (
    <div className="asset-locations">
      <div className="asset-locations-header">
        <div className="asset-locations-header-left">
          <h1>Asset Locations</h1>
          <p>Manage facility locations and spaces</p>
        </div>
        <div className="asset-locations-header-right">
          <Button
            icon={<Plus size={20} />}
            label="Add Location"
            className="p-button-primary"
            onClick={openNew}
          />
        </div>
      </div>

      <Card>
        <DataTable
          value={locations}
          paginator
          rows={10}
          rowsPerPageOptions={[5, 10, 25, 50]}
          tableStyle={{ minWidth: "50rem" }}
          emptyMessage="No locations found."
          loading={false}
          stripedRows
          showGridlines
          responsiveLayout="scroll"
        >
          <Column
            field="name"
            header="Name"
            sortable
            style={{ minWidth: "200px" }}
          />
          <Column
            field="building"
            header="Building"
            sortable
            style={{ minWidth: "150px" }}
          />
          <Column
            field="floor"
            header="Floor"
            sortable
            style={{ minWidth: "100px" }}
          />
          <Column
            field="room"
            header="Room"
            sortable
            style={{ minWidth: "100px" }}
          />
          <Column
            field="type"
            header="Type"
            body={typeBodyTemplate}
            sortable
            style={{ minWidth: "120px" }}
          />
          <Column
            field="capacity"
            header="Capacity"
            sortable
            style={{ minWidth: "100px" }}
          />
          <Column
            field="assetCount"
            header="Assets"
            sortable
            style={{ minWidth: "80px" }}
          />
          <Column
            field="status"
            header="Status"
            body={statusBodyTemplate}
            sortable
            style={{ minWidth: "120px" }}
          />
          <Column
            field="lastUpdated"
            header="Last Updated"
            sortable
            style={{ minWidth: "120px" }}
          />
          <Column
            header="Actions"
            body={actionsBodyTemplate}
            style={{ minWidth: "120px" }}
          />
        </DataTable>
      </Card>

      <ConfirmDialog />
    </div>
  );
};
