import React, { useState, useEffect } from "react";
import { useNavigate } from "@tanstack/react-router";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { Card } from "primereact/card";
import { Toast } from "primereact/toast";
import { useToast } from "@/hooks/useToast";
import { sampleUsers } from "@/data/sampleData";
import "./UserForm.css";

interface UserFormProps {
  userId: string;
  mode?: "add" | "edit";
  toastRef?: React.RefObject<Toast | null>;
}

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

export const UserForm: React.FC<UserFormProps> = ({
  userId,
  mode,
  toastRef
}) => {
  const navigate = useNavigate();
  const { showSuccess, showError } = useToast(toastRef || { current: null });

  const isAddMode = mode === "add" || userId === "new";

  const [formData, setFormData] = useState<UserFormData>({
    id: "",
    username: "",
    email: "",
    firstName: "",
    lastName: "",
    phone: "",
    role: "user",
    status: "active",
    department: "",
    permissions: [],
    lastLogin: "",
    isActive: true
  });

  const [loading, setLoading] = useState(false);
  const isEditMode = userId !== "new";

  useEffect(() => {
    if (isEditMode && userId) {
      // Load existing user data
      const existingUser = sampleUsers.find((user) => user.id === userId);
      if (existingUser) {
        setFormData({
          id: existingUser.id,
          username: existingUser.username,
          email: existingUser.email,
          firstName: existingUser.firstName || "",
          lastName: existingUser.lastName || "",
          phone: existingUser.phone || "",
          role: existingUser.role,
          status: existingUser.status,
          department: existingUser.department,
          permissions: existingUser.permissions || [],
          lastLogin: existingUser.lastLogin,
          isActive:
            existingUser.isActive !== undefined ? existingUser.isActive : true
        });
      }
    }
  }, [userId, isEditMode]);

  const handleInputChange = (field: keyof UserFormData, value: unknown) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Simulate API call
      if (isEditMode) {
        showSuccess("User updated successfully");
      } else {
        showSuccess("User created successfully");
      }

      navigate({ to: "/admin/users" });
    } catch {
      showError("Failed to save user");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigate({ to: "/admin/users" });
  };

  const roleOptions = [
    { label: "Admin", value: "admin" },
    { label: "Manager", value: "manager" },
    { label: "User", value: "user" },
    { label: "Viewer", value: "viewer" }
  ];

  const statusOptions = [
    { label: "Active", value: "active" },
    { label: "Inactive", value: "inactive" },
    { label: "Pending", value: "pending" }
  ];

  const departmentOptions = [
    { label: "IT", value: "IT" },
    { label: "Facilities", value: "Facilities" },
    { label: "Operations", value: "Operations" },
    { label: "HR", value: "HR" },
    { label: "Finance", value: "Finance" },
    { label: "Marketing", value: "Marketing" }
  ];

  const permissionOptions = [
    { label: "Asset Management", value: "asset_management" },
    { label: "User Management", value: "user_management" },
    { label: "System Settings", value: "system_settings" },
    { label: "Reports", value: "reports" },
    { label: "Audit Logs", value: "audit_logs" }
  ];

  return (
    <div className="user-form">
      <Card>
        <div className="form-header">
          <h2>{isAddMode ? "Add User" : "Edit User"}</h2>
          <div className="form-actions">
            <Button
              label="Cancel"
              icon="pi pi-times"
              className="p-button-secondary"
              onClick={handleCancel}
            />
            <Button
              label={isAddMode ? "Create" : "Update"}
              icon="pi pi-check"
              onClick={handleSubmit}
              loading={loading}
            />
          </div>
        </div>

        <form onSubmit={handleSubmit} className="user-form-content">
          <div className="form-grid">
            <div className="form-field">
              <label htmlFor="username">Username *</label>
              <InputText
                id="username"
                value={formData.username}
                onChange={(e) => handleInputChange("username", e.target.value)}
                placeholder="Enter username"
                required
              />
            </div>

            <div className="form-field">
              <label htmlFor="email">Email *</label>
              <InputText
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                placeholder="Enter email address"
                required
              />
            </div>

            <div className="form-field">
              <label htmlFor="firstName">First Name *</label>
              <InputText
                id="firstName"
                value={formData.firstName}
                onChange={(e) => handleInputChange("firstName", e.target.value)}
                placeholder="Enter first name"
                required
              />
            </div>

            <div className="form-field">
              <label htmlFor="lastName">Last Name *</label>
              <InputText
                id="lastName"
                value={formData.lastName}
                onChange={(e) => handleInputChange("lastName", e.target.value)}
                placeholder="Enter last name"
                required
              />
            </div>

            <div className="form-field">
              <label htmlFor="phone">Phone</label>
              <InputText
                id="phone"
                value={formData.phone}
                onChange={(e) => handleInputChange("phone", e.target.value)}
                placeholder="Enter phone number"
              />
            </div>

            <div className="form-field">
              <label htmlFor="department">Department</label>
              <Dropdown
                id="department"
                value={formData.department}
                options={departmentOptions}
                onChange={(e) => handleInputChange("department", e.value)}
                placeholder="Select department"
                showClear
              />
            </div>

            <div className="form-field">
              <label htmlFor="role">Role *</label>
              <Dropdown
                id="role"
                value={formData.role}
                options={roleOptions}
                onChange={(e) => handleInputChange("role", e.value)}
                placeholder="Select role"
                required
              />
            </div>

            <div className="form-field">
              <label htmlFor="status">Status *</label>
              <Dropdown
                id="status"
                value={formData.status}
                options={statusOptions}
                onChange={(e) => handleInputChange("status", e.value)}
                placeholder="Select status"
                required
              />
            </div>

            <div className="form-field">
              <label htmlFor="isActive">Active Status</label>
              <Dropdown
                id="isActive"
                value={formData.isActive}
                options={[
                  { label: "Active", value: true },
                  { label: "Inactive", value: false }
                ]}
                onChange={(e) => handleInputChange("isActive", e.value)}
                placeholder="Select active status"
              />
            </div>

            <div className="form-field full-width">
              <label htmlFor="permissions">Permissions</label>
              <Dropdown
                id="permissions"
                value={formData.permissions}
                options={permissionOptions}
                onChange={(e) => handleInputChange("permissions", e.value)}
                placeholder="Select permissions"
                multiple
                showClear
              />
            </div>
          </div>
        </form>
      </Card>
    </div>
  );
};
