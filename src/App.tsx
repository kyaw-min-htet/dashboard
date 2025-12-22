import React from "react";
import DashbordLayout from "./layouts/DashbordLayout";
import { Routes, Route } from "react-router-dom";
import Contacts from "./pages/Contacts";
import Dashboard from "./pages/Dashboard";
import Organizations from "./pages/Organizations";
import Report from "./pages/Reports";
import CreateOrganization from "./pages/CreateOrganization";
import CreateContacts from "./pages/CreateContacts";
import CreateUser from "./pages/CreateUser";
import EditUser from "./pages/EditUser";
import EditContact from "./pages/EditContact";
import EditOrganization from "./pages/EditOrganization";
import Profile from "./pages/Profile";
import ManageUser from "./pages/ManageUser";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import { AuthProvider } from "./contexts/AuthContext";

const App = () => {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <DashbordLayout />
          </ProtectedRoute>
        }>
          <Route index element={<Dashboard />} />
          <Route path="contacts" element={<Contacts />} />
          <Route path="create-contact" element={<CreateContacts />} />
          <Route path="organizations" element={<Organizations />} />
          <Route path="create-organization" element={<CreateOrganization />} />
          <Route path="report" element={<Report />} />
          <Route path="profile" element={<Profile />} />
          <Route path="manage-user" element={<ManageUser />} />
          <Route path="create-user" element={<CreateUser />} />
          <Route path="edit-user/:id" element={<EditUser />} />
          <Route path="edit-contact/:id" element={<EditContact />} />
          <Route path="edit-organization/:id" element={<EditOrganization />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
};

export default App;
