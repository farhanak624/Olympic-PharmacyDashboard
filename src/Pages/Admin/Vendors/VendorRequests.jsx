import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import {
  approveVendor,
  getVendorRequests,
  rejectVendor,
} from "../../../Api/AdminApi";
import Loader from "../../../Components/Loader/Loader";

const VendorRequests = () => {
  const [selectedVendor, setSelectedVendor] = useState(null);
  const [requests, setRequests] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    setIsLoading(true);
    setRequests([]); // Clear previous requests when starting a new load
    getVendorRequests(page)
      .then((data) => {
        console.log("data in getVendorRequests", data);
        const vendors = data?.data?.Vendors;
        if (Array.isArray(vendors)) {
          setRequests(vendors); // Set the requests to the fetched vendors directly
          setTotalCount(data?.data?.totalRequestedVendors);
        } else {
          console.log("No vendors found");
        }
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
        console.log("error in getVendorRequests:", error);
      });
  }, [page]);

  const handleScroll = useCallback(() => {
    const { scrollTop, scrollHeight, clientHeight } =
      document.documentElement || document.body;
    if (scrollTop + clientHeight >= scrollHeight - 5 && !isLoading) {
      if (requests.length < totalCount) {
        setPage((prevPage) => prevPage + 1);
      }
    }
  }, [isLoading, requests.length, totalCount]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [requests, totalCount]);

  const handleApprove = (id) => {
    setSelectedVendor(id);
    approveVendor(id)
      .then((data) => {
        toast.success("Approved vendor successfully");
        setRequests((prevRequests) =>
          prevRequests.filter((vendor) => vendor._id !== id)
        );
        setSelectedVendor(null);
      })
      .catch((error) => {
        toast.error("Failed to approve vendor");
        setSelectedVendor(null);
      });
  };

  const handleReject = (id) => {
    setSelectedVendor(id);
    rejectVendor(id)
      .then((data) => {
        toast.warning("Rejected the vendor");
        setRequests((prevRequests) =>
          prevRequests.filter((vendor) => vendor._id !== id)
        );
        setSelectedVendor(null);
      })
      .catch((error) => {
        toast.error("Failed to reject the request");
        setSelectedVendor(null);
      });
  };
  const getDisplayValue = (value) => {
    return value !== undefined && value !== null ? value : "N/A";
  };

  return (
    <div className="mt-8 overflow-x-auto border rounded-xl shadow-md">
      <div className="table-responsive">
        <table className="table align-middle table-nowrap mb-0 h-9 w-full text-textColor">
          <thead className="bg-subContainerColor h-10">
            <tr className="text-white">
              <th>Name</th>
              <th>Phone Number</th>
              <th>Mail ID</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan="8" className="text-center py-3">
                  <Loader />
                </td>
              </tr>
            ) : requests.length === 0 ? (
              <tr>
                <td colSpan="9" className="text-red-700 text-center py-3">
                  No data available
                </td>
              </tr>
            ) : (
              requests?.map((vendor, index) => (
                <tr key={index} className="border-b border-gray-200">
                  <td
                    className="text-sm text-center py-3 cursor-pointer"
                    onClick={() =>
                      navigate(`/admin/vendorsRequestOverview/${vendor._id}`)
                    }
                  >
                    <div className="flex flex-col justify-center items-center sm:flex-row sm:items-center">
                      <img
                        src={
                          vendor?.vendorDetails?.profileImage
                            ? vendor.vendorDetails.profileImage
                            : "/defaultProfile.png"
                        }
                        className="m-2 w-7 h-7 mr-2 rounded-full"
                        alt="Vendor Profile"
                      />
                      <span className="sm:ml-2 sm:mt-0">
                        {getDisplayValue(vendor.name)}
                      </span>
                    </div>
                  </td>
                  <td
                    className="text-sm text-center py-3 cursor-pointer"
                    onClick={() =>
                      navigate(`/admin/vendorsRequestOverview/${vendor._id}`)
                    }
                  >
                    {getDisplayValue(vendor.phoneNumber)}
                  </td>
                  <td
                    className="text-center text-sm py-3 cursor-pointer"
                    onClick={() =>
                      navigate(`/admin/vendorsRequestOverview/${vendor._id}`)
                    }
                  >
                    {getDisplayValue(vendor.email)}
                  </td>
                  <td className="text-sm text-center py-3">
                    <div>
                      <button
                        className={
                          "w-16 h-6 m-1 rounded focus:outline-none bg-green-600 text-white"
                        }
                        onClick={(e) => {
                          e.stopPropagation(); // Prevent click from bubbling to the card div
                          Swal.fire({
                            background: "#000", // Set background to black
                            color: "#ffdd11", // Set text color to #ffdd11
                            title: "Are you sure?",
                            text: "You want approve this vendor!",
                            icon: "warning",
                            showCancelButton: true,
                            confirmButtonColor: "#ffdd11", // Set confirm button color to #ffdd11
                            cancelButtonColor: "#000",
                            confirmButtonText: "Yes, approve!",
                          }).then((result) => {
                            if (result.isConfirmed) {
                              handleApprove(vendor._id);
                            }
                          });
                        }}
                      >
                        Approve
                      </button>
                      <button
                        className={
                          "w-16 h-6 m-1 rounded focus:outline-none bg-red-600 text-white"
                        }
                        onClick={(e) => {
                          e.stopPropagation(); // Prevent click from bubbling to the card div
                          Swal.fire({
                            background: "#000", // Set background to black
                            color: "#ffdd11",
                            title: "Are you sure?",
                            text: "You want reject this vendor!",
                            icon: "warning",
                            showCancelButton: true,
                            confirmButtonColor: "#ffdd11", // Set confirm button color to #ffdd11
                            cancelButtonColor: "#000",
                            confirmButtonText: "Yes, reject!",
                          }).then((result) => {
                            if (result.isConfirmed) {
                              handleReject(vendor._id);
                            }
                          });
                        }}
                      >
                        Reject
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default VendorRequests;
