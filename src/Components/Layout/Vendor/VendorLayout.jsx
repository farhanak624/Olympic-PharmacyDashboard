import React from "react";
import VendorSidebar from "../../Navbar/Side/VendorSidebar";
import TopNavBar from "../../Navbar/Top/TopNavBar";
import { Outlet } from "react-router-dom";
import SpinningLoader from "../../Loader/SpinningLoader";

const VendorLayout = () => {
  return (
    <div className="flex flex-col sm:flex-row min-h-screen ">
      <VendorSidebar />
      <div className="flex-1">
        <TopNavBar />
        <main className="p-6 sm:ml-[300px] ml-0 ">
          <Outlet />
        </main>
      </div>
      <SpinningLoader />
    </div>
  );
};

export default VendorLayout;
