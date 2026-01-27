import { CSSProperties } from "react";
import loginBg from "../assets/image/Login.jpg";

type Styles = Record<string, CSSProperties>;

export const loginStyles: Styles = {
  layout: {
    minHeight: "100vh",
    display: "flex",
    position: "relative",
  },

  left: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    width: "calc(40% + 7.2%)",
    backgroundImage: `url(${loginBg})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    zIndex: 0,
  },

  right: {
    width: "60%",
    marginLeft: "40%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "var(--card)",
    clipPath: "polygon(12% 0, 100% 0, 100% 100%, 0 100%)",
    overflow: "hidden",
    position: "relative",
    zIndex: 1,
  },

  card: {
    width: 360,
    textAlign: "center",
  },

  form: {
    textAlign: "left",
    marginTop: 12,
  },


  usernameInput: {
    background: "var(--button-bg)",
    borderColor: "#1677ff",
    borderRadius: 4 ,
  },

  passwordInput: {
    background: "var(--button-bg)",
    borderColor: "#1677ff",
    borderRadius: 4,
  },

  loginButton: {
    background: "linear-gradient(135deg, #1d54a2 0%, #69b1ff 100%)",
    border: "none",
    height: 44,
    width: "100%",
    borderRadius: 10,
    fontWeight: 600,
  
  },

  logo: {
    width: 72,
    height: 72,
    objectFit: "contain",
    margin: "0 auto 16px",
    display: "block",
    
  },

  title: {
    fontSize: 24,
    fontWeight: 600,
  },

  subtitle: {
    color: "var(--muted)",
    marginBottom: 30,
    fontSize: 16,
  },
};
