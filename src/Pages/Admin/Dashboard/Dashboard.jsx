import React, { useEffect, useState } from "react";
import VendorsTable from "./VendorsTable";
import OrderTable from "./OrderTable";
import Card from "../../../Components/Card/Card";
import { getAdminDashboardData } from "../../../Api/AdminApi";
import ChartComponent from "./Chart/ChartComponent";
import { loadSpinner } from "../../../Redux/Features/NavbarSlice";

const AdminDashboard = () => {
  const [selected, setselected] = useState("This Year");
  const [dropdown, setdropdown] = useState(false);
  const [orderData, setOrderData] = useState({});
  const [dashboardData, setDashBoarbData] = useState({});
  const [vendorTable, setVendorTable] = useState(dashboardData?.vendorData);
  useEffect(() => {
    setVendorTable(dashboardData?.vendorData);
  }, [dashboardData]);

  useEffect(() => {
    getData(selected);
  }, [selected]);
  const getData = async (selected) => {
    try {
      dispatch(loadSpinner());
      const res = await getAdminDashboardData(selected);
      console.log(res.data);
      setDashBoarbData(res.data);
      setOrderData(res.data);
      dispatch(loadSpinner());
    } catch (error) {
      console.log(error);
      dispatch(loadSpinner());
    }
  };

  const data = [
    {
      type: "spline",
      name: "High",
      showInLegend: true,
      dataPoints: [
        { y: 155, label: "Jan" },
        { y: 150, label: "Feb" },
        { y: 152, label: "Mar" },
        { y: 148, label: "Apr" },
        { y: 142, label: "May" },
        { y: 150, label: "Jun" },
        { y: 146, label: "Jul" },
        { y: 149, label: "Aug" },
        { y: 153, label: "Sept" },
        { y: 158, label: "Oct" },
        { y: 154, label: "Nov" },
        { y: 150, label: "Dec" },
      ],
    },
    {
      type: "spline",
      name: "Medium",
      showInLegend: true,
      dataPoints: [
        { y: 172, label: "Jan" },
        { y: 173, label: "Feb" },
        { y: 175, label: "Mar" },
        { y: 172, label: "Apr" },
        { y: 162, label: "May" },
        { y: 165, label: "Jun" },
        { y: 172, label: "Jul" },
        { y: 168, label: "Aug" },
        { y: 175, label: "Sept" },
        { y: 170, label: "Oct" },
        { y: 165, label: "Nov" },
        { y: 169, label: "Dec" },
      ],
    },
    {
      type: "spline",
      name: "Low",
      showInLegend: true,
      dataPoints: [
        { y: 152, label: "Jan" },
        { y: 163, label: "Feb" },
        { y: 145, label: "Mar" },
        { y: 122, label: "Apr" },
        { y: 142, label: "May" },
        { y: 135, label: "Jun" },
        { y: 172, label: "Jul" },
        { y: 138, label: "Aug" },
        { y: 175, label: "Sept" },
        { y: 120, label: "Oct" },
        { y: 155, label: "Nov" },
        { y: 169, label: "Dec" },
      ],
    },
  ];
  return (
    <div className="">
      <div
        className="p-1 mb-2 w-36 ml-auto relative flex justify-between min-w-[15%] items-center rounded-lg cursor-pointer bg-containerWhite"
        onClick={() => setdropdown(!dropdown)}
      >
        <p className="text-textColor">{selected}</p>

        <svg
          width="10"
          height="6"
          viewBox="0 0 10 6"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0.375076 1.70711L3.96086 5.29289C4.35139 5.68342 4.98455 5.68342 5.37508 5.29289L8.96086 1.70711C9.59083 1.07714 9.14466 0 8.25376 0H1.08218C0.191278 0 -0.254888 1.07714 0.375076 1.70711Z"
            fill="#4B5563"
          />
        </svg>

        {dropdown && (
          <ul className="absolute hover:cursor-pointer top-9 w-full bg-containerLight text-white rounded-md left-0 z-40">
            <li
              className="p-1 flex justify-center"
              onClick={() => setselected("This Year")}
            >
              This Year
            </li>
            <li
              className="p-1 flex justify-center"
              onClick={() => setselected("This Month")}
            >
              This Month
            </li>
            <li
              className="p-1 flex justify-center"
              onClick={() => setselected("This Week")}
            >
              This Week
            </li>
          </ul>
        )}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        <Card
          text={"Total Revenue"}
          data={{
            totalCount: dashboardData.totalRevenue?.toFixed(2),
            persetage:
              dashboardData.prevTotalRevenue != 0
                ? ((dashboardData.totalRevenue -
                    dashboardData.prevTotalRevenue) *
                    100) /
                  dashboardData.prevTotalRevenue
                : 100,
          }}
          img={"/Money.png"}
          color={"subColor"}
        />
        <Card
          text={"Total Vendors"}
          data={{
            totalCount: dashboardData?.totalVendorData?.totalVendorsCount,
            last7: dashboardData?.totalVendorData?.actives,
            todaycount: dashboardData?.totalVendorData?.nonActive,
          }}
          img={"/user (3).png"}
          color={"subColor"}
        />
        <Card
          text={"Total Customers"}
          data={{
            totalCount: dashboardData.totalUserData?.total,
            last7: dashboardData?.totalUserData?.orderedUsersCount,
            todaycount: dashboardData?.totalUserData?.notOrderedUsersCount,
          }}
          img={"/users.png"}
          color={"subColor"}
        />
      </div>

      <div className="min-w-max mt-3">
        {/* <RevAnalysisChart /> */}
        <div className="w-full  p-4 bg-containerWhite rounded-lg">
          <ChartComponent
            total={orderData?.totalOrdersInYear}
            prev={orderData?.totalOrderPrevYear}
            maxMonth={orderData?.monthWithMostOrders?.month}
            maxValue={orderData?.monthWithMostOrders?.totalOrders}
            minMonth={orderData?.monthWithLeastOrders?.month}
            minValue={orderData?.monthWithLeastOrders?.totalOrders}
            data={orderData?.orders}
          />
        </div>
      </div>

      <div className="w-full bg-containerWhite p-3 mt-5 rounded-lg overflow-x-auto">
        <div className="flex justify-between">
          <h1 className="text-xl font-semibold text-textColor">Vendors</h1>
          <a href="/admin/vendors#" className="text-navblue text-xs underline">
            View All
          </a>
        </div>
        {/* buttondiv */}
        <div className="flex gap-0 mt-5 ">
          <button
            className={`p-2 py-3 rounded-s-md font-bold ${
              vendorTable == dashboardData?.newVendors
                ? "bg-navblue"
                : "bg-[#F2F2F2]"
            }`}
            onClick={() => {
              setVendorTable(dashboardData?.vendorData);
            }}
          >
            Top Vendors
          </button>
          <button
            className={`p-2 py-3 rounded-r-md font-bold ${
              vendorTable == dashboardData?.newVendors
                ? "bg-navblue"
                : "bg-[#F2F2F2]"
            }`}
            onClick={() => {
              setVendorTable(dashboardData?.newVendors);
            }}
          >
            New Vendors
          </button>
        </div>
        {/* table */}
        <VendorsTable data={vendorTable} />
        {/* table */}
        {/* buttondiv */}
      </div>
      {/* ventor tabl ent */}
      {/* orderTable */}

      <OrderTable />
    </div>
  );
};

export default AdminDashboard;
