import { Typography } from "antd";

const { Title, Paragraph } = Typography;

const Operator = () => {
  return (
    <div style={{ padding: 24 }}>
      <div style={{ background: "#fff", padding: 16, borderRadius: 14, marginBottom: 20 }}>
        <Title level={4} style={{ margin: 0 }}>Operator</Title>
      </div>
      <div style={{ background: "#fff", padding: 20, borderRadius: 16 }}>
        <Paragraph>Operator tools and assignments will be shown here.</Paragraph>
      </div>
    </div>
  );
};

export default Operator;
