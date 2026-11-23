import { InputHTMLAttributes } from "react";

/**
 * custom styled app input wrapper
 */
export function AppInput({
  className,
  title,
  rightbuttonText,
  ...rest
}: InputHTMLAttributes<HTMLInputElement> & {
  title?: string;
  rightbuttonText?: string;
}) {
  return (
    <div>
      {title && (
        <div className="flex flex-row justify-between mb-2">
          <label className="text-sm" htmlFor={rest?.id}>
            {title ?? ""}
          </label>
          {/* right button text */}
          {rightbuttonText && (
            <button>
              <span className="text-primary text-sm">{rightbuttonText}</span>
            </button>
          )}
        </div>
      )}
      <input
        className={`border-2 border-border bg-surface rounded-lg outline-none focus:border-primary min-h-10 w-full transition-colors px-3 ${className}`}
        {...rest}
      ></input>
    </div>
  );
}
