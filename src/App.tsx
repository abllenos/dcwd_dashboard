import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { Suspense, lazy } from "react";
import { Spin } from "antd";
import AppLayout from "./layouts/AppLayout";

const Login = lazy(() => import("./pages/Login"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Settings = lazy(() => import("./pages/Settings"));
const Operator = lazy(() => import("./pages/Operator"));
const SystemMaintenance = lazy(() => import("./pages/SystemMaintenance"));
const Reports = lazy(() => import("./pages/Reports"));

const App = () => {
  return (
    <BrowserRouter>
      <Suspense
        fallback={
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100vh" }}>
            <Spin size="large" />
          </div>
        }
      >
        <Routes>
          <Route path="/" element={<Login />} />
          <Route element={<AppLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/operator" element={<Operator />} />
            <Route path="/system-maintenance" element={<SystemMaintenance />} />
            <Route path="/reports" element={<Reports />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default App;
