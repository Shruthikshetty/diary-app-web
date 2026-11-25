"use client";
import { createContext, useContext, useState } from "react";

export function Loader({
  size = "normal",
}: {
  size?: "normal" | "Large" | "xLarge";
}) {
  const style = {
    normal: "h-10 w-10 border-5 ",
    Large: "h-20 w-20 border-8 ",
    xLarge: "h-40 w-40 border-10",
  };

  return (
    <div
      className={`${style[size]} rounded-full border-border border-t-primary animate-spin`}
    />
  );
}

export function ScreenLoader() {
  return (
    <div
      className="flex items-center justify-center absolute bg-surface/30 backdrop-blur-sm inset-0 z-50"
      onClick={(e) => e.stopPropagation()}
    >
      <Loader size="Large" />
    </div>
  );
}

// context for screen loader
export const ScreenLoaderContext = createContext<{
  setScreenLoader: (value: React.SetStateAction<boolean>) => void;
  screenLoader: boolean;
}>(null!);

//provider for screen loader
export function ScreenLoaderProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [screenLoader, setScreenLoader] = useState(false);

  return (
    <ScreenLoaderContext.Provider value={{ screenLoader, setScreenLoader }}>
      {screenLoader ? <ScreenLoader /> : null}
      {children}
    </ScreenLoaderContext.Provider>
  );
}

// hook to get access to the context state
export const useScreenLoader = () => {
  const context = useContext(ScreenLoaderContext);
  if (!context) {
    throw new Error("useScreenLoader must be used within ScreenLoaderProvider");
  }
  return context;
};

export default useScreenLoader;
