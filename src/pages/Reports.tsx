import React, { useMemo, useState } from "react";
import { Typography, Card, Form, Input, Button, Select, Row, Col, Segmented } from "antd";
import { SearchOutlined, EnvironmentOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const { Title, Text } = Typography;

const Reports: React.FC = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [mapMode, setMapMode] = useState<"map" | "satellite">("map");
  const [selectedMO, setSelectedMO] = useState<string>("Report a leak");

  const detailsPlaceholder = useMemo(() => {
    switch (selectedMO) {
      case "Report a leak":
        return "Describe the leak location, severity, and visible signs (e.g., pooling water, hissing).";
      case "No water supply":
        return "Describe the outage timing, known nearby outages, and any valve work or maintenance in area.";
      case "Low Pressure":
        return "Describe pressure issues, time of day, and whether neighbors are affected.";
      case "Water Quality":
        return "Describe discoloration, odor, taste, or particles; include when it started and any nearby works.";
      default:
        return "Provide relevant report details.";
    }
  }, [selectedMO]);

  const onSearchAccount = (value: string) => {
    form.setFieldsValue({ accountOrMeter: value });
  };

  const onFinish = (values: any) => {
    navigate("/reports");
  };

  const headerCardStyle: React.CSSProperties = {
    background: "var(--card)",
    border: "1px solid var(--border)",
    padding: 16,
    borderRadius: 14,
    marginBottom: 20,
  };

  const sectionCardStyle: React.CSSProperties = {
    background: "var(--card)",
    border: "1px solid var(--border)",
    padding: 20,
    borderRadius: 16,
    height: "100%",
  };

  const mapBoxStyle: React.CSSProperties = {
    border: "1px solid var(--border)",
    borderRadius: 12,
    height: 320,
    marginTop: 12,
    background: mapMode === "map" ? "#e6f4ff" : "#1c1c1c",
    backgroundImage:
      mapMode === "satellite"
        ? "linear-gradient(135deg, #2c2c2c 0%, #3a3a3a 50%, #1c1c1c 100%)"
        : "linear-gradient(135deg, #f0f7ff 0%, #e6f4ff 50%, #eaf6ff 100%)",
  };

  return (
    <div style={{ padding: 24 }}>
      <div style={headerCardStyle}>
        <Title level={4} style={{ margin: 0, color: "var(--text)" }}>
          Create a Report
        </Title>
      </div>

      <Row gutter={16}>
        <Col xs={24} lg={12}>
          <Card style={sectionCardStyle} title={<span style={{ color: "var(--text)" }}>Report Information</span>}>
            <Form form={form} layout="vertical" onFinish={onFinish}>
              <Form.Item label="Account No. / Meter No." name="accountOrMeter">
                <Input size="large" placeholder="Enter Account No. or Meter No." prefix={<SearchOutlined />} />
              </Form.Item>
              <div style={{ display: "flex", justifyContent: "flex-end", marginTop: -8, marginBottom: 8 }}>
                <Button type="default" size="small" icon={<SearchOutlined />} onClick={() => onSearchAccount(form.getFieldValue("accountOrMeter") || "")}>Search</Button>
              </div>
              <Form.Item label="Select MO" name="mo" initialValue={selectedMO}>
                <Select
                  size="large"
                  options={[
                    { label: "Report a leak", value: "Report a leak" },
                    { label: "No water supply", value: "No water supply" },
                    { label: "Low Pressure", value: "Low Pressure" },
                    { label: "Water Quality", value: "Water Quality" },
                  ]}
                  onChange={(v) => setSelectedMO(v)}
                />
              </Form.Item>
              <Form.Item label="Report Details" name="details" rules={[{ required: true, message: "Please provide report details" }]}>
                <Input.TextArea rows={6} placeholder={detailsPlaceholder} />
              </Form.Item>
            </Form>
          </Card>
        </Col>

        <Col xs={24} lg={12}>
          <Card style={sectionCardStyle} title={<span style={{ color: "var(--text)" }}>Search Address</span>}>
            <Form form={form} layout="vertical" onFinish={onFinish}>
              <Form.Item label="Address" name="address" rules={[{ required: true, message: "Please enter an address" }]}>
                <Input size="large" placeholder="Enter address or landmark" prefix={<EnvironmentOutlined />} />
              </Form.Item>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <Text style={{ color: "var(--muted)" }}>Map Mode</Text>
                <Segmented
                  size="middle"
                  value={mapMode}
                  onChange={(v) => setMapMode(v as any)}
                  options={[{ label: "Map", value: "map" }, { label: "Satellite", value: "satellite" }]}
                />
              </div>
              <div style={mapBoxStyle} />
            </Form>
          </Card>
        </Col>
      </Row>

      <div style={{ display: "flex", justifyContent: "flex-end", gap: 12, marginTop: 16 }}>
        <Button onClick={() => navigate("/dashboard")}>Cancel</Button>
        <Button type="primary" onClick={() => form.submit()}>Submit</Button>
      </div>
    </div>
  );
};

export default Reports;
