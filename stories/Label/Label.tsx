interface Props {
  children: React.ReactNode;
  className?: string;
  htmlFor?: string;
  id?: string;
}

export const Label = ({ children, className, htmlFor, id }: Props) => {
  return (
    <label
      id={id}
      htmlFor={htmlFor}
      className={`block text-sm/6 font-medium text-gray-900 ${className}`}
    >
      {children}
    </label>
  );
};
