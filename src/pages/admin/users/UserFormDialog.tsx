import React, { useState, useEffect } from "react";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { Toast } from "primereact/toast";
import { useToast } from "@/hooks/useToast";
import { sampleUsers } from "@/data/sampleData";
import "./UserForm.css";
import { User } from "@/types/models";

interface UserFormDialogProps {
  onSave: (user: User) => void;
  onCancel: () => void;
  userId?: string;
  mode?: "add" | "edit";
  toastRef?: React.RefObject<Toast | null>;
}

export const UserFormDialog: React.FC<UserFormDialogProps> = ({
  onSave,
  onCancel,
  userId,
  mode = "add",
  toastRef
}) => {
  const { showSuccess, showError } = useToast(toastRef || { current: null });

  const [formData, setFormData] = useState<User>({
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
  const isEditMode = mode === "edit" && userId && userId !== "new";

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

  const handleInputChange = (field: keyof User, value: unknown) => {
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
      await new Promise((resolve) => setTimeout(resolve, 1000));

      if (isEditMode) {
        showSuccess("User updated successfully");
      } else {
        showSuccess("User created successfully");
      }

      onSave(formData);
    } catch {
      showError("Failed to save user");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    onCancel();
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
    { label: "HR", value: "HR" },
    { label: "Finance", value: "Finance" },
    { label: "Operations", value: "Operations" },
    { label: "Sales", value: "Sales" },
    { label: "Marketing", value: "Marketing" }
  ];

  return (
    <div className="user-form-dialog">
      <form onSubmit={handleSubmit} className="user-form">
        <div className="form-row">
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
              placeholder="Enter email"
              required
            />
          </div>
        </div>

        <div className="form-row">
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
        </div>

        <div className="form-row">
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
        </div>

        <div className="form-row">
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
            <label htmlFor="status">Status</label>
            <Dropdown
              id="status"
              value={formData.status}
              options={statusOptions}
              onChange={(e) => handleInputChange("status", e.value)}
              placeholder="Select status"
            />
          </div>
        </div>

        <div className="form-actions">
          <Button
            type="button"
            label="Cancel"
            icon="pi pi-times"
            onClick={handleCancel}
            className="p-button-secondary"
          />
          <Button
            type="submit"
            label={isEditMode ? "Update User" : "Create User"}
            icon="pi pi-check"
            loading={loading}
            className="p-button-primary"
          />
        </div>
      </form>
    </div>
  );
};
