import React, { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { Card } from "primereact/card";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Tag } from "primereact/tag";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import { Dialog } from "primereact/dialog";
import { Toast } from "primereact/toast";
import { Plus, Edit, Trash2 } from "lucide-react";
import { RefObject } from "react";
import { useToast } from "@/hooks/useToast";
import { sampleUsers } from "@/data/sampleData";
import { User } from "@/types/models";
import "./Users.css";
import { UserFormDialog } from "./UserFormDialog";

// Import the UserFormData interface
interface UserFormData {
  id: string;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  role: "admin" | "manager" | "user" | "viewer";
  status: "active" | "inactive" | "pending";
  department: string;
  permissions: string[];
  lastLogin: string;
  isActive: boolean;
}

interface UsersProps {
  toastRef?: RefObject<Toast | null>;
}

export const Users: React.FC<UsersProps> = ({ toastRef }) => {
  const navigate = useNavigate();
  const toast = useToast(toastRef || { current: null });

  // Use centralized sample data
  const [users, setUsers] = useState(sampleUsers);
  const [showAddDialog, setShowAddDialog] = useState(false);

  const getStatusSeverity = (status: string) => {
    switch (status) {
      case "active":
        return "success";
      case "inactive":
        return "danger";
      case "pending":
        return "warning";
      default:
        return "info";
    }
  };

  const getRoleSeverity = (role: string) => {
    switch (role) {
      case "admin":
        return "danger";
      case "manager":
        return "warning";
      case "user":
        return "info";
      case "viewer":
        return "secondary";
      default:
        return "info";
    }
  };

  const statusBodyTemplate = (rowData: User) => {
    return (
      <Tag
        value={rowData.status}
        severity={getStatusSeverity(rowData.status)}
        className="status-tag"
      />
    );
  };

  const roleBodyTemplate = (rowData: User) => {
    return (
      <Tag
        value={rowData.role}
        severity={getRoleSeverity(rowData.role)}
        className="role-tag"
      />
    );
  };

  const actionsBodyTemplate = (rowData: User) => {
    return (
      <div className="action-buttons">
        <Button
          icon={<Edit size={16} />}
          className="p-button-text p-button-rounded p-button-sm"
          tooltip="Edit User"
          onClick={() => editUser(rowData)}
        />
        <Button
          icon={<Trash2 size={16} />}
          className="p-button-text p-button-rounded p-button-sm p-button-danger"
          tooltip="Delete User"
          onClick={() => confirmDelete(rowData)}
        />
      </div>
    );
  };

  const editUser = (user: User) => {
    navigate({ to: `/admin/users/${user.id}` });
  };

  const confirmDelete = (user: User) => {
    confirmDialog({
      message: `Are you sure you want to delete user "${user.username}"?`,
      header: "Delete Confirmation",
      icon: "pi pi-exclamation-triangle",
      accept: () => deleteUser(user.id)
    });
  };

  const deleteUser = (id: string) => {
    setUsers(users.filter((user) => user.id !== id));
    toast.showDeleted("User");
  };

  const openNew = () => {
    setShowAddDialog(true);
  };

  const handleCancelAdd = () => {
    setShowAddDialog(false);
  };

  const handleSaveUser = (user: UserFormData) => {
    // Generate a new ID for the user
    const newUser = {
      ...user,
      id: `user_${Date.now()}`,
      lastLogin: new Date().toISOString()
    };
    
    setUsers([...users, newUser]);
    setShowAddDialog(false);
    toast.showSuccess("User created successfully");
  };

  return (
    <div className="admin-users">
      <div className="admin-users-header">
        <div className="admin-users-header-left">
          <h1>Users</h1>
          <p>Manage system users and permissions</p>
        </div>
        <div className="admin-users-header-right">
          <Button
            icon={<Plus size={20} />}
            label="Add User"
            className="p-button-primary"
            onClick={openNew}
          />
        </div>
      </div>

      <Card className="admin-users-card">
        <DataTable
          value={users}
          paginator
          rows={10}
          rowsPerPageOptions={[5, 10, 25, 50]}
          tableStyle={{ minWidth: "50rem" }}
          className="common-data-table"
          emptyMessage="No users found."
          loading={false}
          stripedRows
          showGridlines
          responsiveLayout="scroll"
        >
          <Column
            field="username"
            header="Username"
            sortable
            style={{ minWidth: "150px" }}
          />
          <Column
            field="firstName"
            header="First Name"
            sortable
            style={{ minWidth: "140px" }}
          />
          <Column
            field="lastName"
            header="Last Name"
            sortable
            style={{ minWidth: "140px" }}
          />
          <Column
            field="email"
            header="Email"
            sortable
            style={{ minWidth: "200px" }}
          />
          <Column
            field="phone"
            header="Phone"
            sortable
            style={{ minWidth: "130px" }}
          />
          <Column
            field="role"
            header="Role"
            body={roleBodyTemplate}
            sortable
            style={{ minWidth: "120px" }}
          />
          <Column
            field="department"
            header="Department"
            sortable
            style={{ minWidth: "150px" }}
          />
          <Column
            field="status"
            header="Status"
            body={statusBodyTemplate}
            sortable
            style={{ minWidth: "120px" }}
          />
          <Column
            field="isActive"
            header="Active"
            body={(rowData) => (
              <Tag
                value={rowData.isActive ? "Yes" : "No"}
                severity={rowData.isActive ? "success" : "danger"}
                className="status-tag"
              />
            )}
            sortable
            style={{ minWidth: "100px" }}
          />
          <Column
            field="lastLogin"
            header="Last Login"
            sortable
            style={{ minWidth: "150px" }}
          />
          <Column
            header="Actions"
            body={actionsBodyTemplate}
            style={{ minWidth: "120px" }}
          />
        </DataTable>
      </Card>

      <ConfirmDialog />

      <Dialog
        visible={showAddDialog}
        onHide={handleCancelAdd}
        header="Add New User"
        className="asset-dialog"
        style={{ width: "80vw", maxWidth: "1200px", maxHeight: "90vh" }}
        modal
        maximizable
        contentStyle={{ maxHeight: "calc(90vh - 120px)", overflow: "auto" }}
      >
        <UserFormDialog
          onSave={handleSaveUser}
          onCancel={handleCancelAdd}
          toastRef={toastRef}
        />
      </Dialog>
    </div>
  );
};
