// src/layouts/RootLayout.jsx
import React from "react";
import Sidebar from "../componets/Sidebar";
import Header from "../componets/Header";
import { Outlet } from "react-router-dom";

const RootLayout = () => {
  return (
    <div>
      <div>
        <Header />
        <main style={{ paddingTop: "6rem" }}>
           <Outlet />
        </main>
      </div>
    </div>
  );
};

export default RootLayout;