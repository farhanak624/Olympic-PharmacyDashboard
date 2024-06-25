import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion, useAnimationControls } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";
import wavFile from "../../../assets/short-success-sound-glockenspiel-treasure-video-game-6346.mp3";
import "../../../assets/style/navbar.css";
import { onMessageListener } from "../../../Firebase/FirebaseConfig";
import { ToastContainer, toast } from "react-toastify";
import NotificationBar from "../Top/NotificationMenu";
import "react-toastify/dist/ReactToastify.css";
import { getNotcount } from "../../../Api/AdminApi";
import { BellIcon } from "@heroicons/react/16/solid";

function TopNavBar() {
  const dispatch = useDispatch();
  const [imgof, setimgof] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const navigate = useNavigate();
  const {
    toggleSidebar,
    topnavData,
    notification,
    notificationCount,
    notificationData,
  } = useSelector((state) => {
    return state.navbar;
  });
  let admin = localStorage.getItem("Userdata");
  console.log(admin);
  const userDetailsString = localStorage.getItem("Userdetails");
  let userDetails;
  if (userDetailsString) {
    try {
      userDetails = JSON.parse(userDetailsString);
      console.log(userDetails.email, userDetails.img);
    } catch (e) {
      console.error("Error parsing user details:", e);
    }
  } else {
    console.log("No user details found in localStorage.");
  }

  const [openMenu, setOpenMenu] = useState(false);
  const [notificationnew, setNotificationnew] = useState();
  const [openNotification, setOpenNotification] = useState(false);
  const list = {
    visible: { opacity: 1, scale: 1 },
    hidden: { opacity: 0, scale: 0 },
  };

  const item = {
    visible: { opacity: 1, x: 0 },
    hidden: { opacity: 0, x: -100 },
  };
  const controls = useAnimationControls();
  const DatatopNav = () => {
    const { topnavData } = useSelector((state) => {
      return state.navbar;
    });
    console.log(topnavData);
  };
  useEffect(() => {
    if (!admin) {
      return;
    }
    onMessageListener()
      .then((payload) => {
        console.log(payload, "its coming here");
        // getNotificationData();

        const audio = new Audio(wavFile);
        audio.play().catch((err) => {
          console.log(err);
        });

        setNotificationnew(payload);

        toast((t) => (
          <div
            className={`${
              t.isVisible ? "animate-enter" : "animate-leave"
            } max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
          >
            <div className="flex-1 w-0 p-4">
              <div className="flex items-start">
                <div className="ml-3 flex-1">
                  <p className="text-sm font-medium text-gray-900">
                    {payload?.notification?.title}
                  </p>
                  <p className="mt-1 text-sm text-gray-500">
                    {payload?.notification?.body}
                  </p>
                </div>
              </div>
            </div>
            {/* <div className="flex border-l border-gray-200">
              <button
                onClick={() => toast.dismiss(t.id)}
                className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                Close
              </button>
            </div> */}
          </div>
        ));
      })
      .catch((err) => console.log("failed: ", err));
  }, [notificationnew]);

  const [getNotData, setGetNotData] = useState(0);
  const getNotificationData = () => {
    getNotcount()
      .then(({ data }) => {
        console.log(data?.notificationCount, "notification");
        setGetNotData(data?.notificationCount);
      })
      .catch((err) => {
        if (err?.message === "Network Error") {
          alert("check your connection");
        } else {
          alert("hi");
          alert("something wrong try again");
        }
      });
  };
  useEffect(() => {
    if (admin === "admin") {
      getNotificationData();
      return;
    }
  }, []);
  return (
    <>
      <nav
        className="top-0 z-30 relative w-full  pt-3 pb-1"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
      >
        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        <div className="px-3 py-3 lg:px-5 lg:pl-3">
          {/* <Notification /> */}
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-start rtl:justify-end">
              <button
                data-drawer-target="logo-sidebar"
                data-drawer-toggle="logo-sidebar"
                aria-controls="logo-sidebar"
                type="button"
                className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                onClick={() => {
                  dispatch(openSidebar());
                }}
              >
                <span className="sr-only">Open sidebar</span>
                <svg
                  class="w-6 h-6"
                  aria-hidden="true"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    clip-rule="evenodd"
                    fill-rule="evenodd"
                    d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
                  ></path>
                </svg>
              </button>
            </div>

            <div className="flex  items-center gap-5">
              {/* Notification and Profile */}
              <div class="flex items-center ms-3 ">
                <div className="relative inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0 ">
                  <button
                    type="button"
                    className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                    onClick={async () => {
                      setOpenNotification((e) => !e);
                    }}
                  >
                    <BellIcon className="h-6 w-6" />
                  </button>
                  <div
                    className="badge bg-yellow-400 p-2 absolute  rounded-full flex items-center justify-center mb-10 ml-5
                  
                   "
                    style={{
                      width: "15px",
                      height: "15px",
                      //  backgroundColor: "red",
                    }}
                  >
                    <span className="text-black text-xs">{getNotData}</span>
                  </div>
                </div>
                {openNotification && (
                  <div>
                    <NotificationBar
                      getNotificationData={getNotificationData}
                      notifications={notification}
                      setOpenNotification={setOpenNotification}
                      getNotData={getNotData}
                      setGetNotData={setGetNotData}
                    />
                  </div>
                )}
              </div>
              <div className="border-r-2 border-r-gray-400 h-10 w-1 pr-1">
                {/* <div class="flex items-center  rounded-full w-10 h-10">
                  <img
                    src="/flag.png"
                    className="bg-cover w-full h-full"
                    alt=""
                  />
                </div> */}
              </div>
              <div className="flex items-center gap-2 text-white">
                <div class="flex items-center overflow-hidden rounded-full w-10 h-10">
                  <img
                    src={userDetails?.img}
                    className="bg-cover w-full h-full"
                    alt=""
                  />
                </div>
                <div className="hidden sm:block">
                  <h6 className="">{admin}</h6>
                  <p>{userDetails?.email}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}

export default TopNavBar;
