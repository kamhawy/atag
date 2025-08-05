import React from "react";
import { Toast } from "primereact/toast";
import { RefObject } from "react";
import { useToast } from "@/hooks/useToast";
import { Card } from "primereact/card";
import "./AdminSettings.css";

interface AdminSettingsProps {
  toastRef?: RefObject<Toast | null>;
}

export const AdminSettings: React.FC<AdminSettingsProps> = ({
  toastRef: toastRef
}) => {
  const toast = useToast(toastRef || { current: null });
  return (
    <div className="admin-settings">
      <div className="admin-settings-header">
        <div className="admin-settings-header-left">
          <h1>Admin Settings</h1>
          <p
            onClick={() => {
              toast.showSuccess("Settings updated successfully");
            }}
          >
            Manage admin settings here.
          </p>
        </div>
      </div>
      <Card className="admin-settings-card">
        <div className="admin-settings-card-content">
          <h2>System Settings Content</h2>
        </div>
      </Card>
    </div>
  );
};
