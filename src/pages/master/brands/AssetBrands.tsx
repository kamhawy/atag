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
import { sampleBrands } from "@/data/sampleData";
import { AssetBrand } from "@/types/models";
import "./AssetBrandForm.css";

interface AssetBrandsProps {
  toastRef?: RefObject<Toast | null>;
}

export const AssetBrands: React.FC<AssetBrandsProps> = ({ toastRef }) => {
  const navigate = useNavigate();
  const toast = useToast(toastRef || { current: null });

  // Use centralized sample data
  const [brands, setBrands] = useState(sampleBrands);

  const getStatusSeverity = (status: string) => {
    return status === "active" ? "success" : "danger";
  };

  const statusBodyTemplate = (rowData: AssetBrand) => {
    return (
      <Tag
        value={rowData.isActive ? "Active" : "Inactive"}
        severity={getStatusSeverity(rowData.isActive ? "active" : "inactive")}
        className="status-tag"
      />
    );
  };

  const actionsBodyTemplate = (rowData: AssetBrand) => {
    return (
      <div className="action-buttons">
        <Button
          icon={<Edit size={16} />}
          className="p-button-text p-button-rounded p-button-sm"
          tooltip="Edit Brand"
          onClick={() => editBrand(rowData)}
        />
        <Button
          icon={<Trash2 size={16} />}
          className="p-button-text p-button-rounded p-button-sm p-button-danger"
          tooltip="Delete Brand"
          onClick={() => confirmDelete(rowData)}
        />
      </div>
    );
  };

  const editBrand = (brand: AssetBrand) => {
    navigate({ to: `/master/brands/${brand.id}` });
  };

  const confirmDelete = (brand: AssetBrand) => {
    confirmDialog({
      message: `Are you sure you want to delete brand "${brand.name}"?`,
      header: "Delete Confirmation",
      icon: "pi pi-exclamation-triangle",
      accept: () => deleteBrand(brand.id)
    });
  };

  const deleteBrand = (id: string) => {
    setBrands(brands.filter((brand) => brand.id !== id));
    toast.showDeleted("Brand");
  };

  const openNew = () => {
    navigate({ to: "/master/brands/new" });
  };

  return (
    <div className="asset-brands">
      <div className="asset-brands-header">
        <div className="asset-brands-header-left">
          <h1>Asset Brands</h1>
          <p>Manage asset brands and manufacturers</p>
        </div>
        <div className="asset-brands-header-right">
          <Button
            icon={<Plus size={20} />}
            label="Add Brand"
            className="p-button-primary"
            onClick={openNew}
          />
        </div>
      </div>

      <Card>
        <DataTable
          value={brands}
          paginator
          rows={10}
          rowsPerPageOptions={[5, 10, 25, 50]}
          tableStyle={{ minWidth: "50rem" }}
          emptyMessage="No brands found."
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
            field="website"
            header="Website"
            style={{ minWidth: "150px" }}
          />
          <Column
            field="contactEmail"
            header="Contact Email"
            style={{ minWidth: "180px" }}
          />
          <Column
            field="contactPhone"
            header="Contact Phone"
            style={{ minWidth: "140px" }}
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
