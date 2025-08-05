import { RefObject } from "react";
import { Toast } from "primereact/toast";

export type ToastSeverity = "success" | "info" | "warn" | "error";

export interface ToastMessage {
  severity: ToastSeverity;
  summary: string;
  detail?: string;
  life?: number;
}

export interface ToastUtils {
  showSuccess: (summary: string, detail?: string, life?: number) => void;
  showError: (summary: string, detail?: string, life?: number) => void;
  showInfo: (summary: string, detail?: string, life?: number) => void;
  showWarning: (summary: string, detail?: string, life?: number) => void;
  showDeleted: (entity: string, detail?: string) => void;
  showUpdated: (entity: string, detail?: string) => void;
  showCreated: (entity: string, detail?: string) => void;
  showSaved: (entity: string, detail?: string) => void;
  showActionSuccess: (action: string, entity: string, detail?: string) => void;
  showActionError: (action: string, entity: string, detail?: string) => void;
  showValidationError: (message: string) => void;
  showNetworkError: (detail?: string) => void;
  showCustom: (message: ToastMessage) => void;
}

export const createToastUtils = (
  toastRef: RefObject<Toast | null>
): ToastUtils => {
  const showToast = (message: ToastMessage) => {
    toastRef.current?.show(message);
  };

  return {
    showSuccess: (summary: string, detail?: string, life: number = 3000) => {
      showToast({ severity: "success", summary, detail, life });
    },

    showError: (summary: string, detail?: string, life: number = 5000) => {
      showToast({ severity: "error", summary, detail, life });
    },

    showInfo: (summary: string, detail?: string, life: number = 3000) => {
      showToast({ severity: "info", summary, detail, life });
    },

    showWarning: (summary: string, detail?: string, life: number = 4000) => {
      showToast({ severity: "warn", summary, detail, life });
    },

    showDeleted: (entity: string, detail?: string) => {
      showToast({
        severity: "success",
        summary: "Deleted",
        detail: detail || `${entity} deleted successfully`,
        life: 3000
      });
    },

    showUpdated: (entity: string, detail?: string) => {
      showToast({
        severity: "success",
        summary: "Updated",
        detail: detail || `${entity} updated successfully`,
        life: 3000
      });
    },

    showCreated: (entity: string, detail?: string) => {
      showToast({
        severity: "success",
        summary: "Created",
        detail: detail || `${entity} created successfully`,
        life: 3000
      });
    },

    showSaved: (entity: string, detail?: string) => {
      showToast({
        severity: "success",
        summary: "Saved",
        detail: detail || `${entity} saved successfully`,
        life: 3000
      });
    },

    showActionSuccess: (action: string, entity: string, detail?: string) => {
      showToast({
        severity: "success",
        summary: action,
        detail: detail || `${action} ${entity} successfully`,
        life: 3000
      });
    },

    showActionError: (action: string, entity: string, detail?: string) => {
      showToast({
        severity: "error",
        summary: `${action} Failed`,
        detail: detail || `Failed to ${action.toLowerCase()} ${entity}`,
        life: 5000
      });
    },

    showValidationError: (message: string) => {
      showToast({
        severity: "error",
        summary: "Validation Error",
        detail: message,
        life: 5000
      });
    },

    showNetworkError: (detail?: string) => {
      showToast({
        severity: "error",
        summary: "Network Error",
        detail: detail || "Unable to connect to the server. Please try again.",
        life: 5000
      });
    },

    showCustom: (message: ToastMessage) => {
      showToast(message);
    }
  };
};
