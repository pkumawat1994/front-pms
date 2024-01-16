import React from "react";
import { Route, Routes } from "react-router-dom";
import { adminRoutes } from "./appRoutes";
import Login from "../container/auth/login/Login";
import AdminDashboard from "../components/admin/adminDashboard/AdminDashboard";
import EmployeeList from "../container/pages/admin/employee/employeeList/EmployeeList";
import AddEmployee from "../container/pages/admin/employee/addEmployee/AddEmployee";
import ForgotPassword from "../container/auth/forgotPassword/ForgotPassword";
import Otp from "../container/auth/otp/Otp";
import ResetPassword from "../container/auth/resetPassword/ResetPassword";

const PublicRoutes = () => {
  return (
    <>
      <Routes>
        <Route path={adminRoutes.ADMIN_LOGIN} element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/input-otp" element={<Otp />} />
        <Route path="/reset-password" element={<ResetPassword />} />

        <Route path="admin/dashbaord/" element={<AdminDashboard />}>
          <Route path="employee-list" element={<EmployeeList />} />
          <Route path="add-employee" element={<AddEmployee />} />
        </Route>
      </Routes>
    </>
  );
};

export default PublicRoutes;
