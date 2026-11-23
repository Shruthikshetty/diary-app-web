import { HtmlHTMLAttributes } from "react";

/**
 * button wrapper for the app
 */
export function AppButton({
  text,
  className,
  ...rest
}: HtmlHTMLAttributes<HTMLButtonElement> & { text: string }) {
  return (
    <button
      className={`w-full bg-primary rounded-lg p-2 text-white active:opacity-90 transition-opacity  ${className}`}
      {...rest}
    >
      {text}
    </button>
  );
}
