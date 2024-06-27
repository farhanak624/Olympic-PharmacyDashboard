import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import AdminAddCouponModal from "../../../Components/Modal/CreateCouponModalAdmin";
import { vendorBlockOrUnblock, vendorGetCoupons } from "../../../Api/VendorApi";
import { useDispatch } from "react-redux";
import { loadSpinner } from "../../../Redux/Features/NavbarSlice";
import { deleteCoupon } from "../../../Api/AdminApi";
import Swal from "sweetalert2";

const VendorCoupons = ({ role }) => {
  const dispatch = useDispatch();
  const [createModal, setCreateModal] = useState(false);
  const [CouponList, setCouponList] = useState([]);
  useEffect(() => {
    getAllcouponList(role);
  }, []);
  const getAllcouponList = (role) => {
    dispatch(loadSpinner());
    vendorGetCoupons(role)
      .then((res) => {
        console.log(res.data);
        setCouponList(res?.data?.coupons);
      })
      .catch((err) => {
        console.log(err.response.data);
      })
      .finally(() => {
        dispatch(loadSpinner());
      });
  };
  const couponStatusChange = (couponId) => {
    dispatch(loadSpinner());
    vendorBlockOrUnblock(couponId)
      .then((data) => {
        console.log(data);
        toast.success("Coupon Status changed successfully");
        getAllcouponList();
      })
      .catch((error) => {
        console.log("asdsdd", error.response.data.message);
        toast.error(error.response.data.message);
      })
      .finally(() => {
        dispatch(loadSpinner());
      });
  };
  const callback = () => {
    setCreateModal(!createModal);
    getAllcouponList();
  };
  return (
    <div className="bg-containerWhite w-full flex flex-col h-full rounded-xl min-h-[600px] shadow-sm p-4">
      <div className="">
        <div className="flex justify-end items-center mb-4">
          Dashboard &gt; Coupon
        </div>
        <div className="flex justify-between items-center mb-4">
          <p className="text-3xl text-semibold text-amber-300">Coupons</p>
          <div>
            {/* <button className="bg-navblue hover:bg-blue-500 text-white font-bold py-2 px-4 rounded-l">
              Top Vendors
            </button>
            <button className="bg-gray-200 hover:bg-gray-400 text-black font-bold py-2 px-4 rounded-r">
              Vendor Request
            </button> */}
          </div>
          <button
            onClick={() => setCreateModal(true)}
            className="bg-navblue border shadow hover:bg-yellow-600 text-black font-bold py-2 px-4 rounded"
          >
            Create Coupon
          </button>
        </div>
        {createModal && (
          <AdminAddCouponModal admin={false} callback={callback} />
        )}
        <div className="overflow-x-auto">
          <table className="min-w-full leading-normal bg-">
            <thead>
              <tr className="">
                <th className="px-5 py-3 border-b-1  bg-[#1C1C1C] text-left text-xs font-semibold text-white  tracking-wider rounded-s-xl">
                  Coupon Name
                </th>
                <th className="px-5 py-3 border-b-1  bg-[#1C1C1C] text-left text-xs font-semibold text-white  tracking-wider">
                  Start date
                </th>
                <th className="px-5 py-3 border-b-1  bg-[#1C1C1C] text-left text-xs font-semibold text-white  tracking-wider">
                  End date
                </th>
                <th className="px-5 py-3 border-b-1  bg-[#1C1C1C] text-left text-xs font-semibold text-white  tracking-wider">
                  Min price
                </th>
                <th className="px-5 py-3 border-b-1  bg-[#1C1C1C] text-left text-xs font-semibold text-white  tracking-wider">
                  Discount
                </th>
                <th className="px-5 py-3 border-b-1  bg-[#1C1C1C] text-left text-xs font-semibold text-white  tracking-wider">
                  Discount Type
                </th>
                <th className="px-5 py-3 border-b-1  bg-[#1C1C1C] text-left text-xs font-semibold text-white  tracking-wider">
                  Maximum Per User
                </th>
                <th className="px-5 py-3 border-b-1  bg-[#1C1C1C] text-left text-xs font-semibold text-white  tracking-wider">
                  Status
                </th>
                <th className="px-5 py-3 border-b-1  bg-[#1C1C1C] text-left text-xs font-semibold text-white  tracking-wider rounded-e-xl">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {/* Map your data here */}
              {CouponList.length > 0 ? (
                CouponList.map((coupon) => {
                  return (
                    <tr className="bg-containerWhite">
                      <td className="px-5 py-5  text-sm ">
                        <div className="flex items-center">
                          <div className="ml-3">
                            <p className="text-white whitespace-no-wrap">
                              {coupon?.name}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-5 text-sm text-white">
                        {new Date(
                          coupon?.validity?.startDate
                        ).toLocaleDateString()}
                      </td>
                      <td className="px-5 py-5 text-sm text-white">
                        {new Date(
                          coupon?.validity?.endDate
                        ).toLocaleDateString()}
                      </td>
                      <td className="px-5 py-5 text-sm text-white">
                        ${coupon?.minPrice}
                      </td>
                      <td className="px-5 py-5 text-sm text-white">
                        {coupon?.discount}
                      </td>
                      <td className="px-5 py-5 text-sm text-white">
                        {coupon.discountType}
                      </td>
                      <td className="px-5 py-5 text-sm text-white">
                        {coupon?.maximumCount.userCount}
                      </td>
                      <td className="px-5  py-5text-sm text-white">
                        {coupon?.activeStatus ? (
                          <span className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
                            <span
                              aria-hidden="true"
                              className="absolute inset-0 bg-green-300 opacity-50 rounded-full"
                            ></span>
                            <span className="relative">Active</span>
                          </span>
                        ) : (
                          <span className="relative inline-block px-3 py-1 font-semibold text-red-900 leading-tight">
                            <span
                              aria-hidden="true"
                              className="absolute inset-0 bg-red-300 opacity-50 rounded-full"
                            ></span>
                            <span className="relative">Inactive</span>
                          </span>
                        )}
                      </td>
                      <td className="px-5 py-5 bg-containerWhite text-sm">
                        <div className="flex justify-center gap-2">
                          <button className="text-navblue hover:text-navblue mt-2">
                            <label className="inline-flex items-center cursor-pointer">
                              <input
                                type="checkbox"
                                className="sr-only peer"
                                checked={coupon?.activeStatus} // This will set the toggle "on" if activeStatus is true
                                onChange={() => couponStatusChange(coupon._id)}
                              />
                              <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-1 peer-focus:ring-navblue dark:peer-focus:ring-navblue rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-navblue"></div>
                            </label>
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation(); // Prevent click from bubbling to the card div
                              Swal.fire({
                                background: "#000", // Set background to black
                                color: "#ffdd11", // Set text color to #ffdd11
                                title: "Are you sure?",
                                text: `Do you want to delete this coupon ${coupon?.name}  !`,
                                icon: "warning",
                                iconColor: "#ffdd11", // Set icon color to #ffdd11
                                showCancelButton: true,
                                confirmButtonColor: "#ffdd11", // Set confirm button color to #ffdd11
                                cancelButtonColor: "#000", // Set cancel button color to black
                                confirmButtonText: "Yes, delete it!",
                              }).then((result) => {
                                if (result.isConfirmed) {
                                  // If confirmed, perform the delete operation
                                  // You can place your delete logic here
                                  deleteCoupon(coupon?._id, "vendor")
                                    .then((data) => {
                                      if (result.isConfirmed) {
                                      }
                                      Swal.fire({
                                        background: "#000", // Set background to black
                                        color: "#ffdd11", // Set text color to #ffdd11
                                        title: "Deleted!",
                                        text: "Your Coupon has been deleted.",
                                        icon: "success",
                                        iconColor: "#ffdd11", // Set icon color to #ffdd11
                                        confirmButtonColor: "#ffdd11", // Set confirm button color to #ffdd11
                                      });
                                      getAllcouponList();
                                    })
                                    .catch((err) => {
                                      toast.error(err.response.data.message);
                                      Swal.fire({
                                        background: "#000", // Set background to black
                                        color: "#ffdd11", // Set text color to #ffdd11
                                        title: "Sorry!",
                                        text: err.response.data.message,
                                        icon: "error",
                                        iconColor: "#ffdd11", // Set icon color to #ffdd11
                                        confirmButtonColor: "#ffdd11", // Set confirm button color to #ffdd11
                                      });
                                    });

                                  // For demonstration purposes, let's just log the deletion
                                  console.log("Item deleted");
                                }
                              });
                            }}
                            className="w-9 h-9 hover:bg-subColor rounded-full"
                          >
                            <svg
                              fill="#FF0000"
                              width="23px"
                              className="ml-1.5"
                              height="23px"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path d="M5.755,20.283,4,8H20L18.245,20.283A2,2,0,0,1,16.265,22H7.735A2,2,0,0,1,5.755,20.283ZM21,4H16V3a1,1,0,0,0-1-1H9A1,1,0,0,0,8,3V4H3A1,1,0,0,0,3,6H21a1,1,0,0,0,0-2Z"></path>
                            </svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="9" className="text-center py-5 text-amber-400">
                    Coupons Not Added Yet
                  </td>
                </tr>
              )}
              {/* Repeat rows as needed */}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default VendorCoupons;
