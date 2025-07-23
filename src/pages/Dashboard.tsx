import React from "react";
import { Card } from "primereact/card";
import { Chart } from "primereact/chart";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Tag } from "primereact/tag";
import { Button } from "primereact/button";
import {
  Package,
  MapPin,
  AlertTriangle,
  TrendingUp,
  Plus,
  Search
} from "lucide-react";
import "@/pages/Dashboard.css";
import { AssetSummary } from "@/types/models";
import { Toast } from "primereact/toast";
import { RefObject } from "react";
import {
  sampleAssetSummaries,
  dashboardStats,
  chartData
} from "@/data/sampleData";

interface DashboardProps {
  toastRef?: RefObject<Toast | null>;
}

export const Dashboard: React.FC<DashboardProps> = () => {
  // Use centralized sample data
  const assetDistributionData = chartData.assetDistribution;
  const assetTrendData = chartData.assetTrend;
  const recentAssets: AssetSummary[] = sampleAssetSummaries;

  const getStatusSeverity = (status: string) => {
    switch (status) {
      case "active":
        return "success";
      case "maintenance":
        return "warning";
      case "retired":
        return "danger";
      default:
        return "info";
    }
  };

  const statusBodyTemplate = (rowData: AssetSummary) => {
    return (
      <Tag
        value={rowData.status}
        severity={getStatusSeverity(rowData.status)}
        className="status-tag"
      />
    );
  };

  const actionsBodyTemplate = () => {
    return (
      <div className="action-buttons">
        <Button
          icon={<Search size={16} className="search-icon" />}
          className="p-button-text p-button-rounded p-button-sm"
          tooltip="View Details"
        />
        <Button
          icon={<Plus size={16} />}
          className="p-button-text p-button-rounded p-button-sm"
          tooltip="Edit Asset"
        />
      </div>
    );
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom" as const,
        labels: {
          usePointStyle: true,
          padding: 20
        }
      }
    }
  };

  const lineChartOptions = {
    ...chartOptions,
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: "rgba(0, 0, 0, 0.1)"
        }
      },
      x: {
        grid: {
          color: "rgba(0, 0, 0, 0.1)"
        }
      }
    }
  };

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Dashboard</h1>
        <p>Welcome to Asset Management Solution</p>
      </div>

      {/* Overview Cards */}
      <div className="overview-cards">
        <Card className="overview-card">
          <div className="card-content">
            <div className="card-icon">
              <Package size={24} />
            </div>
            <div className="card-info">
              <h3>Total Assets</h3>
              <p className="card-value">
                {dashboardStats.totalAssets.toLocaleString()}
              </p>
              <p className="card-change positive">+12% from last month</p>
            </div>
          </div>
        </Card>

        <Card className="overview-card">
          <div className="card-content">
            <div className="card-icon">
              <MapPin size={24} />
            </div>
            <div className="card-info">
              <h3>Locations</h3>
              <p className="card-value">{dashboardStats.totalLocations}</p>
              <p className="card-change positive">+2 new locations</p>
            </div>
          </div>
        </Card>

        <Card className="overview-card">
          <div className="card-content">
            <div className="card-icon">
              <AlertTriangle size={24} />
            </div>
            <div className="card-info">
              <h3>Maintenance Due</h3>
              <p className="card-value">{dashboardStats.maintenanceRequired}</p>
              <p className="card-change negative">+3 this week</p>
            </div>
          </div>
        </Card>

        <Card className="overview-card">
          <div className="card-content">
            <div className="card-icon">
              <TrendingUp size={24} />
            </div>
            <div className="card-info">
              <h3>Asset Value</h3>
              <p className="card-value">$2.4M</p>
              <p className="card-change positive">+8% from last month</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="charts-section">
        <div className="chart-container">
          <Card title="Asset Distribution by Category" className="chart-card">
            <Chart
              type="doughnut"
              data={assetDistributionData}
              options={chartOptions}
              style={{ height: "300px" }}
            />
          </Card>
        </div>

        <div className="chart-container">
          <Card title="Asset Growth Trend" className="chart-card">
            <Chart
              type="line"
              data={assetTrendData}
              options={lineChartOptions}
              style={{ height: "300px" }}
            />
          </Card>
        </div>
      </div>

      {/* Recent Assets */}
      <Card title="Recent Assets" className="recent-assets-card">
        <DataTable
          value={recentAssets}
          paginator
          rows={5}
          rowsPerPageOptions={[5, 10, 20]}
          className="recent-assets-table"
          emptyMessage="No recent assets found"
        >
          <Column field="id" header="Asset ID" style={{ width: "100px" }} />
          <Column field="name" header="Asset Name" />
          <Column
            field="category"
            header="Category"
            style={{ width: "120px" }}
          />
          <Column
            field="location"
            header="Location"
            style={{ width: "150px" }}
          />
          <Column
            field="status"
            header="Status"
            body={statusBodyTemplate}
            style={{ width: "100px" }}
          />
          <Column
            field="lastUpdated"
            header="Last Updated"
            style={{ width: "120px" }}
          />
          <Column
            header="Actions"
            body={actionsBodyTemplate}
            style={{ width: "100px" }}
          />
        </DataTable>
      </Card>
    </div>
  );
};
