import React from "react";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { Tag } from "primereact/tag";
import { Eye, Edit, Trash2 } from "lucide-react";
import { AssetSearch } from "@/types/models";
import "./AssetCard.css";

interface AssetCardProps {
  asset: AssetSearch;
  onView: (asset: AssetSearch) => void;
  onEdit: (asset: AssetSearch) => void;
  onDelete: (asset: AssetSearch) => void;
}

export const AssetCard: React.FC<AssetCardProps> = ({
  asset,
  onView,
  onEdit,
  onDelete
}) => {
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

  return (
    <Card className="asset-card">
      <div className="asset-card-header">
        <div className="asset-id">{asset.id}</div>
        <Tag
          value={asset.status}
          severity={getStatusSeverity(asset.status)}
          className="status-tag"
        />
      </div>

      <div className="asset-card-content">
        <h3 className="asset-name">{asset.name}</h3>

        <div className="asset-details">
          <div className="detail-item">
            <span className="detail-label">Category:</span>
            <span className="detail-value">{asset.category}</span>
          </div>

          <div className="detail-item">
            <span className="detail-label">Brand:</span>
            <span className="detail-value">{asset.brand}</span>
          </div>

          <div className="detail-item">
            <span className="detail-label">Model:</span>
            <span className="detail-value">{asset.model}</span>
          </div>

          <div className="detail-item">
            <span className="detail-label">Location:</span>
            <span className="detail-value">{asset.location}</span>
          </div>

          <div className="detail-item">
            <span className="detail-label">Value:</span>
            <span className="detail-value value-highlight">
              ${asset.value.toLocaleString()}
            </span>
          </div>

          <div className="detail-item">
            <span className="detail-label">Assigned To:</span>
            <span className="detail-value">{asset.assignedTo}</span>
          </div>
        </div>
      </div>

      <div className="asset-card-footer">
        <div className="asset-actions">
          <Button
            className="p-button-outlined p-button-rounded p-button-sm"
            tooltip="View Details"
            onClick={() => onView(asset)}
          >
            <Eye size={16} />
          </Button>
          <Button
            className="p-button-outlined p-button-rounded p-button-sm"
            tooltip="Edit Asset"
            onClick={() => onEdit(asset)}
          >
            <Edit size={16} />
          </Button>
          <Button
            className="p-button-outlined p-button-rounded p-button-sm p-button-danger"
            tooltip="Delete Asset"
            onClick={() => onDelete(asset)}
          >
            <Trash2 size={16} />
          </Button>
        </div>

        <div className="asset-meta">
          <small className="last-updated">Updated: {asset.lastUpdated}</small>
        </div>
      </div>
    </Card>
  );
};
