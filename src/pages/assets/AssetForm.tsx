import React, { useState } from "react";
import { Card } from "primereact/card";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { Tag } from "primereact/tag";
import { Dialog } from "primereact/dialog";
import { Calendar } from "primereact/calendar";
import { InputNumber } from "primereact/inputnumber";
import { InputTextarea } from "primereact/inputtextarea";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import {
  Plus,
  Edit,
  Trash2,
  Search,
  Filter,
  Download,
  Eye
} from "lucide-react";
import "@/pages/assets/AssetForm.css";
import { Asset } from "@/types/models";
import { useToast } from "@/hooks/useToast";
import { sampleAssets, dropdownOptions } from "@/data/sampleData";
import { Toast } from "primereact/toast";

interface AssetFormProps {
  toastRef?: React.RefObject<Toast | null>;
  mode?: "add" | "edit";
}

export const AssetForm: React.FC<AssetFormProps> = ({
  toastRef,
  mode = "add"
}) => {
  const toast = useToast(toastRef || { current: null });
  // Use centralized sample data
  const [assets, setAssets] = useState<Asset[]>(sampleAssets);

  const [selectedAsset, setSelectedAsset] = useState<Asset | null>(null);
  const [showDialog, setShowDialog] = useState(false);
  const [isEdit, setIsEdit] = useState(mode === "edit");
  const [globalFilter, setGlobalFilter] = useState("");

  // Use centralized dropdown options
  const categories = dropdownOptions.categories;
  const locations = dropdownOptions.locations;
  const statuses = dropdownOptions.statuses;
  const conditions = dropdownOptions.conditions;

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

  const statusBodyTemplate = (rowData: Asset) => {
    return (
      <Tag
        value={rowData.status}
        severity={getStatusSeverity(rowData.status)}
        className="status-tag"
      />
    );
  };

  const conditionBodyTemplate = (rowData: Asset) => {
    return (
      <Tag
        value={rowData.condition}
        severity={getConditionSeverity(rowData.condition)}
        className="condition-tag"
      />
    );
  };

  const priceBodyTemplate = (rowData: Asset) => {
    return (
      <span className="price-value">
        ${rowData.purchasePrice.toLocaleString()}
      </span>
    );
  };

  const actionsBodyTemplate = (rowData: Asset) => {
    return (
      <div className="action-buttons">
        <Button
          icon={<Eye size={16} />}
          className="p-button-text p-button-rounded p-button-sm"
          tooltip="View Asset"
          onClick={() => viewAsset(rowData)}
        />
        <Button
          icon={<Edit size={16} />}
          className="p-button-text p-button-rounded p-button-sm"
          tooltip="Edit Asset"
          onClick={() => editAsset(rowData)}
        />
        <Button
          icon={<Trash2 size={16} />}
          className="p-button-text p-button-rounded p-button-sm p-button-danger"
          tooltip="Delete Asset"
          onClick={() => confirmDelete(rowData)}
        />
      </div>
    );
  };

  const viewAsset = (asset: Asset) => {
    setSelectedAsset(asset);
    setIsEdit(false);
    setShowDialog(true);
  };

  const editAsset = (asset: Asset) => {
    setSelectedAsset({ ...asset });
    setIsEdit(true);
    setShowDialog(true);
  };

  const confirmDelete = (asset: Asset) => {
    confirmDialog({
      message: `Are you sure you want to delete asset "${asset.name}"?`,
      header: "Delete Confirmation",
      icon: "pi pi-exclamation-triangle",
      accept: () => deleteAsset(asset.id)
    });
  };

  const deleteAsset = (id: string) => {
    setAssets(assets.filter((asset) => asset.id !== id));
    toast.showDeleted("Asset");
  };

  const saveAsset = () => {
    if (selectedAsset) {
      if (isEdit) {
        setAssets(
          assets.map((asset) =>
            asset.id === selectedAsset.id ? selectedAsset : asset
          )
        );
        toast.showUpdated("Asset");
      } else {
        const newAsset = {
          ...selectedAsset,
          id: `AST${String(assets.length + 1).padStart(3, "0")}`,
          lastUpdated: new Date().toISOString().split("T")[0]
        };
        setAssets([...assets, newAsset]);
        toast.showCreated("Asset");
      }
    }
    setShowDialog(false);
    setSelectedAsset(null);
    setIsEdit(false);
  };

  const openNew = () => {
    setSelectedAsset({
      id: "",
      name: "",
      assetTag: "",
      category: "",
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
    setIsEdit(false);
    setShowDialog(true);
  };

  const dialogFooter = (
    <div className="dialog-footer">
      <Button
        label="Cancel"
        icon="pi pi-times"
        onClick={() => setShowDialog(false)}
        className="p-button-text"
      />
      {isEdit && (
        <Button label="Save" icon="pi pi-check" onClick={saveAsset} autoFocus />
      )}
    </div>
  );

  const header = (
    <div className="table-header">
      <div className="header-left">
        <h2>Asset Inventory</h2>
        <span className="asset-count">{assets.length} assets</span>
      </div>
      <div className="header-right">
        <div className="search-box">
          <Search size={16} />
          <InputText
            placeholder="Search assets..."
            value={globalFilter}
            onChange={(e) => setGlobalFilter(e.target.value)}
            className="search-input"
          />
        </div>
        <Button
          icon={<Filter size={16} />}
          label="Filter"
          className="p-button-outlined"
        />
        <Button
          icon={<Download size={16} />}
          label="Export"
          className="p-button-outlined"
        />
        <Button
          icon={<Plus size={16} />}
          label="Add Asset"
          className="p-button-primary"
          onClick={openNew}
        />
      </div>
    </div>
  );

  return (
    <div className="asset-management">
      <div className="asset-form-header">
        <div className="asset-form-header-left">
          <h1>Asset Management</h1>
          <p>Manage and track all facility assets</p>
        </div>
      </div>

      <Card className="asset-form-card">
        <DataTable
          value={assets}
          paginator
          rows={10}
          rowsPerPageOptions={[10, 20, 50]}
          className="asset-form-table"
          emptyMessage="No assets found"
          stripedRows
          showGridlines
          globalFilter={globalFilter}
          header={header}
        >
          <Column field="name" header="Asset Name" sortable />
          <Column field="assetTag" header="Asset Tag" sortable />
          <Column field="category" header="Category" sortable />
          <Column field="location" header="Location" sortable />
          <Column
            field="status"
            header="Status"
            body={statusBodyTemplate}
            sortable
          />
          <Column
            field="condition"
            header="Condition"
            body={conditionBodyTemplate}
            sortable
          />
          <Column
            field="purchasePrice"
            header="Purchase Price"
            body={priceBodyTemplate}
            sortable
          />
          <Column field="assignedTo" header="Assigned To" sortable />
          <Column
            header="Actions"
            body={actionsBodyTemplate}
            style={{ width: "120px" }}
          />
        </DataTable>
      </Card>

      <Dialog
        visible={showDialog}
        onHide={() => setShowDialog(false)}
        header={isEdit ? "Edit Asset" : "Add New Asset"}
        footer={dialogFooter}
        className="asset-dialog"
        modal
        style={{ width: "600px" }}
      >
        {selectedAsset && (
          <div className="asset-form">
            <div className="form-row">
              <div className="form-field">
                <label htmlFor="name">Asset Name</label>
                <InputText
                  id="name"
                  value={selectedAsset.name}
                  onChange={(e) =>
                    setSelectedAsset({ ...selectedAsset, name: e.target.value })
                  }
                  className="w-full"
                  disabled={!isEdit}
                />
              </div>
              <div className="form-field">
                <label htmlFor="assetTag">Asset Tag</label>
                <InputText
                  id="assetTag"
                  value={selectedAsset.assetTag}
                  onChange={(e) =>
                    setSelectedAsset({
                      ...selectedAsset,
                      assetTag: e.target.value
                    })
                  }
                  className="w-full"
                  disabled={!isEdit}
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-field">
                <label htmlFor="category">Category</label>
                <Dropdown
                  id="category"
                  value={selectedAsset.category}
                  options={categories}
                  onChange={(e) =>
                    setSelectedAsset({ ...selectedAsset, category: e.value })
                  }
                  className="w-full"
                  disabled={!isEdit}
                />
              </div>
              <div className="form-field">
                <label htmlFor="location">Location</label>
                <Dropdown
                  id="location"
                  value={selectedAsset.location}
                  options={locations}
                  onChange={(e) =>
                    setSelectedAsset({ ...selectedAsset, location: e.value })
                  }
                  className="w-full"
                  disabled={!isEdit}
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-field">
                <label htmlFor="status">Status</label>
                <Dropdown
                  id="status"
                  value={selectedAsset.status}
                  options={statuses}
                  onChange={(e) =>
                    setSelectedAsset({ ...selectedAsset, status: e.value })
                  }
                  className="w-full"
                  disabled={!isEdit}
                />
              </div>
              <div className="form-field">
                <label htmlFor="condition">Condition</label>
                <Dropdown
                  id="condition"
                  value={selectedAsset.condition}
                  options={conditions}
                  onChange={(e) =>
                    setSelectedAsset({ ...selectedAsset, condition: e.value })
                  }
                  className="w-full"
                  disabled={!isEdit}
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-field">
                <label htmlFor="purchaseDate">Purchase Date</label>
                <Calendar
                  id="purchaseDate"
                  value={selectedAsset.purchaseDate}
                  onChange={(e) =>
                    setSelectedAsset({
                      ...selectedAsset,
                      purchaseDate: e.value as Date
                    })
                  }
                  className="w-full"
                  disabled={!isEdit}
                />
              </div>
              <div className="form-field">
                <label htmlFor="purchasePrice">Purchase Price</label>
                <InputNumber
                  id="purchasePrice"
                  value={selectedAsset.purchasePrice}
                  onValueChange={(e) =>
                    setSelectedAsset({
                      ...selectedAsset,
                      purchasePrice: e.value || 0
                    })
                  }
                  className="w-full"
                  disabled={!isEdit}
                  mode="currency"
                  currency="USD"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-field">
                <label htmlFor="supplier">Supplier</label>
                <InputText
                  id="supplier"
                  value={selectedAsset.supplier}
                  onChange={(e) =>
                    setSelectedAsset({
                      ...selectedAsset,
                      supplier: e.target.value
                    })
                  }
                  className="w-full"
                  disabled={!isEdit}
                />
              </div>
              <div className="form-field">
                <label htmlFor="warrantyExpiry">Warranty Expiry</label>
                <Calendar
                  id="warrantyExpiry"
                  value={selectedAsset.warrantyExpiry}
                  onChange={(e) =>
                    setSelectedAsset({
                      ...selectedAsset,
                      warrantyExpiry: e.value as Date
                    })
                  }
                  className="w-full"
                  disabled={!isEdit}
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-field">
                <label htmlFor="serialNumber">Serial Number</label>
                <InputText
                  id="serialNumber"
                  value={selectedAsset.serialNumber}
                  onChange={(e) =>
                    setSelectedAsset({
                      ...selectedAsset,
                      serialNumber: e.target.value
                    })
                  }
                  className="w-full"
                  disabled={!isEdit}
                />
              </div>
              <div className="form-field">
                <label htmlFor="model">Model</label>
                <InputText
                  id="model"
                  value={selectedAsset.model}
                  onChange={(e) =>
                    setSelectedAsset({
                      ...selectedAsset,
                      model: e.target.value
                    })
                  }
                  className="w-full"
                  disabled={!isEdit}
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-field">
                <label htmlFor="manufacturer">Manufacturer</label>
                <InputText
                  id="manufacturer"
                  value={selectedAsset.manufacturer}
                  onChange={(e) =>
                    setSelectedAsset({
                      ...selectedAsset,
                      manufacturer: e.target.value
                    })
                  }
                  className="w-full"
                  disabled={!isEdit}
                />
              </div>
              <div className="form-field">
                <label htmlFor="assignedTo">Assigned To</label>
                <InputText
                  id="assignedTo"
                  value={selectedAsset.assignedTo}
                  onChange={(e) =>
                    setSelectedAsset({
                      ...selectedAsset,
                      assignedTo: e.target.value
                    })
                  }
                  className="w-full"
                  disabled={!isEdit}
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-field">
                <label htmlFor="lastMaintenance">Last Maintenance</label>
                <Calendar
                  id="lastMaintenance"
                  value={selectedAsset.lastMaintenance}
                  onChange={(e) =>
                    setSelectedAsset({
                      ...selectedAsset,
                      lastMaintenance: e.value as Date
                    })
                  }
                  className="w-full"
                  disabled={!isEdit}
                />
              </div>
              <div className="form-field">
                <label htmlFor="nextMaintenance">Next Maintenance</label>
                <Calendar
                  id="nextMaintenance"
                  value={selectedAsset.nextMaintenance}
                  onChange={(e) =>
                    setSelectedAsset({
                      ...selectedAsset,
                      nextMaintenance: e.value as Date
                    })
                  }
                  className="w-full"
                  disabled={!isEdit}
                />
              </div>
            </div>

            <div className="form-field">
              <label htmlFor="description">Description</label>
              <InputTextarea
                id="description"
                value={selectedAsset.description}
                onChange={(e) =>
                  setSelectedAsset({
                    ...selectedAsset,
                    description: e.target.value
                  })
                }
                rows={3}
                className="w-full"
                disabled={!isEdit}
              />
            </div>
          </div>
        )}
      </Dialog>

      <ConfirmDialog />
    </div>
  );
};
