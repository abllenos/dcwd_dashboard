import React from "react";
import { Button as AntButton } from "antd";

export type ButtonVariant = "primary" | "secondary" | "outline" | "ghost";

export interface AppButtonProps extends React.ComponentProps<typeof AntButton> {
  variant?: ButtonVariant;
}

const stylesFor = (variant: ButtonVariant | undefined) => {
  switch (variant) {
    case "primary":
      return { background: "var(--primary)", color: "#fff", border: "none" };
    case "secondary":
      return { background: "var(--button-bg)", color: "var(--text)", border: "1px solid var(--button-border)" };
    case "outline":
      return { background: "transparent", color: "var(--text)", border: "1px solid var(--button-border)" };
    case "ghost":
      return { background: "transparent", color: "var(--text)", border: "none" };
    default:
      return {};
  }
};

export const Button: React.FC<AppButtonProps> = ({ variant = "secondary", style, ...props }) => {
  const styleMerged = { borderRadius: 8, ...stylesFor(variant), ...style } as React.CSSProperties;
  return <AntButton style={styleMerged} {...props} />;
};

export default Button;
