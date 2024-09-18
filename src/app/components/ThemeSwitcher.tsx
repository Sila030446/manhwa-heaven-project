"use client";

import { Switch } from "@nextui-org/react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { FaSun, FaMoon } from "react-icons/fa";

export function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div>
      <Switch
        isSelected={theme === "dark"}
        onChange={() => setTheme(theme === "dark" ? "light" : "dark")}
        size="md"
        color="secondary"
        startContent={<FaSun />}
        endContent={<FaMoon />}
      ></Switch>
    </div>
  );
}
