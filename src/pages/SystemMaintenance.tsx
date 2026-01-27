import { Typography } from "antd";

const { Title, Paragraph } = Typography;

const SystemMaintenance = () => {
  return (
    <div style={{ padding: 24 }}>
      <div style={{ background: "#fff", padding: 16, borderRadius: 14, marginBottom: 20 }}>
        <Title level={4} style={{ margin: 0 }}>System Maintenance</Title>
      </div>
      <div style={{ background: "#fff", padding: 20, borderRadius: 16 }}>
        <Paragraph>System tasks, health checks, and configurations will be handled here.</Paragraph>
      </div>
    </div>
  );
};

export default SystemMaintenance;
