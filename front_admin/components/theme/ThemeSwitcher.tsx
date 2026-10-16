import { Button } from "@chakra-ui/react";
import { useTheme } from "./theme-provider";
// front_admin/components/theme/theme-provider.tsx
export default function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    const nextTheme = theme === "light" ? "dark" : theme === "dark" ? "custom" : "light";
    setTheme(nextTheme);
  };

  return <Button onClick={toggleTheme}>Switch Theme: {theme}</Button>;
}
