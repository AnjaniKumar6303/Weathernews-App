import React, { createContext, useState, ReactNode } from "react";

export type Unit = "metric" | "imperial";

type SettingsContextType = {
  unit: Unit;
  setUnit: (u: Unit) => void;
  categories: string[];
  setCategories: (c: string[]) => void;
};

export const SettingsContext = createContext<SettingsContextType>({
  unit: "metric",
  setUnit: () => {},
  categories: ["general"],
  setCategories: () => {},
});

export const SettingsProvider = ({ children }: { children: ReactNode }) => {
  const [unit, setUnit] = useState<Unit>("metric");
  const [categories, setCategories] = useState<string[]>(["general"]);

  return (
    <SettingsContext.Provider value={{ unit, setUnit, categories, setCategories }}>
      {children}
    </SettingsContext.Provider>
  );
};
