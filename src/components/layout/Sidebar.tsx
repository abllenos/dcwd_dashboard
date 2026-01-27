import React from "react";
import { Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";

export interface SidebarItem {
  path: string;
  label: React.ReactNode;
  icon?: React.ReactNode;
}

interface SidebarProps {
  items: SidebarItem[];
  currentPath?: string;
  onNavigate: (path: string) => void;
  style?: React.CSSProperties;
  collapsed?: boolean;
  collapsedWidth?: number;
  width?: number;
  logoSrc?: string;
  userName?: string;
  employeeId?: string;
  headerHeight?: number;
}

export const Sidebar: React.FC<SidebarProps> = ({ items, currentPath, onNavigate, style, collapsed, collapsedWidth = 80, width = 260, logoSrc, userName, employeeId, headerHeight = 64 }) => (
  <div
    style={{
      width: collapsed ? collapsedWidth : width,
      background: "var(--sidebar-bg)",
      borderRight: "1px solid var(--border)",
      padding: "0 16px 12px 16px",
      transition: "width 0.2s ease",
      display: "flex",
      flexDirection: "column",
      ...style,
    }}
  >
    {/* Top logo area aligned with header height */}
    {logoSrc && (
      <div
        style={{
          height: headerHeight,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          borderBottom: "1px solid var(--border)",
          marginBottom: 12,
        }}
      >
        <img
          src={logoSrc}
          alt="Logo"
          style={{ width: collapsed ? 44 : 64, height: collapsed ? 44 : 64, objectFit: "contain" }}
        />
      </div>
    )}

    {/* Profile block: avatar, name, employeeId */}
    {userName && (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginBottom: 12,
          paddingBottom: 12,
          borderBottom: "1px solid var(--border)",
        }}
      >
        <Avatar size={collapsed ? 40 : 64} icon={<UserOutlined />} />
        {!collapsed && (
          <>
            <div style={{ color: "var(--text)", fontWeight: 600, textAlign: "center", marginTop: 8 }}>{userName}</div>
            {employeeId && (
              <div style={{ color: "var(--muted)", fontSize: 12, textAlign: "center" }}>{employeeId}</div>
            )}
          </>
        )}
      </div>
    )}

    {/* Menu items */}
    <div style={{ flex: 1 }}>
      {items.map((item) => {
        const active = currentPath === item.path;
        const itemStyle: React.CSSProperties = {
          padding: "10px 16px",
          borderRadius: 10,
          marginBottom: 6,
          cursor: "pointer",
          color: "var(--text)",
          ...(active ? { background: "var(--primary)", color: "#fff" } : {}),
          display: "flex",
          alignItems: "center",
          gap: 8,
          whiteSpace: "nowrap",
        };
        return (
          <div key={item.path} style={itemStyle} onClick={() => onNavigate(item.path)}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: 20 }}>{item.icon}</div>
            {!collapsed && <span>{item.label}</span>}
          </div>
        );
      })}
    </div>
  </div>
);

export default Sidebar;
