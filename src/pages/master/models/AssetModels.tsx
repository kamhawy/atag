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
import { RefObject } from "react";
import { useToast } from "@/hooks/useToast";
import {
  sampleModels,
  sampleBrands,
  sampleAssetCategories
} from "@/data/sampleData";
import "./AssetModels.css";
import { Model } from "@/types/models";

interface AssetModelsProps {
  toastRef?: RefObject<Toast | null>;
}

export const AssetModels: React.FC<AssetModelsProps> = ({ toastRef }) => {
  const navigate = useNavigate();
  const toast = useToast(toastRef || { current: null });

  // Use centralized sample data
  const [models, setModels] = useState(sampleModels);

  const getStatusSeverity = (status: string) => {
    return status === "active" ? "success" : "danger";
  };

  const statusBodyTemplate = (rowData: Model) => {
    return (
      <Tag
        value={rowData.isActive ? "Active" : "Inactive"}
        severity={getStatusSeverity(rowData.isActive ? "active" : "inactive")}
        className="status-tag"
      />
    );
  };

  const brandBodyTemplate = (rowData: Model) => {
    const brand = sampleBrands.find((b) => b.id === rowData.brandId);
    return brand ? brand.name : "Unknown";
  };

  const categoryBodyTemplate = (rowData: Model) => {
    const category = sampleAssetCategories.find(
      (c) => c.id === rowData.categoryId
    );
    return category ? category.name : "Unknown";
  };

  const actionsBodyTemplate = (rowData: Model) => {
    return (
      <div className="action-buttons">
        <Button
          icon={<Edit size={16} />}
          className="p-button-text p-button-rounded p-button-sm"
          tooltip="Edit Model"
          onClick={() => editModel(rowData)}
        />
        <Button
          icon={<Trash2 size={16} />}
          className="p-button-text p-button-rounded p-button-sm p-button-danger"
          tooltip="Delete Model"
          onClick={() => confirmDelete(rowData)}
        />
      </div>
    );
  };

  const editModel = (model: Model) => {
    navigate({ to: `/master/models/${model.id}` });
  };

  const confirmDelete = (model: Model) => {
    confirmDialog({
      message: `Are you sure you want to delete model "${model.name}"?`,
      header: "Delete Confirmation",
      icon: "pi pi-exclamation-triangle",
      accept: () => deleteModel(model.id)
    });
  };

  const deleteModel = (id: string) => {
    setModels(models.filter((model) => model.id !== id));
    toast.showDeleted("Model");
  };

  const openNew = () => {
    navigate({ to: "/master/models/new" });
  };

  return (
    <div className="asset-models">
      <div className="asset-models-header">
        <div className="asset-models-header-left">
          <h1>Asset Models</h1>
          <p>Manage asset models and specifications</p>
        </div>
        <div className="asset-models-header-right">
          <Button
            icon={<Plus size={20} />}
            label="Add Model"
            className="p-button-primary"
            onClick={openNew}
          />
        </div>
      </div>

      <Card>
        <DataTable
          value={models}
          paginator
          rows={10}
          rowsPerPageOptions={[5, 10, 25, 50]}
          tableStyle={{ minWidth: "50rem" }}
          className="common-data-table"
          emptyMessage="No models found."
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
            field="code"
            header="Code"
            sortable
            style={{ minWidth: "120px" }}
          />
          <Column
            field="brandId"
            header="Brand"
            body={brandBodyTemplate}
            sortable
            style={{ minWidth: "150px" }}
          />
          <Column
            field="categoryId"
            header="Category"
            body={categoryBodyTemplate}
            sortable
            style={{ minWidth: "150px" }}
          />
          <Column
            field="year"
            header="Year"
            sortable
            style={{ minWidth: "100px" }}
          />
          <Column
            field="specifications"
            header="Specifications"
            style={{ minWidth: "200px" }}
          />
          <Column
            field="isActive"
            header="Status"
            body={statusBodyTemplate}
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
