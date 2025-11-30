import React from "react";
import DashbordLayout from "./layouts/DashbordLayout";
import { Routes, Route } from "react-router-dom";
import Contacts from "./pages/Contacts";
import Dashboard from "./pages/Dashboard";
import Organizations from "./pages/Organizations";
import Report from "./pages/Reports";

const App = () => {
  return (
    <Routes>
      {/* <Route path="/" element={<SideBar />} /> */}
      <Route path="/" element={<DashbordLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="/contacts" element={<Contacts />} />
        <Route path="/organizations" element={<Organizations />} />
        <Route path="/report" element={<Report />} />
      </Route>
    </Routes>
  );
};

export default App;
