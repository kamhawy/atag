import React, { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { RefObject } from "react";
import { Card } from "primereact/card";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Tag } from "primereact/tag";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import { Dialog } from "primereact/dialog";
import { Toast } from "primereact/toast";
import { Tree } from "primereact/tree";
import {
  Plus,
  Edit,
  Trash2,
  Tag as TagIcon,
  Grid,
  List,
  GitBranch,
  Search,
  Package
} from "lucide-react";
import "./AssetCategories.css";
import { Category } from "@/types/models";
import { useToast } from "@/hooks/useToast";
import { useAddAsset } from "@/hooks/useAddAsset";
import { sampleAssetCategories } from "@/data/sampleData";
import { AssetCategoryFormDialog } from "./AssetCategoryFormDialog";
import { AddAssetDialog } from "@/pages/assets/AddAssetDialog";

interface AssetCategoriesProps {
  toastRef?: RefObject<Toast | null>;
}

type ViewMode = "table" | "cards" | "tree";

interface TreeNode {
  key: string;
  label: string;
  data: Category;
  children?: TreeNode[];
  icon?: string;
}

export const AssetCategories: React.FC<AssetCategoriesProps> = ({
  toastRef
}) => {
  const navigate = useNavigate();
  const toast = useToast(toastRef || { current: null });
  const [categories, setCategories] = useState<Category[]>(
    sampleAssetCategories
  );
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [viewMode, setViewMode] = useState<ViewMode>("table");
  const [searchTerm, setSearchTerm] = useState("");

  // Use the AddAsset hook
  const {
    showAddAssetDialog,
    selectedCategory,
    openAddAssetDialog,
    handleSaveAsset,
    handleCancelAddAsset
  } = useAddAsset({
    toastRef,
    onAssetCreated: (asset) => {
      // Here you could update the category's asset count or refresh data
      toast.showSuccess(`Asset created successfully : ${asset.name}`);
    }
  });

  // Convert categories to tree structure
  const buildTreeData = (categories: Category[]): TreeNode[] => {
    const categoryMap = new Map<string, Category>();
    const rootNodes: TreeNode[] = [];

    // First pass: create a map of all categories
    categories.forEach((category) => {
      categoryMap.set(category.id, category);
    });

    // Second pass: build the tree structure
    categories.forEach((category) => {
      const treeNode: TreeNode = {
        key: category.id,
        label: category.name,
        data: category,
        icon: category.icon
      };

      if (!category.parentCategory || category.parentCategory === "") {
        // Root node
        rootNodes.push(treeNode);
      } else {
        // Child node
        const parent = categoryMap.get(category.parentCategory);
        if (parent) {
          const parentTreeNode = findTreeNode(
            rootNodes,
            category.parentCategory
          );
          if (parentTreeNode) {
            if (!parentTreeNode.children) {
              parentTreeNode.children = [];
            }
            parentTreeNode.children.push(treeNode);
          }
        }
      }
    });

    return rootNodes;
  };

  const findTreeNode = (nodes: TreeNode[], key: string): TreeNode | null => {
    for (const node of nodes) {
      if (node.key === key) {
        return node;
      }
      if (node.children) {
        const found = findTreeNode(node.children, key);
        if (found) return found;
      }
    }
    return null;
  };

  // Filter categories based on search term
  const filteredCategories = categories.filter(
    (category) =>
      category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      category.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      category.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (category.parentCategory &&
        category.parentCategory
          .toLowerCase()
          .includes(searchTerm.toLowerCase()))
  );

  const treeData = buildTreeData(filteredCategories);

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
          className="p-button-text p-button-rounded p-button-sm p-button-success"
          tooltip="Add Asset to Category"
          onClick={() => openAddAssetDialog(rowData.name)}
        >
          <Package size={16} />
        </Button>
        <Button
          className="p-button-text p-button-rounded p-button-sm"
          tooltip="Edit Category"
          onClick={() => editCategory(rowData)}
        >
          <Edit size={16} />
        </Button>
        <Button
          className="p-button-text p-button-rounded p-button-sm p-button-danger"
          tooltip="Delete Category"
          onClick={() => confirmDelete(rowData)}
        >
          <Trash2 size={16} />
        </Button>
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
    setShowAddDialog(true);
  };

  const handleCancelAdd = () => {
    setShowAddDialog(false);
  };

  const handleSaveCategory = (category: Category) => {
    // Generate a new ID for the category
    const newCategory = {
      ...category,
      id: `category_${Date.now()}`,
      assetCount: 0,
      lastUpdated: new Date().toISOString()
    };

    setCategories([...categories, newCategory]);
    setShowAddDialog(false);
    toast.showSuccess("Category created successfully");
  };

  const renderTableView = () => (
    <DataTable
      value={filteredCategories}
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
  );

  const renderCardsView = () => (
    <div className="categories-cards-grid">
      {filteredCategories.map((category) => (
        <Card key={category.id} className="category-card">
          <div className="category-card-header">
            <div className="category-card-icon">
              <TagIcon size={24} style={{ color: category.color }} />
            </div>
            <div className="category-card-title">
              <h3>{category.name}</h3>
              <span className="category-code">{category.code}</span>
            </div>
            <div className="category-card-actions">
              <Button
                className="p-button-text p-button-rounded p-button-sm p-button-success"
                tooltip="Add Asset to Category"
                onClick={() => openAddAssetDialog(category.name)}
              >
                <Package size={16} />
              </Button>
              <Button
                className="p-button-text p-button-rounded p-button-sm"
                tooltip="Edit Category"
                onClick={() => editCategory(category)}
              >
                <Edit size={16} />
              </Button>
              <Button
                className="p-button-text p-button-rounded p-button-sm p-button-danger"
                tooltip="Delete Category"
                onClick={() => confirmDelete(category)}
              >
                <Trash2 size={16} />
              </Button>
            </div>
          </div>
          <div className="category-card-content">
            <p className="category-description">{category.description}</p>
            <div className="category-meta">
              <div className="category-meta-item">
                <span className="meta-label">Parent:</span>
                <span className="meta-value">
                  {category.parentCategory || "None"}
                </span>
              </div>
              <div className="category-meta-item">
                <span className="meta-label">Assets:</span>
                <span className="meta-value">{category.assetCount}</span>
              </div>
              <div className="category-meta-item">
                <span className="meta-label">Status:</span>
                <Tag
                  value={category.status}
                  severity={getStatusSeverity(category.status)}
                  className="status-tag"
                />
              </div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );

  const renderTreeView = () => (
    <div className="categories-tree-container">
      <Tree
        value={treeData}
        className="categories-tree"
        nodeTemplate={(node) => (
          <div className="tree-node">
            <div className="tree-node-content">
              <div className="tree-node-icon">
                <TagIcon size={16} style={{ color: node.data.color }} />
              </div>
              <div className="tree-node-info">
                <span className="tree-node-name">{node.label}</span>
                <span className="tree-node-code">{node.data.code}</span>
              </div>
              <div className="tree-node-meta">
                <span className="tree-node-assets">
                  {node.data.assetCount} assets
                </span>
                <Tag
                  value={node.data.status}
                  severity={getStatusSeverity(node.data.status)}
                  className="status-tag"
                />
              </div>
              <div className="tree-node-actions">
                <Button
                  className="p-button-text p-button-rounded p-button-sm p-button-success"
                  tooltip="Add Asset to Category"
                  onClick={(e) => {
                    e.stopPropagation();
                    openAddAssetDialog(node.data.name);
                  }}
                >
                  <Package size={14} />
                </Button>
                <Button
                  className="p-button-text p-button-rounded p-button-sm"
                  tooltip="Edit Category"
                  onClick={(e) => {
                    e.stopPropagation();
                    editCategory(node.data);
                  }}
                >
                  <Edit size={14} />
                </Button>
                <Button
                  className="p-button-text p-button-rounded p-button-sm p-button-danger"
                  tooltip="Delete Category"
                  onClick={(e) => {
                    e.stopPropagation();
                    confirmDelete(node.data);
                  }}
                >
                  <Trash2 size={14} />
                </Button>
              </div>
            </div>
          </div>
        )}
      />
    </div>
  );

  return (
    <div className="asset-categories">
      <div className="asset-categories-header">
        <div className="asset-categories-header-left">
          <h1>Asset Categories</h1>
          <p>Manage asset categories and classifications</p>
        </div>
        <div className="asset-categories-header-right">
          <div className="search-container">
            <span className="p-input-icon-left">
              <Search size={16} />
              <InputText
                value={searchTerm}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setSearchTerm(e.target.value)
                }
                placeholder="Search categories..."
                className="search-input"
              />
            </span>
          </div>
          <div className="view-mode-selector">
            <Button
              className={`p-button-text ${viewMode === "table" ? "p-button-primary" : ""}`}
              tooltip="Table View"
              onClick={() => setViewMode("table")}
            >
              <List size={20} />
            </Button>
            <Button
              className={`p-button-text ${viewMode === "cards" ? "p-button-primary" : ""}`}
              tooltip="Cards View"
              onClick={() => setViewMode("cards")}
            >
              <Grid size={20} />
            </Button>
            <Button
              className={`p-button-text ${viewMode === "tree" ? "p-button-primary" : ""}`}
              tooltip="Tree View"
              onClick={() => setViewMode("tree")}
            >
              <GitBranch size={20} />
            </Button>
          </div>
          <Button
            icon={<Plus size={20} />}
            label="Add Category"
            className="p-button-primary"
            onClick={openNew}
          />
        </div>
      </div>

      <Card className="asset-categories-card">
        {viewMode === "table" && renderTableView()}
        {viewMode === "cards" && renderCardsView()}
        {viewMode === "tree" && renderTreeView()}
      </Card>

      <ConfirmDialog />

      <Dialog
        visible={showAddDialog}
        onHide={handleCancelAdd}
        header="Add New Category"
        className="asset-dialog"
        style={{ width: "80vw", maxWidth: "1200px", maxHeight: "90vh" }}
        modal
        maximizable
        contentStyle={{ maxHeight: "calc(90vh - 120px)", overflow: "auto" }}
      >
        <AssetCategoryFormDialog
          onSave={handleSaveCategory}
          onCancel={handleCancelAdd}
          toastRef={toastRef}
        />
      </Dialog>

      <Dialog
        visible={showAddAssetDialog}
        onHide={handleCancelAddAsset}
        header={`Add New Asset - ${selectedCategory || "Category"}`}
        className="asset-dialog"
        style={{ width: "80vw", maxWidth: "1200px", maxHeight: "90vh" }}
        modal
        maximizable
        contentStyle={{ maxHeight: "calc(90vh - 120px)", overflow: "auto" }}
      >
        <AddAssetDialog
          onSave={handleSaveAsset}
          onCancel={handleCancelAddAsset}
          preSelectedCategory={selectedCategory || ""}
        />
      </Dialog>
    </div>
  );
};
