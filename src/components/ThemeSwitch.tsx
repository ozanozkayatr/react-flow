import { useEffect, useState } from "react";
import { styled } from "@mui/material";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";

const SwitchContainer = styled("div")({
  position: "relative",
  width: "64px",
  height: "32px",
  background: "#f0f0f0",
  borderRadius: "16px",
  padding: "4px",
  cursor: "pointer",
  transition: "all 0.4s ease",
  border: "1px solid rgba(0,0,0,0.1)",
  display: "flex",
  alignItems: "center",
  '&[data-theme="dark"]': {
    background: "#1a1a1a",
    border: "1px solid rgba(255,255,255,0.1)",
  },
  "&:hover": {
    '&[data-theme="light"]': {
      background: "#e8e8e8",
    },
    '&[data-theme="dark"]': {
      background: "#222222",
    },
  },
});

const Slider = styled("div")({
  position: "absolute",
  width: "24px",
  height: "24px",
  borderRadius: "50%",
  background: "linear-gradient(180deg, #ffffff 0%, #f5f5f5 100%)",
  boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  transition: "all 0.4s cubic-bezier(0.17, 0.67, 0.83, 0.67)",
  transform: "translateX(0)",
  left: "4px",
  '&[data-theme="dark"]': {
    transform: "translateX(32px)",
    background: "linear-gradient(180deg, #365985 0%, #243b5a 100%)",
  },
  "& svg": {
    fontSize: "14px",
    transition: "all 0.3s ease",
    color: "#ffa726",
    '&[data-theme="dark"]': {
      color: "#fff",
    },
  },
});

const IconContainer = styled("div")({
  position: "absolute",
  width: "100%",
  height: "100%",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "0 8px",
  boxSizing: "border-box",
  pointerEvents: "none",
  "& svg": {
    fontSize: "12px",
    opacity: 0.5,
    transition: "all 0.3s ease",
    color: "#666",
    '&[data-theme="dark"]': {
      color: "#fff",
    },
  },
});

const ThemeSwitch = () => {
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  return (
    <SwitchContainer onClick={toggleTheme} data-theme={theme}>
      <IconContainer>
        <LightModeIcon data-theme={theme} />
        <DarkModeIcon data-theme={theme} />
      </IconContainer>
      <Slider data-theme={theme}>
        {theme === "dark" ? (
          <DarkModeIcon data-theme={theme} />
        ) : (
          <LightModeIcon data-theme={theme} />
        )}
      </Slider>
    </SwitchContainer>
  );
};

export default ThemeSwitch;
