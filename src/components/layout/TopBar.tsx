import React from "react";

interface TopBarProps {
  title?: React.ReactNode;
  actions?: React.ReactNode;
  style?: React.CSSProperties;
}

export const TopBar: React.FC<TopBarProps> = ({ title, actions, style }) => (
  <div
    style={{
      background: "var(--card)",
      padding: 16,
      borderRadius: 14,
      marginBottom: 20,
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      ...style,
    }}
  >
    {typeof title === "string" ? <strong>{title}</strong> : title}
    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>{actions}</div>
  </div>
);

export default TopBar;
