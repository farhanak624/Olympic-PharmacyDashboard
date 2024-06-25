import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { openSidebar } from "../../../Redux/Features/NavbarSlice";
import { useNavigate } from "react-router-dom";

function VendorSidebar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [dropdownproduct, setDropdownproduct] = useState(false);
  const { toggleSidebar } = useSelector((state) => {
    return state.navbar;
  });
  useEffect(() => {
    const height = document.getElementById("pharmaProduct");

    if (dropdownproduct) {
      const height = document.getElementById("pharmaProduct");
      if (height) {
        height.style.height = "50px";
      }
    } else {
      height.style.height = "0px";
    }
  }, [dropdownproduct]);
  console.log(window.location.pathname, "path name");

  return (
    <aside
      id="logo-sidebar"
      className={`fixed top-0 left-0 z-30 w-64 h-screen pt-2 transition-transform  
      ${toggleSidebar ? "translate-x-0" : "-translate-x-full"} 
        border-r sm:translate-x-0 bg-black  border-gray-700`}
      aria-label="Sidebar"
    >
      <div
        class="h-full relative  pb-4 overflow-y-auto  bg-black"
        style={{ scrollbarWidth: "none" }}
      >
        <button
          onClick={() => dispatch(openSidebar())}
          className="absolute sm:hidden block right-6 text-white text-2xl mt-3"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24">
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        <div className=" flex items-center mb-10 mt-10 ">
          <div>
            <img src="/olympicLogo.png" className="w-20" alt="" />
          </div>
          <div>
            <h1 className="text-yellow-300 text-2xl">
              Olympic
              <br />
              Combat
            </h1>
          </div>
        </div>
        <ul class="space-y-9 font-medium">
          <li>
            <a
              onClick={() => {
                navigate("vendor/pharma");
                setDropdownproduct(false);
                dispatch(openSidebar());
              }}
              href="#"
              className={`flex pl-7 items-center p-3  group w-full ${
                window.location.pathname === "/vendor/dashboard"
                  ? "text-yellow-300 border-l-4 border-l-yellow-300 "
                  : "text-white"
              } `}
              style={{
                background: `${
                  window.location.pathname === "/vendor/dashboard"
                    ? " rgba(48, 43, 14, 1)"
                    : ""
                }`,
              }}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill={`${
                  window.location.pathname === "/vendor/dashboard"
                    ? "#FFDD11"
                    : "white"
                }`}
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clip-path="url(#clip0_183_3365)">
                  <path d="M8.25 3H6C4.34315 3 3 4.34315 3 6V8.25C3 9.90685 4.34315 11.25 6 11.25H8.25C9.90685 11.25 11.25 9.90685 11.25 8.25V6C11.25 4.34315 9.90685 3 8.25 3Z" />
                  <path d="M18 3H15.75C14.0931 3 12.75 4.34315 12.75 6V8.25C12.75 9.90686 14.0931 11.25 15.75 11.25H18C19.6568 11.25 21 9.90686 21 8.25V6C21 4.34315 19.6568 3 18 3Z" />
                  <path d="M8.25 12.75H6C4.34315 12.75 3 14.0931 3 15.75V18C3 19.6569 4.34315 21 6 21H8.25C9.90685 21 11.25 19.6569 11.25 18V15.75C11.25 14.0931 9.90685 12.75 8.25 12.75Z" />
                  <path d="M18 12.75H15.75C14.0931 12.75 12.75 14.0931 12.75 15.75V18C12.75 19.6569 14.0931 21 15.75 21H18C19.6568 21 21 19.6569 21 18V15.75C21 14.0931 19.6568 12.75 18 12.75Z" />
                </g>
                <defs>
                  <clipPath id="clip0_183_3365">
                    <rect
                      width="18"
                      height="18"
                      fill="white"
                      transform="translate(3 3)"
                    />
                  </clipPath>
                </defs>
              </svg>

              <span className="ms-3 ">Dashboard</span>
            </a>
          </li>

          <li>
            <a
              onClick={() => {
                navigate("vendor/pharma/products");
                setDropdownproduct(!dropdownproduct);
                dispatch(openSidebar());
              }}
              href="#"
              className={`flex pl-7 items-center p-3  group w-full ${
                window.location.pathname === "/pharma/vendor/pharma/products" ||
                window.location.pathname ===
                  "/pharma/vendor/pharma/addProduct" ||
                window.location.pathname === "/pharma/vendor/pharma/EditProduct"
                  ? "text-yellow-300 border-l-4 border-l-yellow-300 "
                  : "text-white"
              } `}
              style={{
                background: `${
                  window.location.pathname ===
                    "/pharma/vendor/pharma/products" ||
                  window.location.pathname ===
                    "/pharma/vendor/pharma/addProduct" ||
                  window.location.pathname ===
                    "/pharma/vendor/pharma/EditProduct"
                    ? " rgba(48, 43, 14, 1)"
                    : ""
                }`,
              }}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M14.5 11C14.5 11.69 13.957 12 13.289 12H11V10H13.289C13.957 10 14.5 10.31 14.5 11ZM13.27 14H11V16H9V8H13.27C14.777 8 16 9.473 16 11C16 12.488 14.777 13 13.27 14ZM12 2C6.477 2 2 6.477 2 12C2 17.523 6.477 22 12 22C17.523 22 22 17.523 22 12C22 6.477 17.523 2 12 2Z"
                  fill={`${
                    window.location.pathname ===
                      "/pharma/vendor/pharma/products" ||
                    window.location.pathname ===
                      "/pharma/vendor/pharma/addProduct" ||
                    window.location.pathname ===
                      "/pharma/vendor/pharma/EditProduct"
                      ? "#FFDD11"
                      : "white"
                  }`}
                />
              </svg>

              <span className="ms-3 ">Products</span>
            </a>

            <div id="pharmaProduct" className="flex items-center">
              <a
                className={`ml-14 ${
                  window.location.pathname ===
                  "/pharma/vendor/pharma/addProduct"
                    ? "text-yellow-300  "
                    : "text-white"
                } `}
                onClick={() => {
                  navigate("vendor/pharma/addProduct");
                }}
              >
                Add product
              </a>
            </div>
          </li>

          <li>
            <a
              onClick={() => {
                navigate("vendor/pharma/reviews");
                setDropdownproduct(false);
                dispatch(openSidebar());
              }}
              href="#"
              className={`flex pl-7 items-center p-3  group w-full ${
                window.location.pathname === "/pharma/vendor/pharma/reviews"
                  ? "text-yellow-300 border-l-4 border-l-yellow-300 "
                  : "text-white"
              } `}
              style={{
                background: `${
                  window.location.pathname === "/pharma/vendor/pharma/reviews"
                    ? " rgba(48, 43, 14, 1)"
                    : ""
                }`,
              }}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 2C6.4858 2 2 6.4858 2 12C2 17.5142 6.4858 22 12 22C17.5142 22 22 17.5142 22 12C22 6.4858 17.5142 2 12 2ZM17.8415 10.8156L15.4272 13.4417L15.8368 16.9854C15.8453 17.0595 15.834 17.1345 15.8041 17.2028C15.7741 17.2711 15.7265 17.3302 15.6661 17.3741C15.6058 17.4179 15.5348 17.4449 15.4606 17.4523C15.3864 17.4597 15.3115 17.4472 15.2437 17.4162L12 15.9318L8.7563 17.4162C8.68846 17.4473 8.61359 17.4597 8.53934 17.4523C8.46509 17.4449 8.39415 17.4179 8.33379 17.3741C8.27343 17.3302 8.22582 17.2711 8.19584 17.2027C8.16586 17.1344 8.1546 17.0594 8.1632 16.9852L8.57276 13.4416L6.15853 10.8156C6.10803 10.7607 6.07305 10.6933 6.05716 10.6204C6.04127 10.5475 6.04505 10.4717 6.06812 10.4007C6.09118 10.3297 6.1327 10.2662 6.18842 10.2165C6.24413 10.1669 6.31205 10.133 6.38519 10.1182L9.88185 9.41272L11.6333 6.30516C11.6699 6.24015 11.7232 6.18605 11.7876 6.1484C11.852 6.11075 11.9253 6.09091 11.9999 6.09091C12.0745 6.09091 12.1478 6.11075 12.2122 6.1484C12.2766 6.18605 12.3299 6.24015 12.3665 6.30516L14.1179 9.41272L17.6146 10.1182C17.6877 10.133 17.7557 10.1669 17.8114 10.2165C17.8671 10.2662 17.9086 10.3297 17.9317 10.4007C17.9547 10.4717 17.9585 10.5475 17.9426 10.6204C17.9267 10.6933 17.8918 10.7607 17.8413 10.8156H17.8415Z"
                  fill={`${
                    window.location.pathname === "/pharma/vendor/pharma/reviews"
                      ? "#FFDD11"
                      : "white"
                  }`}
                />
              </svg>

              <span className="ms-3 ">Reviews</span>
            </a>
          </li>

          <li>
            <a
              onClick={() => {
                navigate("vendor/pharma/orderHistory");
                setDropdownproduct(false);
                dispatch(openSidebar());
              }}
              href="#"
              className={`flex pl-7 items-center p-3  group w-full ${
                window.location.pathname ===
                "/pharma/vendor/pharma/orderHistory"
                  ? "text-yellow-300 border-l-4 border-l-yellow-300 "
                  : "text-white"
              } `}
              style={{
                background: `${
                  window.location.pathname ===
                  "/pharma/vendor/pharma/orderHistory"
                    ? " rgba(48, 43, 14, 1)"
                    : ""
                }`,
              }}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M8.19464 4.32558H7.48674C7.10162 4.32558 6.78906 4.63814 6.78906 5.02326V7.34884C6.78906 7.73395 7.10162 8.04651 7.48674 8.04651H15.8588C16.2439 8.04651 16.5565 7.73395 16.5565 7.34884V5.02326C16.5565 4.63814 16.2439 4.32558 15.8588 4.32558H15.1509C15.0328 3.0214 13.937 2 12.603 2H10.7426C9.4086 2 8.31278 3.0214 8.19464 4.32558Z"
                  fill={
                    window.location.pathname ===
                    "/pharma/vendor/pharma/orderHistory"
                      ? "#FFDD11"
                      : "white"
                  }
                />
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M5.86047 5.25391H5.62791C4.72837 5.25391 4 5.98321 4 6.88181V20.3702C4 21.2697 4.7293 21.9981 5.62791 21.9981C8.16465 21.9981 15.1842 21.9981 17.7209 21.9981C18.6195 21.9981 19.3488 21.2697 19.3488 20.3702V6.88181C19.3488 5.98321 18.6205 5.25391 17.7209 5.25391H17.4884V7.34693C17.4884 8.24553 16.7591 8.97484 15.8605 8.97484H7.48837C6.58977 8.97484 5.86047 8.24553 5.86047 7.34693V5.25391ZM7.95349 18.2772H15.3953C15.7805 18.2772 16.093 17.9646 16.093 17.5795C16.093 17.1944 15.7805 16.8818 15.3953 16.8818H7.95349C7.56837 16.8818 7.25581 17.1944 7.25581 17.5795C7.25581 17.9646 7.56837 18.2772 7.95349 18.2772ZM7.95349 15.0213H15.3953C15.7805 15.0213 16.093 14.7088 16.093 14.3237C16.093 13.9386 15.7805 13.626 15.3953 13.626H7.95349C7.56837 13.626 7.25581 13.9386 7.25581 14.3237C7.25581 14.7088 7.56837 15.0213 7.95349 15.0213ZM9.34884 11.7655H14C14.3851 11.7655 14.6977 11.453 14.6977 11.0679C14.6977 10.6827 14.3851 10.3702 14 10.3702H9.34884C8.96372 10.3702 8.65116 10.6827 8.65116 11.0679C8.65116 11.453 8.96372 11.7655 9.34884 11.7655Z"
                  fill={
                    window.location.pathname ===
                    "/pharma/vendor/pharma/orderHistory"
                      ? "#FFDD11"
                      : "white"
                  }
                />
              </svg>

              <span className="ms-3 ">Orders</span>
            </a>
          </li>
          <li>
            <a
              onClick={() => {
                navigate("vendor/pharma/RevenueHistory");
                setDropdownproduct(false);
                dispatch(openSidebar());
              }}
              href="#"
              className={`flex pl-7 items-center p-3  group w-full ${
                window.location.pathname ===
                "/pharma/vendor/pharma/RevenueHistory"
                  ? "text-yellow-300 border-l-4 border-l-yellow-300 "
                  : "text-white"
              } `}
              style={{
                background: `${
                  window.location.pathname ===
                  "/pharma/vendor/pharma/RevenueHistory"
                    ? " rgba(48, 43, 14, 1)"
                    : ""
                }`,
              }}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M19.1982 4.78691C17.4059 2.99453 15.0234 2 12.4889 2C9.9543 2 7.57188 2.99453 5.77949 4.78691C3.98711 6.5793 3 8.96914 3 11.5037C3 14.0383 3.98711 16.4244 5.77949 18.2168C7.57188 20.0092 9.9543 21 12.4889 21C15.0234 21 17.4059 20.0092 19.1982 18.2168C20.9906 16.4244 21.9777 14.0383 21.9777 11.5C21.9777 8.96543 20.9906 6.5793 19.1982 4.78691ZM18.148 17.1666C16.6377 18.677 14.6264 19.5119 12.4852 19.5119C8.07285 19.5082 4.48438 15.916 4.48438 11.5037C4.48438 9.36621 5.31562 7.35488 6.82969 5.84453C8.34375 4.33418 10.3514 3.49922 12.4926 3.49922C16.9086 3.49922 20.4971 7.09141 20.4971 11.5037C20.4934 13.6412 19.6621 15.6525 18.148 17.1666Z"
                  fill={
                    window.location.pathname ===
                    "/pharma/vendor/pharma/RevenueHistory"
                      ? "#FFDD11"
                      : "white"
                  }
                />
                <path
                  d="M12.8709 10.7559C11.6389 10.2771 11.2418 9.90976 11.2418 9.23809C11.2418 8.72227 11.6241 8.11738 12.7039 8.11738C13.101 8.11738 13.487 8.18418 13.8543 8.31777C14.0325 8.38086 14.2254 8.37344 14.3961 8.2918C14.5668 8.21016 14.693 8.06543 14.7524 7.8873C14.8748 7.52734 14.6819 7.13398 14.3256 7.00781C13.936 6.87051 13.4981 6.79258 13.0194 6.77031V6.11719C13.0194 5.70898 12.6854 5.375 12.2772 5.375C11.869 5.375 11.535 5.70898 11.535 6.11719V6.94473C11.1565 7.06719 10.8225 7.25273 10.5368 7.49766C9.98383 7.97266 9.67954 8.63691 9.67954 9.37168C9.67954 10.0211 9.90961 10.5852 10.3661 11.0453C10.7706 11.4535 11.3532 11.7875 12.151 12.0695C13.2829 12.5037 13.6836 12.9156 13.6836 13.6355C13.6836 14.4408 13.0528 14.9418 12.036 14.9418C11.42 14.9418 10.893 14.7748 10.5627 14.6338C10.3809 14.5559 10.1731 14.5596 9.99125 14.6449C9.81313 14.7266 9.67954 14.8824 9.62387 15.0717L9.62016 15.0791C9.51625 15.4205 9.68696 15.7842 10.0172 15.9215C10.47 16.1107 11.0266 16.2369 11.5721 16.2777V16.916C11.5721 17.3242 11.9061 17.6582 12.3143 17.6582C12.7225 17.6582 13.0565 17.3242 13.0565 16.916V16.1738C13.5983 16.0439 14.0659 15.8102 14.4258 15.4836C14.9639 14.9975 15.2608 14.3072 15.2608 13.5465C15.2608 12.2365 14.5446 11.4016 12.8709 10.7559Z"
                  fill={
                    window.location.pathname ===
                    "/pharma/vendor/pharma/RevenueHistory"
                      ? "#FFDD11"
                      : "white"
                  }
                />
              </svg>

              <span className="ms-3 ">Revenue History</span>
            </a>
          </li>
          <li>
            <a
              onClick={() => {
                navigate("vendor/pharma/coupons");
                setDropdownproduct(false);
                dispatch(openSidebar());
              }}
              href="#"
              className={`flex pl-7 items-center p-3  group w-full ${
                window.location.pathname === "/pharma/vendor/pharma/coupons"
                  ? "text-yellow-300 border-l-4 border-l-yellow-300 "
                  : "text-white"
              } `}
              style={{
                background: `${
                  window.location.pathname === "/pharma/vendor/pharma/coupons"
                    ? " rgba(48, 43, 14, 1)"
                    : ""
                }`,
              }}
            >
              <svg
                width="24"
                height="25"
                viewBox="0 0 24 25"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7.08047 8.92969C6.92134 8.92969 6.76873 8.9929 6.6562 9.10542C6.54368 9.21795 6.48047 9.37056 6.48047 9.52969V11.0681C6.48047 11.2272 6.54368 11.3798 6.6562 11.4924C6.76873 11.6049 6.92134 11.6681 7.08047 11.6681C7.2396 11.6681 7.39221 11.6049 7.50473 11.4924C7.61725 11.3798 7.68047 11.2272 7.68047 11.0681V9.52969C7.68047 9.37056 7.61725 9.21795 7.50473 9.10542C7.39221 8.9929 7.2396 8.92969 7.08047 8.92969ZM7.08047 13.3329C6.92134 13.3329 6.76873 13.3961 6.6562 13.5086C6.54368 13.6211 6.48047 13.7738 6.48047 13.9329V15.4705C6.48047 15.6296 6.54368 15.7822 6.6562 15.8948C6.76873 16.0073 6.92134 16.0705 7.08047 16.0705C7.2396 16.0705 7.39221 16.0073 7.50473 15.8948C7.61725 15.7822 7.68047 15.6296 7.68047 15.4705V13.9329C7.68047 13.7738 7.61725 13.6211 7.50473 13.5086C7.39221 13.3961 7.2396 13.3329 7.08047 13.3329Z"
                  fill={`${
                    window.location.pathname === "/pharma/vendor/pharma/coupons"
                      ? "#FFDD11"
                      : "white"
                  }`}
                />
                <path
                  d="M22.7024 10.5176C23.035 10.3392 23.3127 10.0737 23.5059 9.74961C23.6991 9.42549 23.8005 9.05491 23.7992 8.67757V6.61997C23.7986 6.06491 23.5778 5.53276 23.1853 5.14027C22.7928 4.74778 22.2607 4.527 21.7056 4.52637H2.29284C1.73777 4.527 1.20563 4.74778 0.81314 5.14027C0.420651 5.53276 0.199872 6.06491 0.199237 6.61997V8.67597C0.197959 9.05331 0.299355 9.42389 0.492563 9.74801C0.68577 10.0721 0.963511 10.3376 1.29604 10.516C1.65493 10.7081 1.95494 10.9941 2.16411 11.3433C2.37327 11.6926 2.48374 12.0921 2.48374 12.4992C2.48374 12.9063 2.37327 13.3057 2.16411 13.655C1.95494 14.0042 1.65493 14.2902 1.29604 14.4824C0.963271 14.6609 0.685373 14.9266 0.49215 15.251C0.298927 15.5754 0.197669 15.9464 0.199237 16.324V18.38C0.199872 18.935 0.420651 19.4672 0.81314 19.8597C1.20563 20.2522 1.73777 20.4729 2.29284 20.4736H21.7056C22.2607 20.4729 22.7928 20.2522 23.1853 19.8597C23.5778 19.4672 23.7986 18.935 23.7992 18.38V16.324C23.8005 15.9466 23.6991 15.576 23.5059 15.2519C23.3127 14.9278 23.035 14.6623 22.7024 14.484C21.1312 13.6976 21.1432 11.304 22.7024 10.5176ZM20.7264 14.1272C21.0473 14.7265 21.5383 15.2175 22.1376 15.5384C22.4248 15.6936 22.6024 15.9944 22.5992 16.3208V18.3768C22.599 18.6137 22.5048 18.8409 22.3373 19.0084C22.1697 19.1759 21.9426 19.2702 21.7056 19.2704H7.67924C7.64644 18.7504 7.88564 17.7552 7.07924 17.7352C6.27204 17.7544 6.51204 18.7544 6.47924 19.2736H2.29284C2.0559 19.2734 1.82874 19.1791 1.6612 19.0116C1.49366 18.8441 1.39945 18.6169 1.39924 18.38V16.324C1.39766 16.1639 1.43981 16.0064 1.52116 15.8685C1.60251 15.7307 1.71995 15.6176 1.86084 15.5416C2.41085 15.2469 2.87061 14.8085 3.19114 14.2732C3.51167 13.7378 3.68095 13.1255 3.68095 12.5016C3.68095 11.8776 3.51167 11.2653 3.19114 10.73C2.87061 10.1946 2.41085 9.75624 1.86084 9.46157C1.71995 9.38554 1.60251 9.27248 1.52116 9.1346C1.43981 8.99672 1.39766 8.83925 1.39924 8.67917V6.61997C1.40004 6.12637 1.79924 5.72717 2.29284 5.72637H6.47924C6.51204 6.24717 6.27124 7.24477 7.07924 7.26477C7.88644 7.24557 7.64644 6.24557 7.67924 5.72637H21.7056C22.1992 5.72717 22.5984 6.12637 22.5992 6.61997V8.67597C22.6024 9.00237 22.4248 9.30317 22.1376 9.45837C21.7383 9.67218 21.3851 9.96257 21.098 10.3129C20.811 10.6633 20.5958 11.0668 20.4648 11.5004C20.3337 11.934 20.2894 12.3891 20.3343 12.8398C20.3792 13.2905 20.5124 13.728 20.7264 14.1272Z"
                  fill={`${
                    window.location.pathname === "/pharma/vendor/pharma/coupons"
                      ? "#FFDD11"
                      : "white"
                  }`}
                />
              </svg>

              <span className="ms-2 ">Coupons</span>
            </a>
          </li>
          <li>
            <a
              onClick={() => {
                navigate("vendor/pharma/special-deals");
                setDropdownproduct(false);
                dispatch(openSidebar());
              }}
              href="#"
              className={`flex pl-7 items-center p-3  group w-full ${
                window.location.pathname ===
                "/pharma/vendor/pharma/special-deals"
                  ? "text-yellow-300 border-l-4 border-l-yellow-300 "
                  : "text-white"
              } `}
              style={{
                background: `${
                  window.location.pathname ===
                  "/pharma/vendor/pharma/special-deals"
                    ? " rgba(48, 43, 14, 1)"
                    : ""
                }`,
              }}
            >
              <svg
                width="26px"
                height="26px"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                <g
                  id="SVGRepo_tracerCarrier"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></g>
                <g id="SVGRepo_iconCarrier">
                  {" "}
                  <path
                    d="M8 16L16 8M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12ZM11 9C11 10.1046 10.1046 11 9 11C7.89543 11 7 10.1046 7 9C7 7.89543 7.89543 7 9 7C10.1046 7 11 7.89543 11 9ZM17 15C17 16.1046 16.1046 17 15 17C13.8954 17 13 16.1046 13 15C13 13.8954 13.8954 13 15 13C16.1046 13 17 13.8954 17 15Z"
                    stroke={`${
                      window.location.pathname ===
                      "/pharma/vendor/pharma/special-deals"
                        ? "#FFDD11"
                        : "#ffffff"
                    }`}
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></path>{" "}
                </g>
              </svg>

              <span className="ms-2 ">Special Deals</span>
            </a>
          </li>
          <li>
            <a
              onClick={() => {
                navigate("vendor/pharma/wallet");
                setDropdownproduct(false);
                dispatch(openSidebar());
              }}
              href="#"
              className={`flex pl-7 items-center p-3  group w-full ${
                window.location.pathname === "/pharma/vendor/pharma/wallet"
                  ? "text-yellow-300 border-l-4 border-l-yellow-300 "
                  : "text-white"
              } `}
              style={{
                background: `${
                  window.location.pathname === "/pharma/vendor/pharma/wallet"
                    ? "rgba(48, 43, 14, 1)"
                    : ""
                }`,
              }}
            >
              <svg
                width="26"
                height="26"
                viewBox="0 0 26 26"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M19.3545 12.9571H23.0566V12.3245C22.8449 11.6325 22.5078 11.1634 22.0712 10.8781C21.6346 10.5932 21.0686 10.4714 20.4042 10.4754L5.22071 10.4785C4.84681 10.4785 4.54425 10.2109 4.54425 9.88143C4.54425 9.55142 4.84681 9.28437 5.22071 9.28437L20.3864 9.2859C21.3407 9.27777 22.1828 9.46968 22.8742 9.92205C22.9364 9.96266 22.9973 10.0053 23.0566 10.05V9.69104C23.0566 9.13358 22.796 8.62385 22.3767 8.25373C21.9608 7.88362 21.3844 7.65464 20.7494 7.65464H20.261L20.1983 7.65211L19.9596 8.44209H18.3191L19.2923 5.2197C18.4744 5.02677 17.9866 4.28045 18.2058 3.55849L12.7923 2.27857C12.5732 3.00002 11.7282 3.43157 10.9114 3.23813L9.32204 8.44209H7.63031L10.2044 0L21.6916 2.71672L20.559 6.46002H20.7494C21.7531 6.46002 22.6683 6.82506 23.3321 7.41044C23.9971 7.99481 24.4095 8.80409 24.4095 9.69104V12.9906C24.8001 13.0591 25.1492 13.2297 25.4202 13.4689C25.7774 13.7841 26 14.2208 26 14.7016V18.6287C26 19.1298 25.7676 19.5857 25.3949 19.9142C25.1285 20.1492 24.7892 20.3213 24.4095 20.4V22.769C24.4095 23.6554 23.9965 24.4642 23.3327 25.0501L23.2901 25.0846C22.6286 25.6497 21.7307 26 20.7494 26H3.66013C2.65522 26 1.73889 25.636 1.07509 25.0506C0.412434 24.4657 0 23.658 0 22.769V9.69104C0 8.80155 0.411858 7.99379 1.07451 7.40892C1.73717 6.82404 2.65292 6.46002 3.66013 6.46002H5.79535L5.80456 6.46053L7.50434 0.888481L9.12588 1.2718L6.89805 8.44209H5.2L5.44044 7.65464H3.66013C3.02681 7.65464 2.44987 7.88413 2.03111 8.25323C1.61292 8.62233 1.35292 9.13206 1.35292 9.69104V22.769C1.35292 23.328 1.6135 23.8367 2.03226 24.2058C2.45102 24.5759 3.02854 24.8059 3.66013 24.8059H20.7494C21.3666 24.8059 21.9309 24.5876 22.345 24.2347L22.3761 24.2053C22.7954 23.8357 23.0566 23.3259 23.0566 22.769V20.4483H19.3545C18.2109 20.4483 17.1709 20.035 16.4197 19.3719L16.3489 19.3034C15.638 18.6434 15.1996 17.7539 15.1996 16.7811V16.6237C15.1996 15.619 15.6673 14.7031 16.4197 14.0375L16.4272 14.0309C17.1807 13.3683 18.2173 12.9571 19.3545 12.9571ZM13.849 8.23241C14.8378 8.46595 15.856 7.9481 16.1206 7.07485C16.3858 6.20211 15.7979 5.30347 14.8091 5.06993C13.8197 4.83638 12.8015 5.35424 12.5369 6.22749C12.2723 7.10023 12.8602 7.99836 13.849 8.23241ZM20.8403 15.6916L20.8437 15.6941C21.4724 16.2506 21.4707 17.1558 20.8426 17.7117L20.8397 17.7148C20.2092 18.2697 19.1836 18.2682 18.5532 17.7138L18.5503 17.7112C17.9216 17.1548 17.9233 16.2496 18.5515 15.6931L18.5543 15.6906C19.1848 15.1357 20.2104 15.1367 20.8403 15.6916Z"
                  fill="white"
                  stroke={`${
                    window.location.pathname === "/pharma/vendor/pharma/wallet"
                      ? "#FFDD11"
                      : "#ffffff"
                  }`}
                  strokeWidth="1"
                  strokeMiterlimit="10"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <defs>
                  <clipPath id="clip0_2118_17024">
                    <rect width="26" height="26" fill="white" />
                  </clipPath>
                </defs>
              </svg>

              <span className="ms-2 ">Wallet</span>
            </a>
          </li>
          <li>
            <a
              onClick={() => {
                navigate("vendor/pharma/slider");
                setDropdownproduct(false);
                dispatch(openSidebar());
              }}
              href="#"
              className={`flex pl-7 items-center p-3  group w-full ${
                window.location.pathname === "/pharma/vendor/pharma/slider"
                  ? "text-yellow-300 border-l-4 border-l-yellow-300 "
                  : "text-white"
              } `}
              style={{
                background: `${
                  window.location.pathname === "/pharma/vendor/pharma/slider"
                    ? " rgba(48, 43, 14, 1)"
                    : ""
                }`,
              }}
            >
              <svg
                width="24"
                height="25"
                viewBox="0 0 24 25"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clip-path="url(#clip0_2239_24425)">
                  <path
                    d="M6.25095 13.499C6.12731 13.4992 6.00555 13.4688 5.89651 13.4105C5.78747 13.3522 5.69452 13.2679 5.62595 13.165L4.12595 10.915C4.04382 10.7919 4 10.6471 4 10.499C4 10.351 4.04382 10.2062 4.12595 10.083L5.62595 7.83305C5.68005 7.74992 5.75011 7.67835 5.83207 7.62248C5.91402 7.56662 6.00624 7.52756 6.10339 7.50757C6.20054 7.48759 6.30069 7.48707 6.39805 7.50605C6.4954 7.52503 6.58802 7.56313 6.67055 7.61815C6.75307 7.67317 6.82387 7.74401 6.87883 7.82657C6.93379 7.90914 6.97184 8.00178 6.99075 8.09915C7.00967 8.19651 7.00909 8.29666 6.98904 8.3938C6.96899 8.49094 6.92987 8.58313 6.87395 8.66505L5.65095 10.499L6.87395 12.333C6.94919 12.4459 6.99241 12.5771 6.99901 12.7126C7.0056 12.8481 6.97532 12.9828 6.91139 13.1025C6.84746 13.2221 6.75227 13.3222 6.63597 13.392C6.51967 13.4619 6.3866 13.4989 6.25095 13.499ZM17.7489 13.499C17.6133 13.4989 17.4802 13.4619 17.3639 13.392C17.2476 13.3222 17.1524 13.2221 17.0885 13.1025C17.0246 12.9828 16.9943 12.8481 17.0009 12.7126C17.0075 12.5771 17.0507 12.4459 17.1259 12.333L18.3489 10.499L17.1259 8.66505C17.0182 8.49954 16.9801 8.29822 17.0199 8.10478C17.0597 7.91135 17.1742 7.74142 17.3385 7.63187C17.5028 7.52233 17.7037 7.48201 17.8976 7.51968C18.0914 7.55734 18.2626 7.66995 18.3739 7.83305L19.8739 10.083C19.9561 10.2062 19.9999 10.351 19.9999 10.499C19.9999 10.6471 19.9561 10.7919 19.8739 10.915L18.3739 13.165C18.3054 13.2679 18.2124 13.3522 18.1034 13.4105C17.9943 13.4688 17.8726 13.4992 17.7489 13.499ZM6.99995 20.7491C6.31095 20.7491 5.74995 20.188 5.74995 19.4991C5.74995 18.8101 6.31095 18.249 6.99995 18.249C7.68895 18.249 8.24995 18.8101 8.24995 19.4991C8.24995 20.188 7.68895 20.7491 6.99995 20.7491ZM6.99995 19.249C6.93364 19.249 6.87005 19.2754 6.82317 19.3223C6.77628 19.3692 6.74995 19.4327 6.74995 19.4991C6.74995 19.774 7.24995 19.774 7.24995 19.4991C7.24995 19.4327 7.22361 19.3692 7.17672 19.3223C7.12984 19.2754 7.06625 19.249 6.99995 19.249ZM11.9999 20.7491C11.3109 20.7491 10.7499 20.188 10.7499 19.4991C10.7499 18.8101 11.3109 18.249 11.9999 18.249C12.6889 18.249 13.2499 18.8101 13.2499 19.4991C13.2499 20.188 12.6889 20.7491 11.9999 20.7491ZM11.9999 19.249C11.9336 19.249 11.8701 19.2754 11.8232 19.3223C11.7763 19.3692 11.7499 19.4327 11.7499 19.4991C11.7499 19.774 12.2499 19.774 12.2499 19.4991C12.2499 19.4327 12.2236 19.3692 12.1767 19.3223C12.1298 19.2754 12.0662 19.249 11.9999 19.249ZM16.9999 20.7491C16.3109 20.7491 15.7499 20.188 15.7499 19.4991C15.7499 18.8101 16.3109 18.249 16.9999 18.249C17.6889 18.249 18.2499 18.8101 18.2499 19.4991C18.2499 20.188 17.6889 20.7491 16.9999 20.7491ZM16.9999 19.249C16.9336 19.249 16.8701 19.2754 16.8232 19.3223C16.7763 19.3692 16.7499 19.4327 16.7499 19.4991C16.7499 19.774 17.2499 19.774 17.2499 19.4991C17.2499 19.4327 17.2236 19.3692 17.1767 19.3223C17.1298 19.2754 17.0662 19.249 16.9999 19.249Z"
                    fill={`${
                      window.location.pathname ===
                      "/pharma/vendor/pharma/slider"
                        ? "#FFDD11"
                        : "#ffffff"
                    }`}
                  />
                  <path
                    d="M21.25 24.5H2.75C2.02082 24.4995 1.32165 24.2096 0.806041 23.694C0.290431 23.1783 0.000529737 22.4792 0 21.75L0 3.25C0.000529737 2.52082 0.290431 1.82165 0.806041 1.30604C1.32165 0.790431 2.02082 0.50053 2.75 0.5L21.25 0.5C21.9792 0.50053 22.6783 0.790431 23.194 1.30604C23.7096 1.82165 23.9995 2.52082 24 3.25V21.75C23.9995 22.4792 23.7096 23.1783 23.194 23.694C22.6783 24.2096 21.9792 24.4995 21.25 24.5ZM2.75 2C2.061 2 1.5 2.561 1.5 3.25V21.75C1.5 22.439 2.061 23 2.75 23H21.25C21.939 23 22.5 22.439 22.5 21.75V3.25C22.5 2.561 21.939 2 21.25 2H2.75Z"
                    fill={`${
                      window.location.pathname ===
                      "/pharma/vendor/pharma/slider"
                        ? "#FFDD11"
                        : "#ffffff"
                    }`}
                  />
                </g>
                <defs>
                  <clipPath id="clip0_2239_24425">
                    <rect
                      width="24"
                      height="24"
                      fill="white"
                      transform="translate(0 0.5)"
                    />
                  </clipPath>
                </defs>
              </svg>

              <span className="ms-2 ">Slider</span>
            </a>
          </li>
          <li
            className=" flex hover:cursor-pointer"
            onClick={() => {
              localStorage.removeItem("Userdata");
              localStorage.removeItem("token");
              navigate("/login");
            }}
          >
            <a className="text-red-700 font-bold text-center mb-5 w-full">
              Logout
            </a>
          </li>
        </ul>
      </div>
    </aside>
  );
}

export default VendorSidebar;
