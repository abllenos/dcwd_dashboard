import { CSSProperties } from "react";

type Styles = Record<string, CSSProperties>;

export const dashboardStyles: Styles = {
  layout: {
    display: "flex",
    minHeight: "100vh",
    background: "var(--bg)",
  },

  sidebar: {
    width: 260,
    background: "var(--sidebar-bg)",
    borderRight: "1px solid var(--border)",
    padding: 20,
  },

  profile: {
    textAlign: "center",
    marginBottom: 30,
  },

  avatar: {
    width: 80,
    height: 80,
    borderRadius: "50%",
    background: "#5b7cfa",
    margin: "0 auto 10px",
  },

  menuItem: {
    padding: "10px 16px",
    borderRadius: 10,
    marginBottom: 6,
    cursor: "pointer",
    color: "var(--text)",
  },

  activeMenu: {
    background: "var(--primary)",
    color: "#fff",
  },

  main: {
    flex: 1,
    padding: 24,
    color: "var(--text)",
  },

  header: {
    background: "var(--card)",
    padding: 16,
    borderRadius: 14,
    marginBottom: 20,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },

  cards: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: 20,
    marginBottom: 20,
  },

  card: {
    background: "var(--card)",
    padding: 20,
    borderRadius: 16,
  },

  chart: {
    background: "var(--card)",
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
  },

  table: {
    background: "var(--card)",
    borderRadius: 16,
    padding: 20,
  },

  statusGreen: {
    background: "#22c55e",
    color: "#fff",
    padding: "4px 10px",
    borderRadius: 20,
    fontSize: 12,
  },

  statusYellow: {
    background: "#facc15",
    color: "#000",
    padding: "4px 10px",
    borderRadius: 20,
    fontSize: 12,
  },

  // Settings panel styles
  settingsBox: {
    background: "var(--card)",
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    boxShadow: "0 1px 2px rgba(0,0,0,0.04)",
  },

  settingsHeader: {
    display: "flex",
    alignItems: "center",
    gap: 12,
    marginBottom: 16,
  },

  settingsGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 16,
  },

  settingsItem: {
    background: "#f8f9fc",
    borderRadius: 12,
    padding: 12,
  },

  settingsLabel: {
    color: "var(--muted)",
    fontSize: 12,
    marginBottom: 6,
  },

  settingsValue: {
    fontSize: 14,
    color: "var(--text)",
    fontWeight: 600,
  },

  settingsActions: {
    display: "flex",
    justifyContent: "flex-end",
    marginTop: 16,
  },
};
