import React from 'react'
import AdminSideBar from '../../Navbar/Side/AdminSideBar'
import TopNavBar from '../../Navbar/Top/TopNavBar'
import { Outlet } from "react-router-dom";

const AdminLayout = () => {
  return (
    <div className="flex flex-col sm:flex-row min-h-screen ">
      <AdminSideBar/>
      <div className='flex-1'>
        <TopNavBar/>
        <main className="p-6 sm:ml-[300px] ml-0 ">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default AdminLayout
