export type Props = {
  // If true, will pass native `event` to the `onChange` callback
  rawOnChange?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  // CSS class name that will be added to the component.
  className?: string;
  name?: string;
  // Auto-focus input
  autoFocus?: boolean;
  onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
  // Component label.
  label?: string;
  id?: string;

  // Is input disabled?
  disabled?: boolean;

  // Description beneath the input.

  // Placeholder is used with `fullwidth` prop instead of a `label`. `label` and `placeholder` are always mutually exclusive.
  placeholder?: string;

  // Type of input ()
  type?: string;
  // size of input field
  size?: string;
  // A ref for the native input.
  required?: boolean;
  // A callback that is executed when input focus is lost.
  onBlur?: (e: React.SyntheticEvent<HTMLInputElement>) => void;

  value?: string | number | readonly string[] | undefined;
  min?: number | string | undefined;
  max?: number | string | undefined;
  defaultValue?: string | number | readonly string[] | undefined;
  maxLength?: number | undefined;
  error?: string | boolean;
  pattern?: string | undefined;
  checked?: boolean | undefined;
  readonly?: boolean | undefined;
};

export const Input = ({
  autoFocus,
  checked,
  className,
  defaultValue,
  disabled,
  id,
  max,
  maxLength,
  min,
  name,
  onBlur,
  onChange,
  onFocus,
  pattern,
  placeholder,
  required,
  type = "text",
  value,
}: Props) => {
  return (
    <input
      placeholder={placeholder}
      disabled={disabled}
      autoFocus={autoFocus}
      // autoComplete="off"
      autoComplete="one-time-code"
      onChange={onChange}
      type={type}
      name={name}
      required={required}
      onFocus={onFocus}
      value={value}
      defaultValue={defaultValue}
      maxLength={maxLength}
      min={min}
      checked={checked}
      max={max}
      pattern={pattern}
      id={id}
      onBlur={onBlur}
      className={`block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 ${className}`}
    />
  );
};
