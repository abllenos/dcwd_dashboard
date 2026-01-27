import React from "react";

export interface CardProps {
  title?: React.ReactNode;
  extra?: React.ReactNode;
  children?: React.ReactNode;
  style?: React.CSSProperties;
}

export const Card: React.FC<CardProps> = ({ title, extra, children, style }) => (
  <div style={{ background: "var(--card)", borderRadius: 16, padding: 20, ...style }}>
    {(title || extra) && (
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
        {typeof title === "string" ? <strong>{title}</strong> : title}
        {extra}
      </div>
    )}
    {children}
  </div>
);

export default Card;
