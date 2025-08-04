import { toast as sonnerToast } from "sonner";

type ToastOptions = {
  title?: string;
  description?: string;
  actionLabel?: string;
  onActionClick?: () => void;
  duration?: number;
  type?: "success" | "error" | "warning" | "info" | "default";
};

function toast({
  title,
  description,
  actionLabel,
  onActionClick,
  duration = 4000,
  type = "default",
}: ToastOptions) {
  const toastContent = title ?? description ?? "";

  sonnerToast(toastContent, {
    description,
    duration,
    action: actionLabel
      ? {
          label: actionLabel,
          onClick: onActionClick,
        }
      : undefined,
    ...(type === "success" && { type: "success" }),
    ...(type === "error" && { type: "error" }),
    ...(type === "warning" && { type: "warning" }),
    ...(type === "info" && { type: "info" }),
  });
}

export function useToast() {
  return {
    toast,
    success: (msg: string) => sonnerToast.success(msg),
    error: (msg: string) => sonnerToast.error(msg),
    warning: (msg: string) => sonnerToast.warning(msg),
    info: (msg: string) => sonnerToast.info(msg),
    loading: (msg: string) => sonnerToast.loading(msg),
    dismiss: (id?: string) => sonnerToast.dismiss(id),
  };
}
