import React, { useState, useEffect } from "react";
import { Dark, Light } from "./icons";

const ThemeSwitcher: React.FC = () => {
  const [darkMode, setDarkMode] = useState(
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    localStorage.getItem("darkMode")
      ? JSON.parse(localStorage.getItem("darkMode")!)
      : false
  );

  useEffect(() => {
    const prefersDarkMode =
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches;
    setDarkMode(prefersDarkMode);
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
  }, [darkMode]);

  const handleDarkModeToggle = () => {
    setDarkMode(!darkMode);
  };

  return (
    <button onClick={handleDarkModeToggle}>
      {darkMode ? <Dark /> : <Light />}
    </button>
  );
};

export default ThemeSwitcher;
