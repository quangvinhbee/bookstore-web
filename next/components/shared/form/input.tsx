import { useEffect, useState } from "react";

export interface InputProps extends FormControlProps {
  type?: "text" | "tel" | "email" | "number" | "password" | "url";
  prefix?: JSX.Element | string;
  prefixClassName?: string;
  prefixInputFocus?: boolean;
  suffix?: JSX.Element | string;
  suffixClassName?: string;
  suffixInputFocus?: boolean;
  inputClassName?: string;
  number?: boolean;
  negative?: boolean;
  decimal?: boolean;
  label?: string;
  currency?: boolean | string;
  autoFocus?: boolean;
  multi?: boolean;
}
export function Input({
  label,
  type = "text",
  number = false,
  multi = false,
  controlClassName = "form-control",
  className = "",
  prefixClassName = "",
  suffixClassName = "",
  prefixInputFocus = true,
  suffixInputFocus = true,
  inputClassName = "",
  defaultValue = getDefaultValue({ number, multi }),
  style = {},
  ...props
}: InputProps) {
  const [value, setValue] = useState("");
  useEffect(() => {
    if (value !== undefined && props.onChange) {
      props.onChange(
        value,
        number || type == "number" ? parseTextToNumber(value) : null
      );
    }
  }, [value]);
  return (
    <div className="mb-8">
      {props.name && (
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor={props.name}
        >
          {props.name}
        </label>
      )}

      <input
        className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
        id={label}
        type={type}
        value={value}
        placeholder={props.placeholder}
        onChange={(data) => setValue(data.target.value)}
      />
    </div>
  );
}

const getDefaultValue = (props: InputProps) => {
  return props.multi ? [] : props.number ? null : "";
};

export const parseTextToNumber = (text: string) => {
  if (text) {
    if (typeof text == "number") return text;

    let num: string | number;
    num = text.replace(/[^0-9\-\,]/g, "").trim();
    num = num.replace(",", ".");
    if (num.endsWith(".")) num += "0";
    num = Number(num);
    return isNaN(num) ? 0 : num;
  }
  return null;
};

Input.getDefaultValue = getDefaultValue;
