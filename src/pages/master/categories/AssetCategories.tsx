import React, { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { RefObject } from "react";
import { Card } from "primereact/card";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Tag } from "primereact/tag";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import { Toast } from "primereact/toast";
import { Plus, Edit, Trash2, Tag as TagIcon } from "lucide-react";
import "./AssetCategories.css";
import { Category } from "@/types/models";
import { useToast } from "@/hooks/useToast";
import { sampleAssetCategories } from "@/data/sampleData";

interface AssetCategoriesProps {
  toastRef?: RefObject<Toast | null>;
}

export const AssetCategories: React.FC<AssetCategoriesProps> = ({
  toastRef
}) => {
  const navigate = useNavigate();
  const toast = useToast(toastRef || { current: null });
  // Use centralized sample data
  const [categories, setCategories] = useState<Category[]>(
    sampleAssetCategories
  );

  const getStatusSeverity = (status: string) => {
    return status === "active" ? "success" : "danger";
  };

  const statusBodyTemplate = (rowData: Category) => {
    return (
      <Tag
        value={rowData.status}
        severity={getStatusSeverity(rowData.status)}
        className="status-tag"
      />
    );
  };

  const colorBodyTemplate = (rowData: Category) => {
    return (
      <div className="color-indicator">
        <div
          className="color-swatch"
          style={{ backgroundColor: rowData.color }}
        />
        <span>{rowData.color}</span>
      </div>
    );
  };

  const iconBodyTemplate = (rowData: Category) => {
    return (
      <div className="icon-display">
        <TagIcon size={16} />
        <span>{rowData.icon}</span>
      </div>
    );
  };

  const actionsBodyTemplate = (rowData: Category) => {
    return (
      <div className="action-buttons">
        <Button
          icon={<Edit size={16} />}
          className="p-button-text p-button-rounded p-button-sm"
          tooltip="Edit Category"
          onClick={() => editCategory(rowData)}
        />
        <Button
          icon={<Trash2 size={16} />}
          className="p-button-text p-button-rounded p-button-sm p-button-danger"
          tooltip="Delete Category"
          onClick={() => confirmDelete(rowData)}
        />
      </div>
    );
  };

  const editCategory = (category: Category) => {
    if (!category.id) {
      return;
    }
    navigate({ to: `/master/categories/${category.id}` });
  };

  const confirmDelete = (category: Category) => {
    confirmDialog({
      message: `Are you sure you want to delete category "${category.name}"?`,
      header: "Delete Confirmation",
      icon: "pi pi-exclamation-triangle",
      accept: () => deleteCategory(category.id)
    });
  };

  const deleteCategory = (id: string) => {
    setCategories(categories.filter((cat) => cat.id !== id));
    toast.showDeleted("Category");
  };

  const openNew = () => {
    navigate({ to: "/master/categories/new" });
  };

  return (
    <div className="asset-categories">
      <div className="asset-categories-header">
        <div className="asset-categories-header-left">
          <h1>Asset Categories</h1>
          <p>Manage asset categories and classifications</p>
        </div>
        <div className="asset-categories-header-right">
          <Button
            icon={<Plus size={20} />}
            label="Add Category"
            className="p-button-primary"
            onClick={openNew}
          />
        </div>
      </div>

      <Card className="asset-categories-card">
        <DataTable
          value={categories}
          paginator
          rows={10}
          rowsPerPageOptions={[10, 20, 50]}
          className="common-data-table"
          emptyMessage="No categories found"
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
            field="description"
            header="Description"
            sortable
            style={{ minWidth: "250px" }}
          />
          <Column
            field="parentCategory"
            header="Parent"
            sortable
            style={{ minWidth: "150px" }}
          />
          <Column
            field="color"
            header="Color"
            body={colorBodyTemplate}
            style={{ minWidth: "120px" }}
          />
          <Column
            field="icon"
            header="Icon"
            body={iconBodyTemplate}
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
            style={{ minWidth: "165px" }}
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
