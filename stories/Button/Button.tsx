interface ButtonProps {
  children?: React.ReactNode;
  mode?:
    | "addnew"
    | "edit"
    | "delete"
    | "save"
    | "cancel"
    | "submit"
    | "primary"
    | "secondary"
    | "danger"
    | "success"
    | "warning"
    | "info"
    | "light"
    | "dark"
    | "accept";

  onClick?: () => void;
  disabled?: boolean;
  type?: "submit" | "reset" | "button" | undefined;
  className?: string;
  loading?: boolean;
}

export const Button = ({
  children,
  className,
  disabled,
  loading,
  mode = "primary",
  onClick,
  type,
}: ButtonProps) => {
  return (
    <button
      disabled={disabled || loading}
      type={type}
      onClick={onClick}
      className={`rounded-md px-3 py-2 text-sm font-semibold shadow-xs  ${
        mode === "primary"
          ? "bg-indigo-600 text-white hover:bg-indigo-500 focus-visible:outline-indigo-600"
          : mode === "secondary"
          ? "bg-gray-200 text-gray-900 hover:bg-gray-300 focus-visible:outline-gray-300"
          : mode === "danger"
          ? "bg-red-600 text-white hover:bg-red-500 focus-visible:outline-red-600"
          : mode === "success"
          ? "bg-green-600 text-white hover:bg-green-500 focus-visible:outline-green-600"
          : mode === "warning"
          ? "bg-yellow-600 text-white hover:bg-yellow-500 focus-visible:outline-yellow-600"
          : mode === "info"
          ? "bg-blue-600 text-white hover:bg-blue-500 focus-visible:outline-blue-600"
          : mode === "light"
          ? "bg-white text-gray-900 hover:bg-gray-100 focus-visible:outline-gray-100"
          : mode === "dark"
          ? "bg-gray-800 text-white hover:bg-gray-700 focus-visible:outline-gray-700"
          : mode === "save"
          ? "bg-green-600 text-white hover:bg-green-500 focus-visible:outline-green-600"
          : mode === "edit"
          ? "bg-yellow-600 text-white hover:bg-yellow-500 focus-visible:outline-yellow-600"
          : mode === "delete"
          ? "bg-red-600 text-white hover:bg-red-500 focus-visible:outline-red-600"
          : mode === "cancel"
          ? "inline-flex justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-xs ring-1 ring-gray-300 ring-inset hover:bg-gray-50 sm:mt-0 sm:w-auto"
          : mode === "accept"
          ? "bg-green-600 text-white hover:bg-green-500 focus-visible:outline-green-600"
          : ""
      } ${className}`}
    >
      {children}
    </button>
  );
};
