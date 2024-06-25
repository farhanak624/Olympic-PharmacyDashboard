import React, { useEffect, useRef, useState } from "react";
// import {
//   getNotificationApi,
//   readNotification,
//   unreadNotification,
// } from "../../API/ApiCall";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getNotification, readNotification } from "../../../Api/AdminApi";

const NotificationBar = ({
  getNotData,
  setGetNotData,
  getNotificationData,
  setOpenNotification,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const notificationListRef = useRef(null);
  const [paginatecount, setPaginatecount] = useState(1);
  const [navbardata, setNavbardata] = useState([]);
  const [notficationlength, setntfLengt] = useState(0);

  const getAllNotification = () => {
    getNotification()
      .then(({ data }) => {
        setNavbardata(data?.notification);
        setntfLengt(data?.notification?.length);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getAllNotification();
  }, []);

  // Callback function to be called when scrolled to bottom
  const handleScrollToBottom = () => {};

  // Scroll event listener
  const handleScroll = (e) => {
    const bottom =
      e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;
    if (bottom) handleScrollToBottom();
  };

  // Attaching the scroll event listener
  useEffect(() => {
    const notificationList = notificationListRef.current;
    if (notificationList) {
      notificationList.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (notificationList) {
        notificationList.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  return (
    <div className="fixed z-50 top-16 right-6 w-80 bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="p-4 font-bold text-xl border-b">Notifications</div>
      <ul
        ref={notificationListRef}
        className="list-none overflow-y-scroll max-h-96 scrollbar-hide"
      >
        {navbardata.map((notification, index) => {
          console.log(notification);
          return (
            <li
              onClick={() => {
                readNotification(notification._id)
                  .then((data) => {
                    getNotificationData();
                    // setOpenNotification(false);
                  })
                  .catch((err) => {
                    console.log(err);
                  });
              }}
              key={index}
              className={`border-b last:border-b-0 p-2 ${
                !notification?.isRead ? "bg-blue-50" : ""
              }`}
            >
              <a
                // href={notification.link}
                className="flex items-center p-4 hover:bg-gray-100 relative"
              >
                {notification?.isRead ? null : (
                  <span className="absolute right-0 top-1/2 transform -translate-y-1/2 h-2 w-2 bg-blue-500 rounded-full"></span>
                )}
                <div>
                  <div className="font-medium">{notification?.title}</div>
                  <div className="text-sm text-gray-600">
                    {notification?.message}
                  </div>
                </div>
              </a>
            </li>
          );
        })}
      </ul>
      {notficationlength === 0 && (
        <div className="text-red-900 p-4 text-center">
          {" "}
          There are no pending notifications.{" "}
        </div>
      )}
    </div>
  );
};

export default NotificationBar;
