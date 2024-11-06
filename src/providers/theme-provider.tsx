"use client";
import {useTheme} from "@/hooks/use-theme";
import {useEffect} from "react";

export const ThemeProvider = ({children}: {children: React.ReactNode}) => {
  const {loadTheme} = useTheme();
  useEffect(() => {
    loadTheme();
  }, []);
  return (
    <>
      {children}
    </>
  );
};
