import { useState } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import { AppLayout } from "./components/layout";
import AccountPage from "./pages/account";
import ClientsPage from "./pages/account/clients";
import UsersPage from "./pages/account/users";
import AnalyticsHomepage from "./pages/analytics";
import OrdersPage from "./pages/analytics/orders";
import ProductsPage from "./pages/analytics/products";
import AppointmentsHomepage from "./pages/appointments";
import CalendarPage from "./pages/appointments/calendar";
import HomePage from "./pages/home";
import AnalyticsPage from "./pages/home/analytics";
import DashboardPage from "./pages/home/dashboard";
import LoginPage from "./pages/login";
import { ForgotPassword } from "./pages/login/ForgotPassword";
import RegisterPage from "./pages/register";
import ResetPasswordPage from "./pages/resetPassword";
import SecurityPage from "./pages/security";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/app" Component={AppLayout}>
          <Route index Component={HomePage} />
          <Route path="home" Component={HomePage} />
          <Route path="home/dashboard" Component={DashboardPage} />
          <Route path="home/analytics" Component={AnalyticsPage} />
          <Route path="analytics" Component={AnalyticsHomepage} />
          <Route path="analytics/products" Component={ProductsPage} />
          <Route path="analytics/orders" Component={OrdersPage} />
          <Route path="appointments" Component={AppointmentsHomepage} />
          <Route path="appointments/calendar" Component={CalendarPage} />
          <Route path="account" Component={AccountPage} />
          <Route path="account/customers" Component={ClientsPage} />
          <Route path="account/users" Component={UsersPage} />
          <Route path="security" Component={SecurityPage} />
        </Route>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" Component={LoginPage} />
        <Route path="/register" Component={RegisterPage} />
        <Route path="/forgot-password" Component={ForgotPassword} />
        <Route path="/reset-password" Component={ResetPasswordPage} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
