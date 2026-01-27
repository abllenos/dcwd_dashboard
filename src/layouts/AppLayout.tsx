import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useMemo, useState } from "react";
import { dashboardStyles as s } from "../styles/DashboardStyle";
import { useUserStore } from "../stores/store";
import { Sidebar, Footer } from "../components";
import sidebarLogo from "../assets/image/logo.png";
import { Layout, Button, Typography, Modal } from "antd";
import {
  DashboardOutlined,
  FileAddOutlined,
  TeamOutlined,
  ToolOutlined,
  FileTextOutlined,
  SunOutlined,
  MoonOutlined,
  SettingOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { menuItems, getSidebarWidth } from "../components/layout/menuItems";

const HEADER_HEIGHT = 64;
const BASE_SIDER_WIDTH = typeof window !== 'undefined' ? getSidebarWidth() : 260;
const SIDER_COLLAPSED_WIDTH = 80;

const AppLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const user = useUserStore((s) => s.user);
  const clearUser = useUserStore((s) => s.clearUser);
  const theme = useUserStore((s) => s.theme);
  const toggleTheme = useUserStore((s) => s.toggleTheme);
  const [logoutOpen, setLogoutOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  // Map provided CustomMenuItem structure to Sidebar items for available routes
  const routeMap: Record<string, string> = {
    home: "/dashboard",
    report: "/reports",
    maintenance: "/system-maintenance",
    // You can extend mappings as routes become available
  };
  const items = menuItems
    .filter((m) => routeMap[m.key])
    .map((m) => ({ path: routeMap[m.key], label: m.label, icon: m.icon }));

  const sidebarWidth = collapsed ? SIDER_COLLAPSED_WIDTH : BASE_SIDER_WIDTH;
  const headerLeft = sidebarWidth;
  const isDarkMode = theme === "dark";

  const headerStyles = useMemo(
    () => ({
      position: "fixed" as const,
      top: 0,
      right: 0,
      left: headerLeft,
      height: `${HEADER_HEIGHT}px`,
      padding: "0 20px",
      background: "var(--card)",
      borderBottom: "1px solid var(--border)",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      zIndex: 900,
      transition: "left 0.2s ease",
      boxShadow: "2px 2px 8px rgba(0,0,0,0.08)",
    }),
    [headerLeft]
  );

  return (
    <div style={{ background: "var(--bg)" }}>
      {/* Fixed Sidebar */}
      <Sidebar
        items={items}
        currentPath={location.pathname}
        onNavigate={(p) => navigate(p)}
        collapsed={collapsed}
        collapsedWidth={SIDER_COLLAPSED_WIDTH}
        width={BASE_SIDER_WIDTH}
        logoSrc={sidebarLogo}
        userName={user?.name || undefined}
        employeeId={user?.employeeId || undefined}
        headerHeight={HEADER_HEIGHT}
        style={{ position: "fixed", top: 0, bottom: 0, left: 0 }}
      />

      {/* Fixed Header */}
      <Layout.Header className="custom-header" style={headerStyles}>
        <div style={{ display: "flex", alignItems: "center", gap: 16, marginLeft: -4 }}>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed((c) => !c)}
          />
          <Typography.Text strong style={{ fontSize: 16, color: "var(--text)" }}>
            Leak Reporting System
          </Typography.Text>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <Button
            type="text"
            icon={isDarkMode ? <SunOutlined /> : <MoonOutlined />}
            onClick={toggleTheme}
            title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
          />
          <Button type="text" icon={<SettingOutlined />} onClick={() => navigate("/settings")} />
          <Button type="primary" icon={<LogoutOutlined />} onClick={() => setLogoutOpen(true)}>
            Log out
          </Button>
        </div>
      </Layout.Header>

      {/* Content wrapper with margins for fixed sidebar/header */}
      <div
        style={{
          marginLeft: sidebarWidth,
          padding: 24,
          paddingTop: 24 + HEADER_HEIGHT,
          transition: "margin-left 0.2s ease",
          color: "var(--text)",
        }}
      >
        <Outlet />
        <Footer />
      </div>
      <Modal
        open={logoutOpen}
        title="Confirm Logout"
        okText="Logout"
        cancelText="Cancel"
        onOk={() => {
          setLogoutOpen(false);
          clearUser();
          navigate("/");
        }}
        onCancel={() => setLogoutOpen(false)}
      >
        Are you sure you want to logout?
      </Modal>
    </div>
  );
};

export default AppLayout;