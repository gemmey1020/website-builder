"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";

// الثيمات المتاحة
const themes = {
  light: extendTheme({ config: { initialColorMode: "light" }, colors: { primary: "#3182CE" } }),
  dark: extendTheme({ config: { initialColorMode: "dark" }, colors: { primary: "#E53E3E" } }),
  custom: extendTheme({ config: { initialColorMode: "light" }, colors: { primary: "#805AD5" } }),
};

const ThemeContext = createContext({ theme: "light", setTheme: (theme: string) => {} });

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const fetchTheme = async () => {
      const res = await fetch("http://127.0.0.1:8000/api/theme", {
        headers: { "Authorization": `Bearer ${document.cookie.replace(/(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/, "$1")}` }
      });
      const data = await res.json();
      setTheme(data.theme || "light");
    };
    fetchTheme();
  }, []);

  const updateTheme = async (newTheme: string) => {
    setTheme(newTheme);
    await fetch("http://127.0.0.1:8000/api/theme", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${document.cookie.replace(/(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/, "$1")}`
      },
      body: JSON.stringify({ theme: newTheme }),
    });
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme: updateTheme }}>
      <ChakraProvider theme={themes[theme]}>{children}</ChakraProvider>
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
