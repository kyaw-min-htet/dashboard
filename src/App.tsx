import React from "react";
import DashbordLayout from "./layouts/DashbordLayout";
import { Routes, Route } from "react-router-dom";
import Contacts from "./pages/Contacts";
import Dashboard from "./pages/Dashboard";
import Organizations from "./pages/Organizations";
import Report from "./pages/Reports";
import CreateOrganization from "./pages/CreateOrganization";
import CreateContacts from "./pages/CreateContacts";
import Profile from "./pages/Profile";
import ManageUser from "./pages/ManageUser";


const App = () => {
  return (
    <Routes>
      {/* <Route path="/" element={<SideBar />} /> */}
      <Route path="/" element={<DashbordLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="/contacts" element={<Contacts />} />
        <Route path="/create-contact" element={<CreateContacts />} />
        <Route path="/organizations" element={<Organizations />} />
        <Route path="/create-organization" element={<CreateOrganization />} />
        <Route path="/report" element={<Report />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/manage-user" element={<ManageUser />} />
      </Route>
    </Routes>
  );
};

export default App;
