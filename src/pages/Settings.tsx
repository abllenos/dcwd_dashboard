import { dashboardStyles as s } from "../styles/DashboardStyle";
import { Typography, Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useUserStore } from "../stores/store";

const { Title } = Typography;

const Settings = () => {
  const user = useUserStore((s) => s.user);
  const profile = {
    name: user?.name || "",
    employeeId: user?.employeeId || "",
    department: user?.department || "",
    firstName: user?.firstName || "",
    middleName: user?.middleName || "",
    lastName: user?.lastName || "",
    email: user?.email || "",
    mobile: user?.mobile || "",
  };

  return (
    <div style={{ padding: 24 }}>
      <div style={s.header}>
        <Title level={4} style={{ margin: 0 }}>Settings</Title>
      </div>

      <div style={s.settingsBox}>
        <div style={s.settingsHeader}>
          <Avatar size={64} icon={<UserOutlined />} />
          <div>
            <div style={{ fontWeight: 700 }}>{profile.name || "Profile"}</div>
            <div style={{ fontSize: 12, color: "var(--muted)" }}>{profile.employeeId}</div>
          </div>
        </div>
        <div style={{ borderBottom: "1px solid var(--border)", marginBottom: 16 }}></div>

        <div style={s.settingsGrid}>
          <div style={s.settingsItem}>
            <div style={s.settingsLabel}>Employee ID</div>
            <div style={s.settingsValue}>{profile.employeeId}</div>
          </div>
          <div style={s.settingsItem}>
            <div style={s.settingsLabel}>Department</div>
            <div style={s.settingsValue}>{profile.department}</div>
          </div>

          <div style={s.settingsItem}>
            <div style={s.settingsLabel}>Firstname</div>
            <div style={s.settingsValue}>{profile.firstName}</div>
          </div>
          <div style={s.settingsItem}>
            <div style={s.settingsLabel}>Middle Name</div>
            <div style={s.settingsValue}>{profile.middleName}</div>
          </div>

          <div style={s.settingsItem}>
            <div style={s.settingsLabel}>Last Name</div>
            <div style={s.settingsValue}>{profile.lastName}</div>
          </div>
          <div style={s.settingsItem}>
            <div style={s.settingsLabel}>Email Address</div>
            <div style={s.settingsValue}>{profile.email}</div>
          </div>

          <div style={s.settingsItem}>
            <div style={s.settingsLabel}>Mobile No</div>
            <div style={s.settingsValue}>{profile.mobile}</div>
          </div>
        </div>

        <div style={s.settingsActions}>
          <button
            style={{
              background: "linear-gradient(90deg,#5b7cfa,#4f46e5)",
              color: "#fff",
              border: "none",
              padding: "10px 18px",
              borderRadius: 10,
              cursor: "pointer",
              fontWeight: 600,
            }}
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
