import React, { useState, useMemo } from "react";
import { Card } from "primereact/card";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Tag } from "primereact/tag";
import { Dialog } from "primereact/dialog";
import { Calendar } from "primereact/calendar";
import { MultiSelect } from "primereact/multiselect";
import { Chip } from "primereact/chip";
import {
  Search,
  Filter,
  Plus,
  Eye,
  Edit,
  Trash2,
  Download,
  RefreshCw
} from "lucide-react";
import { AssetSearch as AssetSearchModel } from "@/types/models";
import { Toast } from "primereact/toast";
import { RefObject } from "react";
import { sampleAssetSearchData, dropdownOptions } from "@/data/sampleData";
import "./AssetList.css";

interface AssetsListProps {
  toastRef?: RefObject<Toast | null>;
}

export const AssetsList: React.FC<AssetsListProps> = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);
  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([
    null,
    null
  ]);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedAsset, setSelectedAsset] = useState<AssetSearchModel | null>(
    null
  );
  const [showAssetDialog, setShowAssetDialog] = useState(false);

  // Use centralized sample data
  const assets: AssetSearchModel[] = sampleAssetSearchData;

  // Use centralized dropdown options
  const categories = dropdownOptions.categories.map((opt) => opt.value);
  const statuses = dropdownOptions.statuses.map((opt) => opt.value);
  const locations = dropdownOptions.locations.map((opt) => opt.value);

  // Filtered assets
  const filteredAssets = useMemo(() => {
    return assets.filter((asset) => {
      const matchesSearch =
        asset.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        asset.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        asset.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
        asset.model.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCategory =
        selectedCategories.length === 0 || selectedCategories.includes(asset.category);
      const matchesStatus =
        selectedStatuses.length === 0 || selectedStatuses.includes(asset.status);
      const matchesLocation =
        selectedLocations.length === 0 || selectedLocations.includes(asset.location);

      const matchesDateRange =
        !dateRange[0] ||
        !dateRange[1] ||
        (new Date(asset.purchaseDate) >= dateRange[0] &&
          new Date(asset.purchaseDate) <= dateRange[1]);

      return (
        matchesSearch &&
        matchesCategory &&
        matchesStatus &&
        matchesLocation &&
        matchesDateRange
      );
    });
  }, [
    assets,
    searchTerm,
    selectedCategories,
    selectedStatuses,
    selectedLocations,
    dateRange
  ]);

  const getStatusSeverity = (status: string) => {
    switch (status) {
      case "active":
        return "success";
      case "maintenance":
        return "warning";
      case "retired":
        return "danger";
      case "lost":
        return "info";
      default:
        return "info";
    }
  };

  const statusBodyTemplate = (rowData: AssetSearchModel) => {
    return (
      <Tag
        value={rowData.status}
        severity={getStatusSeverity(rowData.status)}
        className="status-tag"
      />
    );
  };

  const valueBodyTemplate = (rowData: AssetSearchModel) => {
    return `$${rowData.value.toLocaleString()}`;
  };

  const actionsBodyTemplate = (rowData: AssetSearchModel) => {
    return (
      <div className="action-buttons">
        <Button
          icon={<Eye size={16} />}
          className="p-button-text p-button-rounded p-button-sm"
          tooltip="View Details"
          onClick={() => {
            setSelectedAsset(rowData);
            setShowAssetDialog(true);
          }}
        />
        <Button
          icon={<Edit size={16} />}
          className="p-button-text p-button-rounded p-button-sm"
          tooltip="Edit Asset"
        />
        <Button
          icon={<Trash2 size={16} />}
          className="p-button-text p-button-rounded p-button-sm p-button-danger"
          tooltip="Delete Asset"
        />
      </div>
    );
  };

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedCategories([]);
    setSelectedStatuses([]);
    setSelectedLocations([]);
    setDateRange([null, null]);
  };

  // Quick filter for statuses
  const quickStatusFilters = ["active", "maintenance", "retired"];
  const handleQuickStatus = (status: string) => {
    setSelectedStatuses((prev) =>
      prev.includes(status) ? prev.filter((s) => s !== status) : [...prev, status]
    );
  };

  // Remove individual filter chip
  const removeFilterChip = (type: string, value: string) => {
    if (type === "category") setSelectedCategories((prev) => prev.filter((c) => c !== value));
    if (type === "status") setSelectedStatuses((prev) => prev.filter((s) => s !== value));
    if (type === "location") setSelectedLocations((prev) => prev.filter((l) => l !== value));
  };

  const exportData = () => {
    // TODO: Implement export functionality
    // console.log('Exporting data...')
  };

  return (
    <div className="asset-search modern-layout">
      <div className="search-header modern-header">
        <div className="search-header-left">
          <h1>Asset Catalogue</h1>
          <p>Search and manage facility assets</p>
        </div>
        <div className="search-header-right">
          <Button
            icon={<Plus size={20} />}
            label="Add Asset"
            className="p-button-primary modern-add-btn"
          />
        </div>
      </div>

      {/* Search and Filters */}
      <Card className="search-filters-card modern-filters-card">
        <div className="search-row modern-search-row">
          <div className="search-input-group">
            <span className="p-input-icon-left">
              <Search size={18} />
              <InputText
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search assets by name, ID, brand, or model..."
                className="search-input modern-search-input"
              />
            </span>
          </div>

          <div className="filter-buttons modern-filter-buttons">
            <Button
              icon={<Filter size={18} />}
              label="Filters"
              className={`p-button-outlined ${showFilters ? "p-button-primary" : ""}`}
              onClick={() => setShowFilters(!showFilters)}
            />
            <Button
              icon={<RefreshCw size={18} />}
              className="p-button-text p-button-rounded"
              tooltip="Clear Filters"
              onClick={clearFilters}
            />
            <Button
              icon={<Download size={18} />}
              label="Export"
              className="p-button-outlined"
              onClick={exportData}
            />
          </div>
        </div>

        {/* Quick Status Filters */}
        <div className="quick-filters modern-quick-filters">
          {quickStatusFilters.map((status) => (
            <Button
              key={status}
              label={status.charAt(0).toUpperCase() + status.slice(1)}
              className={`p-button-sm p-button-rounded quick-status-btn ${selectedStatuses.includes(status) ? "p-button-primary" : "p-button-outlined"}`}
              onClick={() => handleQuickStatus(status)}
            />
          ))}
        </div>

        {/* Active Filter Chips */}
        <div className="active-filters modern-active-filters">
          {selectedCategories.map((cat) => (
            <Chip key={cat} label={`Category: ${cat}`} removable onRemove={() => { removeFilterChip("category", cat); return true; }} />
          ))}
          {selectedStatuses.map((stat) => (
            <Chip key={stat} label={`Status: ${stat}`} removable onRemove={() => { removeFilterChip("status", stat); return true; }} />
          ))}
          {selectedLocations.map((loc) => (
            <Chip key={loc} label={`Location: ${loc}`} removable onRemove={() => { removeFilterChip("location", loc); return true; }} />
          ))}
          {dateRange[0] && dateRange[1] && (
            <Chip
              label={`Date: ${dateRange[0].toLocaleDateString()} - ${dateRange[1].toLocaleDateString()}`}
              removable
              onRemove={() => { setDateRange([null, null]); return true; }}
            />
          )}
        </div>

        {showFilters && (
          <div className="filters-panel modern-filters-panel">
            <div className="filters-grid modern-filters-grid">
              <div className="filter-group">
                <label><i className="pi pi-list"></i> Category</label>
                <MultiSelect
                  value={selectedCategories}
                  options={categories}
                  onChange={(e) => setSelectedCategories(e.value)}
                  placeholder="Select Categories"
                  display="chip"
                  className="filter-dropdown modern-multiselect"
                  showClear
                />
              </div>

              <div className="filter-group">
                <label><i className="pi pi-flag"></i> Status</label>
                <MultiSelect
                  value={selectedStatuses}
                  options={statuses}
                  onChange={(e) => setSelectedStatuses(e.value)}
                  placeholder="Select Statuses"
                  display="chip"
                  className="filter-dropdown modern-multiselect"
                  showClear
                />
              </div>

              <div className="filter-group">
                <label><i className="pi pi-map-marker"></i> Location</label>
                <MultiSelect
                  value={selectedLocations}
                  options={locations}
                  onChange={(e) => setSelectedLocations(e.value)}
                  placeholder="Select Locations"
                  display="chip"
                  className="filter-dropdown modern-multiselect"
                  showClear
                />
              </div>

              <div className="filter-group">
                <label><i className="pi pi-calendar"></i> Purchase Date Range</label>
                <Calendar
                  value={dateRange}
                  onChange={(e) => setDateRange(e.value as [Date | null, Date | null])}
                  selectionMode="range"
                  placeholder="Select Date Range"
                  showButtonBar={true}
                  className="filter-calendar modern-calendar"
                  showIcon
                />
              </div>
            </div>
          </div>
        )}
      </Card>

      {/* Results Summary */}
      <div className="results-summary">
        <p>
          Showing {filteredAssets.length} of {assets.length} assets
        </p>
      </div>

      {/* Assets Table */}
      <Card className="assets-table-card">
        <DataTable
          value={filteredAssets}
          paginator
          rows={10}
          rowsPerPageOptions={[10, 20, 50]}
          className="assets-table"
          emptyMessage="No assets found matching your criteria"
          loading={false}
          stripedRows
          showGridlines
        >
          <Column
            field="id"
            header="Asset ID"
            style={{ width: "100px" }}
            sortable
          />
          <Column field="name" header="Asset Name" sortable />
          <Column
            field="category"
            header="Category"
            style={{ width: "120px" }}
            sortable
          />
          <Column
            field="brand"
            header="Brand"
            style={{ width: "120px" }}
            sortable
          />
          <Column
            field="model"
            header="Model"
            style={{ width: "120px" }}
            sortable
          />
          <Column
            field="location"
            header="Location"
            style={{ width: "150px" }}
            sortable
          />
          <Column
            field="status"
            header="Status"
            body={statusBodyTemplate}
            style={{ width: "100px" }}
            sortable
          />
          <Column
            field="value"
            header="Value"
            body={valueBodyTemplate}
            style={{ width: "100px" }}
            sortable
          />
          <Column
            field="assignedTo"
            header="Assigned To"
            style={{ width: "120px" }}
            sortable
          />
          <Column
            field="lastUpdated"
            header="Last Updated"
            style={{ width: "120px" }}
            sortable
          />
          <Column
            header="Actions"
            body={actionsBodyTemplate}
            style={{ width: "120px" }}
          />
        </DataTable>
      </Card>

      {/* Asset Details Dialog */}
      <Dialog
        visible={showAssetDialog}
        onHide={() => setShowAssetDialog(false)}
        header="Asset Details"
        className="asset-dialog"
        style={{ width: "600px" }}
      >
        {selectedAsset && (
          <div className="asset-details">
            <div className="detail-row">
              <label>Asset ID:</label>
              <span>{selectedAsset.id}</span>
            </div>
            <div className="detail-row">
              <label>Name:</label>
              <span>{selectedAsset.name}</span>
            </div>
            <div className="detail-row">
              <label>Category:</label>
              <span>{selectedAsset.category}</span>
            </div>
            <div className="detail-row">
              <label>Brand:</label>
              <span>{selectedAsset.brand}</span>
            </div>
            <div className="detail-row">
              <label>Model:</label>
              <span>{selectedAsset.model}</span>
            </div>
            <div className="detail-row">
              <label>Location:</label>
              <span>{selectedAsset.location}</span>
            </div>
            <div className="detail-row">
              <label>Status:</label>
              <Tag
                value={selectedAsset.status}
                severity={getStatusSeverity(selectedAsset.status)}
              />
            </div>
            <div className="detail-row">
              <label>Value:</label>
              <span>${selectedAsset.value.toLocaleString()}</span>
            </div>
            <div className="detail-row">
              <label>Assigned To:</label>
              <span>{selectedAsset.assignedTo}</span>
            </div>
            <div className="detail-row">
              <label>Purchase Date:</label>
              <span>{selectedAsset.purchaseDate}</span>
            </div>
            <div className="detail-row">
              <label>Warranty Expiry:</label>
              <span>{selectedAsset.warrantyExpiry}</span>
            </div>
            <div className="detail-row">
              <label>Last Updated:</label>
              <span>{selectedAsset.lastUpdated}</span>
            </div>
          </div>
        )}
      </Dialog>
    </div>
  );
};
