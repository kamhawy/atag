import { useState, useMemo } from "react";
import { Card } from "primereact/card";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { Calendar } from "primereact/calendar";
import { MultiSelect } from "primereact/multiselect";
import { Chip } from "primereact/chip";
import { Search, Filter, Plus, Download, RefreshCw } from "lucide-react";
import { AssetSearch as AssetSearchModel, Asset } from "@/types/models";
import { Toast } from "primereact/toast";
import { RefObject } from "react";
import { dropdownOptions, sampleAssets } from "@/data/sampleData";
import { AssetCard } from "@/components/ui/AssetCard";
import { AddAssetDialog } from "./AddAssetDialog";
import { useToast } from "@/hooks/useToast";
import { useAddAsset } from "@/hooks/useAddAsset";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import { useNavigate } from "@tanstack/react-router";
import "./AssetsCatalogue.css";

interface AssetsCatalogueProps {
  toastRef?: RefObject<Toast | null>;
}

export const AssetsCatalogue: React.FC<AssetsCatalogueProps> = ({
  toastRef
}) => {
  const navigate = useNavigate();
  const toast = useToast(toastRef || { current: null });

  // Search and filter states
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);
  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([
    null,
    null
  ]);
  const [showFilters, setShowFilters] = useState(false);

  // Asset operation states
  const [assets, setAssets] = useState<Asset[]>(sampleAssets);

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
      // Add the new asset to the list
      setAssets([...assets, asset]);
    }
  });

  // Convert Asset to AssetSearch for display
  const assetSearchData: AssetSearchModel[] = useMemo(() => {
    return assets.map((asset) => ({
      id: asset.id,
      name: asset.name,
      category: asset.category,
      brand: asset.manufacturer,
      model: asset.model,
      location: asset.location,
      status: asset.status as "active" | "maintenance" | "retired" | "lost",
      purchaseDate: asset.purchaseDate.toISOString().split("T")[0],
      warrantyExpiry: asset.warrantyExpiry.toISOString().split("T")[0],
      value: asset.purchasePrice,
      assignedTo: asset.assignedTo,
      lastUpdated: asset.lastUpdated
    }));
  }, [assets]);

  // Use centralized dropdown options
  const categories = dropdownOptions.categories.map((opt) => opt.value);
  const statuses = dropdownOptions.statuses.map((opt) => opt.value);
  const locations = dropdownOptions.locations.map((opt) => opt.value);

  // Filtered assets
  const filteredAssets = useMemo(() => {
    return assetSearchData.filter((asset) => {
      const matchesSearch =
        asset.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        asset.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        asset.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
        asset.model.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCategory =
        selectedCategories.length === 0 ||
        selectedCategories.includes(asset.category);
      const matchesStatus =
        selectedStatuses.length === 0 ||
        selectedStatuses.includes(asset.status);
      const matchesLocation =
        selectedLocations.length === 0 ||
        selectedLocations.includes(asset.location);

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
    assetSearchData,
    searchTerm,
    selectedCategories,
    selectedStatuses,
    selectedLocations,
    dateRange
  ]);

  // Asset operation handlers
  const handleAddAsset = () => {
    openAddAssetDialog();
  };

  const handleViewAsset = (asset: AssetSearchModel) => {
    navigate({
      to: "/assets/$assetId",
      params: { assetId: asset.id },
      search: { mode: "view" }
    });
  };

  const handleEditAsset = (asset: AssetSearchModel) => {
    navigate({
      to: "/assets/$assetId",
      params: { assetId: asset.id },
      search: { mode: "edit" }
    });
  };

  const handleDeleteAsset = (asset: AssetSearchModel) => {
    confirmDialog({
      message: `Are you sure you want to delete asset "${asset.name}"?`,
      header: "Delete Confirmation",
      icon: "pi pi-exclamation-triangle",
      accept: () => {
        setAssets((prevAssets) => prevAssets.filter((a) => a.id !== asset.id));
        toast.showDeleted("Asset");
      }
    });
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
      prev.includes(status)
        ? prev.filter((s) => s !== status)
        : [...prev, status]
    );
  };

  // Remove individual filter chip
  const removeFilterChip = (type: string, value: string) => {
    if (type === "category")
      setSelectedCategories((prev) => prev.filter((c) => c !== value));
    if (type === "status")
      setSelectedStatuses((prev) => prev.filter((s) => s !== value));
    if (type === "location")
      setSelectedLocations((prev) => prev.filter((l) => l !== value));
  };

  const exportData = () => {
    // TODO: Implement export functionality
    // console.log("Exporting data...");
    toast.showInfo("Export functionality will be implemented soon");
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
            label="Add Asset"
            className="p-button-primary modern-add-btn"
            onClick={handleAddAsset}
          >
            <Plus size={20} />
          </Button>
        </div>
      </div>

      {/* Search and Filters */}
      <Card className="search-filters-card modern-filters-card">
        <div className="search-row modern-search-row">
          <div className="search-input-group">
            <span className="p-input-icon-left">
              <Search size={16} className="search-icon-2" />
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
              label="Filters"
              className={`p-button-outlined ${showFilters ? "p-button-primary" : ""}`}
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter size={18} />
            </Button>
            <Button
              label="Clear Filters"
              className="p-button-outlined p-button-rounded"
              onClick={clearFilters}
            >
              <RefreshCw size={18} />
            </Button>
            <Button
              label="Export"
              className="p-button-outlined"
              onClick={exportData}
            >
              <Download size={18} />
            </Button>
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
            <Chip
              key={cat}
              label={`Category: ${cat}`}
              removable
              onRemove={() => {
                removeFilterChip("category", cat);
                return true;
              }}
            />
          ))}
          {selectedStatuses.map((stat) => (
            <Chip
              key={stat}
              label={`Status: ${stat}`}
              removable
              onRemove={() => {
                removeFilterChip("status", stat);
                return true;
              }}
            />
          ))}
          {selectedLocations.map((loc) => (
            <Chip
              key={loc}
              label={`Location: ${loc}`}
              removable
              onRemove={() => {
                removeFilterChip("location", loc);
                return true;
              }}
            />
          ))}
          {dateRange[0] && dateRange[1] && (
            <Chip
              label={`Date: ${dateRange[0].toLocaleDateString()} - ${dateRange[1].toLocaleDateString()}`}
              removable
              onRemove={() => {
                setDateRange([null, null]);
                return true;
              }}
            />
          )}
        </div>

        {showFilters && (
          <div className="filters-panel modern-filters-panel">
            <div className="filters-grid modern-filters-grid">
              <div className="filter-group">
                <label>
                  <i className="pi pi-list"></i> Category
                </label>
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
                <label>
                  <i className="pi pi-flag"></i> Status
                </label>
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
                <label>
                  <i className="pi pi-map-marker"></i> Location
                </label>
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
                <label>
                  <i className="pi pi-calendar"></i> Purchase Date Range
                </label>
                <Calendar
                  value={dateRange}
                  onChange={(e) =>
                    setDateRange(e.value as [Date | null, Date | null])
                  }
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
          Showing {filteredAssets.length} of {assetSearchData.length} assets
        </p>
      </div>

      {/* Assets Grid */}
      <Card className="assets-grid-card">
        {filteredAssets.length > 0 ? (
          <div className="assets-grid">
            {filteredAssets.map((asset) => (
              <AssetCard
                key={asset.id}
                asset={asset}
                onView={handleViewAsset}
                onEdit={handleEditAsset}
                onDelete={handleDeleteAsset}
              />
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <div className="empty-state-content">
              <i
                className="pi pi-inbox"
                style={{
                  fontSize: "3rem",
                  color: "var(--text-color-secondary)"
                }}
              ></i>
              <h3>No assets found</h3>
              <p>No assets match your current search criteria</p>
            </div>
          </div>
        )}
      </Card>

      {/* Add Asset Dialog */}
      <Dialog
        visible={showAddAssetDialog}
        onHide={handleCancelAddAsset}
        header={`Add New Asset${selectedCategory ? ` - ${selectedCategory}` : ""}`}
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

      <ConfirmDialog />
    </div>
  );
};
