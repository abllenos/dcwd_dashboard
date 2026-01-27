import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import "antd/dist/reset.css";
import { ConfigProvider } from "antd";
import { useUserStore } from "./stores/store";
import { getTheme } from "./styles/theme";

const Root = () => {
  const theme = useUserStore((s) => s.theme);
  useEffect(() => {
    const el = document.documentElement;
    if (theme === "dark") {
      el.classList.add("dark");
    } else {
      el.classList.remove("dark");
    }
  }, [theme]);
  return (
    <React.StrictMode>
      <ConfigProvider theme={getTheme(theme === "dark")}> 
        <App />
      </ConfigProvider>
    </React.StrictMode>
  );
};

ReactDOM.createRoot(document.getElementById("root")!).render(<Root />);
