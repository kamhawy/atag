import React from 'react';
import { Toast } from 'primereact/toast';
import { RefObject } from 'react';

interface AdminSettingsProps {
  toastRef?: RefObject<Toast | null>;
}

export const AdminSettings: React.FC<AdminSettingsProps> = ({ toastRef: _toastRef }) => {
  return (
    <div className="admin-settings">
      <h1>Admin Settings</h1>
      <p>Manage admin settings here.</p>
    </div>
  );
}; 