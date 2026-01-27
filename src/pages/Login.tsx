import { Form, Input, Button, Typography } from "antd";
import { loginStyles } from "../styles/LoginStyle";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "../stores/store";
import logo from "../assets/image/dcwd.png";

const { Title, Text } = Typography;

const Login = () => {
  const navigate = useNavigate();
  const setUser = useUserStore((s) => s.setUser);
  const onFinish = (values: { username: string; password: string }) => {
    const name = values.username?.trim() || "User";
    const parts = name.split(/\s+/);
    const firstName = parts[0] || name;
    const lastName = parts.slice(1).join(" ") || "";

    setUser({
      name,
      employeeId: "002481",
      department: "Operations",
      firstName,
      middleName: "",
      lastName,
      email: `${firstName.toLowerCase()}.${(lastName || 'user').toLowerCase()}@example.com`,
      mobile: "+63 900 000 0000",
    });
    navigate("/dashboard");
  };

  return (
    <div style={loginStyles.layout}>
      <div style={loginStyles.left}></div>

      <div style={loginStyles.right}>
        <div style={loginStyles.card}>
          <img src={logo} alt="Logo" style={loginStyles.logo} />
          <Title style={loginStyles.title}>Login</Title>
          <Text style={loginStyles.subtitle}>Leak Reporting System</Text>

          <Form layout="vertical" onFinish={onFinish} style={loginStyles.form}>
            <Form.Item
              label="Username"
              name="username"
              rules={[{ required: true, message: "Please enter your username" }]}
            >
              <Input size="large" style={loginStyles.usernameInput} />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[{ required: true, message: "Please enter your password" }]}
            >
              <Input.Password size="large" style={loginStyles.passwordInput} />
            </Form.Item>

            <Form.Item style={loginStyles.buttonRow}>
              <Button
                type="primary"
                size="large"
                htmlType="submit"
                style={loginStyles.loginButton}
              >
                Log In
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Login;
