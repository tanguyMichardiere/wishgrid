import { dark } from "@clerk/themes";
import type { BaseThemeTaggedType } from "@clerk/types";
import "client-only";
import { useTheme } from "next-themes";
import { useMemo } from "react";

export function useClerkTheme(): BaseThemeTaggedType | undefined {
  const { theme, systemTheme } = useTheme();

  return useMemo(
    () =>
      theme === "dark"
        ? dark
        : theme === "light"
          ? undefined
          : systemTheme === "dark"
            ? dark
            : undefined,
    [theme, systemTheme],
  );
}
