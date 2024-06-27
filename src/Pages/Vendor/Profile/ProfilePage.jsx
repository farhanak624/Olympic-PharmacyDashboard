import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import {
  addNewBank,
  editBank,
  getProfile,
  makePrimary,
} from "../../../Api/VendorApi";
import { loadSpinner } from "../../../Redux/Features/NavbarSlice";
import Countryselector from "../../../Components/Dropdowns/Countryselector";

const ProfilePage = () => {
  const dispatch = useDispatch();
  const [profileDetails, setProfileDetails] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [bankId, setBankId] = useState("");
  const [bankName, setBankName] = useState("");
  const [accountName, setAccountName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [iban, setIban] = useState("");
  const [ifsc, setIfsc] = useState("");
  const [bankNameError, setBankNameError] = useState("");
  const [accountNameError, setAccountNameError] = useState("");
  const [accountNumError, setAccountNumError] = useState("");
  const [ibanError, setIbanError] = useState("");
  const [ifscError, setIfscError] = useState("");
  const [totalStorage, setTotalStorage] = useState("");
  const [cloudStorage, setCloudStorage] = useState("");
  const [availableStorage, setAvailableStorage] = useState("");
  const [returnPolicy, setReturnPolicy] = useState("");

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setBankId("");
    setBankName("");
    setAccountName("");
    setAccountNumber("");
    setIfsc("");
    setIban("");
    setShowModal(false);
  };

  const openEditModal = (bankDetails) => {
    setBankId(bankDetails._id);
    setBankName(bankDetails.bankName);
    setAccountName(bankDetails.accountName);
    setAccountNumber(bankDetails.accountNumber);
    setIfsc(bankDetails.ifsc);
    setIban(bankDetails.iban);
    setShowEditModal(true);
  };

  const closeEditModal = () => {
    setBankId("");
    setBankName("");
    setAccountName("");
    setAccountNumber("");
    setIfsc("");
    setIban("");
    setShowEditModal(false);
  };

  useEffect(() => {
    dispatch(loadSpinner());
    getProfile()
      .then((data) => {
        console.log("data in getProfile", data.data.vendorData);
        const profileData = data.data.vendorData;
        setProfileDetails(profileData);

        // Limit decimals for cloudStorage and totalStorage
        const totalStorageValue = profileData?.cloudDetails?.totalCloud || 0;
        const cloudStorageValue = profileData?.cloudDetails?.cloudStorage || 0;

        setCloudStorage(parseFloat(cloudStorageValue.toFixed(2)));
        setTotalStorage(parseFloat(totalStorageValue.toFixed(2)));
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        dispatch(loadSpinner());
      });
  }, []);

  useEffect(() => {
    // Recalculate availableStorage after setting totalStorage and cloudStorage
    const availableStorageValue = parseFloat(
      (totalStorage - cloudStorage).toFixed(2)
    );
    setAvailableStorage(availableStorageValue);
    console.log("availableSpace: ", availableStorageValue);
  }, [totalStorage, cloudStorage]);

  const data = {
    labels: ["Storage", "Available"],
    datasets: [
      {
        data: [cloudStorage, availableStorage],
        backgroundColor: ["#2F4EFF", "#27C26E"], // Custom blue and green colors
        borderWidth: 0,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: "70%", // Adjust the cutout to control the thickness of the segments
    plugins: {
      legend: {
        display: false, // Hide the legend
      },
    },
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB");
  };

  const saveBankDetails = async (e) => {
    e.preventDefault();

    setBankNameError("");
    setAccountNameError("");
    setAccountNumError("");
    setIbanError("");
    setIfscError("");

    const onlyLetters = /^[A-Za-z\s]+$/;

    // Update error states asynchronously and use the state updater callback function
    setBankNameError((prevBankNameError) => {
      if (!bankName.trim()) {
        return "Bank Name is required";
      }
      return prevBankNameError;
    });
    setBankNameError((prevBankNameError) => {
      if (!onlyLetters.test(bankName)) {
        return "Bank Name should contain only letters";
      }
      return prevBankNameError;
    });
    setAccountNameError((prevAccountNameError) => {
      if (!accountName.trim()) {
        return "Account Name is required";
      }
      return prevAccountNameError;
    });
    setAccountNumError((prevAccountNumError) => {
      if (!accountNumber.trim()) {
        return "Account Number is Required";
      }
      return prevAccountNumError;
    });
    setIbanError((prevIbanError) => {
      if (!iban.trim()) {
        return "Iban is required";
      }
      return prevIbanError;
    });
    setIfscError((prevIfscError) => {
      if (!ifsc.trim()) {
        console.log("no ifsc");
        return "IFSC code is required";
      }
      return prevIfscError;
    });

    if (
      !bankName.trim() ||
      !accountName.trim() ||
      !accountNumber.trim() ||
      !iban.trim() ||
      !ifsc.trim()
    ) {
      // If any of the fields are empty, return early without saving the bank details
      return;
    }

    if (
      !bankNameError &&
      !accountNameError &&
      !accountNumError &&
      !ibanError &&
      !ifscError
    ) {
      try {
        const response = await addNewBank({
          bankName,
          accountName,
          ifsc,
          iban,
          accountNumber,
        });
        console.log("response adding new Bank: ", response);
        if (response.data.message) {
          setBankName("");
          setAccountName("");
          setAccountNumber("");
          setIban("");
          setIfsc("");
          getProfile()
            .then((data) => {
              console.log(
                "data in refetching getProfile",
                data.data.vendorData
              );
              const profileData = data.data.vendorData;
              setProfileDetails(profileData);
            })
            .catch((error) => {
              console.log(error);
            });
          setShowModal(false);
          setBankNameError("");
          setAccountNameError("");
          setAccountNumError("");
          setIbanError("");
          setIfscError("");
          toast.success("New bank details added successfully");
        }
      } catch (err) {
        console.log("error in adding bank: ", err);
        toast.error(err);
      }
    }
  };

  const editBankDetails = async (e) => {
    e.preventDefault();

    // Reset all error states
    setBankNameError("");
    setAccountNameError("");
    setAccountNumError("");
    setIbanError("");
    setIfscError("");

    const onlyLetters = /^[A-Za-z\s]+$/;

    // Update error states using the state updater callback function
    setBankNameError((prevBankNameError) => {
      if (!bankName.trim()) {
        console.log("no name");
        return "Bank Name is required";
      }
      return prevBankNameError;
    });
    setBankNameError((prevBankNameError) => {
      if (!onlyLetters.test(bankName)) {
        console.log("no name");
        return "Bank Name should contain only letters";
      }
      return prevBankNameError;
    });
    setAccountNameError((prevAccountNameError) => {
      if (!accountName.trim()) {
        return "Account Name is required";
      }
      return prevAccountNameError;
    });
    setAccountNumError((prevAccountNumError) => {
      if (!accountNumber.trim()) {
        return "Account Number is Required";
      }
      return prevAccountNumError;
    });
    setIbanError((prevIbanError) => {
      if (!iban.trim()) {
        return "Iban is required";
      }
      return prevIbanError;
    });
    setIfscError((prevIfscError) => {
      if (!ifsc.trim()) {
        console.log("no ifsc");
        return "IFSC code is required";
      }
      return prevIfscError;
    });

    // Now, the error states are updated, so you can check them
    if (
      !bankName.trim() ||
      !accountName.trim() ||
      !accountNumber.trim() ||
      !iban.trim() ||
      !ifsc.trim()
    ) {
      // If any of the fields are empty, return early without editing the bank details
      return;
    }

    try {
      // Attempt to edit the bank details
      const response = await editBank({
        bankId,
        bankName,
        accountName,
        ifsc,
        iban,
        accountNumber,
      });
      console.log("response editing Bank: ", response);
      if (response.data.message) {
        // If successful, reset form fields, fetch profile data, close the modal, and show success toast
        setBankName("");
        setAccountName("");
        setAccountNumber("");
        setIban("");
        setIfsc("");
        getProfile()
          .then((data) => {
            console.log("data in refetching getProfile", data.data.vendorData);
            const profileData = data.data.vendorData;
            setProfileDetails(profileData);
          })
          .catch((error) => {
            console.log(error);
          });
        setShowModal(false);
        setShowEditModal(false);
        toast.success("Bank details updated");
      }
    } catch (err) {
      // If an error occurs during editing bank details, display an error message
      console.log("error in editing bank: ", err);
      toast.error(err);
    }
  };

  const makeBankPrimary = async () => {
    try {
      const response = await makePrimary({ bankId });
      if (response.data.message) {
        getProfile()
          .then((data) => {
            toast.success("Primary bank updated successfully");
            const profileData = data.data.vendorData;
            setProfileDetails(profileData);
          })
          .catch((error) => {
            console.log(error);
          });
        setShowEditModal(false);
      }
    } catch (err) {
      console.log("error in making Primary bank: ", err);
      toast.error(err);
    }
  };

  return (
    <div className="bg-containerWhite rounded-xl w-full p-5 flex flex-col items-center justify-center">
      <div className="h-30 rounded-lg m-25 p-4 shadow-lg border relative flex items-center justify-center flex-col sm:flex-row w-full sm:w-3/4">
        {/* Left Section */}
        <div className="w-full sm:w-1/3 flex items-center justify-center mb-4 sm:mb-0">
          <img
            src={
              profileDetails?.vendorDetails?.profileImage ||
              "/defaultProfile.png"
            }
            alt="Profile"
            className="rounded-full w-40 h-40"
          />
        </div>

        {/* Right Section */}
        <div className="w-full sm:w-2/3 text-textColor">
          <div className="flex flex-col">
            <div className="flex items-start mb-2">
              <svg
                className="mr-3"
                width="20"
                height="26"
                viewBox="0 0 20 26"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9.9412 0C4.7676 0 0.558594 4.22409 0.558594 9.41617C0.558594 15.8597 8.95511 25.3192 9.3126 25.7188C9.64838 26.0941 10.2346 26.0934 10.5698 25.7188C10.9273 25.3192 19.3238 15.8597 19.3238 9.41617C19.3237 4.22409 15.1148 0 9.9412 0ZM9.9412 23.8535C7.11534 20.4847 2.24823 13.8385 2.24823 9.41628C2.24823 5.15908 5.69925 1.69569 9.9412 1.69569C14.1832 1.69569 17.6342 5.15908 17.6342 9.41623C17.6341 13.8387 12.7678 20.4837 9.9412 23.8535Z"
                  fill="#ffdd11"
                />
                <path
                  d="M9.93926 4.6344C7.32125 4.6344 5.19141 6.76426 5.19141 9.38223C5.19141 12.0002 7.3213 14.1301 9.93926 14.1301C12.5572 14.1301 14.6871 12.0002 14.6871 9.38223C14.6871 6.76426 12.5572 4.6344 9.93926 4.6344ZM9.93926 12.4307C8.25828 12.4307 6.89081 11.0632 6.89081 9.38223C6.89081 7.70128 8.25833 6.33377 9.93926 6.33377C11.6202 6.33377 12.9877 7.70128 12.9877 9.38223C12.9877 11.0632 11.6202 12.4307 9.93926 12.4307Z"
                  fill="#ffdd11"
                />
              </svg>
              <p className="w-full sm:w-1/3 text-lg font-semibold">Location</p>
              <p className="w-full sm:w-2/3">
                : {profileDetails?.vendorDetails?.state},{" "}
                {profileDetails?.vendorDetails?.country}
              </p>
            </div>
            <div className="flex items-start mb-2">
              <svg
                className="mr-3 mt-2"
                width="22"
                height="16"
                viewBox="0 0 22 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M20.5975 11.4368C20.5975 13.2537 18.9659 14.7294 16.9627 14.7294H5.03738C3.03415 14.7294 1.40251 13.2537 1.40251 11.4368V4.56315C1.40206 3.97755 1.57524 3.40259 1.90396 2.89835L7.72276 8.1694C8.5933 8.9603 9.75907 9.3961 11.0013 9.3961C12.2409 9.3961 13.4067 8.9603 14.2772 8.1694L20.096 2.89835C20.4247 3.40258 20.5979 3.97755 20.5974 4.56315V11.4368H20.5975ZM16.9626 1.27049H5.03738C4.21013 1.27049 3.44648 1.5241 2.83559 1.94607L8.71294 7.27247C9.32132 7.82123 10.1333 8.12561 11.0013 8.12561C11.8667 8.12561 12.6787 7.82123 13.287 7.27247L19.1644 1.94607C18.5535 1.5241 17.7899 1.27049 16.9626 1.27049ZM16.9626 0H5.03738C2.26034 0 0 2.04756 0 4.56319V11.4368C0 13.9548 2.26034 16 5.03738 16H16.9626C19.7397 16 22 13.9548 22 11.4368V4.56315C22 2.04752 19.7397 0 16.9626 0Z"
                  fill="#ffdd11"
                />
              </svg>

              <h2 className="w-full sm:w-1/3 text-lg font-semibold">Email</h2>
              <p className="w-full sm:w-2/3">: {profileDetails?.email}</p>
            </div>
            <div className="flex items-start">
              <svg
                className="mr-3 mt-1"
                width="22"
                height="22"
                viewBox="0 0 22 22"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M11 1.28906C13.2406 1.28997 15.412 2.06545 17.1463 3.48411C18.8806 4.90278 20.0711 6.87739 20.5161 9.07336C20.9611 11.2693 20.6333 13.5516 19.5881 15.5336C18.5429 17.5155 16.8447 19.0751 14.7812 19.9482C12.408 20.9511 9.73363 20.9701 7.34639 20.0011C4.95914 19.0321 3.05461 17.1545 2.05176 14.7812C1.04891 12.408 1.02989 9.73363 1.99889 7.34639C2.96789 4.95914 4.84553 3.05461 7.21875 2.05176C8.41496 1.54554 9.70109 1.28613 11 1.28906ZM11 0C4.92508 0 0 4.92508 0 11C0 17.0749 4.92508 22 11 22C17.0749 22 22 17.0749 22 11C22 4.92508 17.0749 0 11 0Z"
                  fill="#ffdd11"
                />
                <path
                  d="M14.2094 16.9241C13.5705 16.8811 12.6699 16.6607 11.7907 16.3462C8.69097 15.2367 5.6664 12.2809 5.02359 8.14644C4.90929 7.41038 5.02961 6.73792 5.58734 6.1905C5.77425 6.00745 5.94054 5.80378 6.12316 5.61644C6.81066 4.90874 7.81527 4.8907 8.52726 5.57046C8.75285 5.78531 8.9823 5.99714 9.2023 6.21886C9.50356 6.51594 9.67798 6.9182 9.68896 7.34116C9.69994 7.76411 9.54661 8.17487 9.26117 8.48718C9.08929 8.67796 8.90882 8.85929 8.7275 9.04019C8.52941 9.23785 8.2832 9.35128 8.01894 9.43378C7.69281 9.53605 7.63222 9.67269 7.78047 9.98421C8.71718 11.9462 10.1834 13.3588 12.1792 14.2222C12.446 14.3374 12.5693 14.2854 12.6768 14.0207C12.9122 13.4402 13.3441 13.0169 13.8403 12.6749C14.4019 12.2882 15.2063 12.3741 15.7383 12.8313C16.0299 13.0819 16.3086 13.3473 16.5732 13.6262C16.8579 13.9308 17.016 14.3323 17.0156 14.7492C17.0152 15.1662 16.8563 15.5673 16.571 15.8714C16.4881 15.9616 16.4026 16.0497 16.3231 16.1425C15.8444 16.6989 15.2373 16.9593 14.2094 16.9241Z"
                  fill="#ffdd11"
                />
              </svg>

              <p className="w-full sm:w-1/3 text-lg font-semibold">Contact</p>
              <p className="w-full sm:w-2/3">: {profileDetails?.phoneNumber}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="m-25 p-4 ">
        <div className="mb-4 sm:flex justify-between">
          <div className="mb-2 sm:w-1/2 sm:mr-2">
            <label htmlFor="vendorName" className="text-gray-300 font-semibold">
              Name
            </label>
            <input
              readOnly
              type="text"
              id="vendorName"
              placeholder="Vendor Name"
              className="border border-gray-300 bg-subContainerColor text-textColor rounded-md py-1 px-2 w-full focus:outline-none mt-2"
              value={profileDetails.name}
            />
          </div>
          <div className="mb-2 sm:w-1/2 relative">
            <label
              htmlFor="contactNumber"
              className="text-gray-300 font-semibold"
            >
              Date Of Birth
            </label>
            <input
              type="text"
              id="contactNumber"
              placeholder="Contact Number"
              className="mt-2 border border-gray-300 bg-subContainerColor text-textColor rounded-md py-1 px-2 w-full focus:outline-none"
              value={formatDate(profileDetails?.vendorDetails?.dateOfBirth)}
              readOnly
            />
          </div>
        </div>
        <div className="mb-4 sm:flex justify-between">
          <div className="mb-2 sm:w-1/2 sm:mr-2">
            <label htmlFor="email" className="text-gray-300 font-semibold">
              Phone
            </label>
            <input
              readOnly
              type="text"
              id="email"
              placeholder="Email ID"
              className="border border-gray-300 rounded-md bg-subContainerColor text-textColor py-1 px-2 w-full focus:outline-none mt-2"
              value={profileDetails.phoneNumber}
            />
          </div>
          <div className="mb-2 sm:w-1/2 relative">
            <label htmlFor="dob" className="text-gray-300 font-semibold">
              Email
            </label>
            <div className="relative">
              <input
                readOnly
                type="text"
                id="dob"
                placeholder="Date of Birth"
                className="mt-2 border border-gray-300 bg-subContainerColor text-textColor rounded-md py-1 px-2 w-full pr-8 focus:outline-none"
                value={profileDetails.email}
              />
            </div>
          </div>
        </div>
        <div className="mb-4">
          <label htmlFor="address" className="text-gray-300 font-semibold">
            Address
          </label>
          <input
            readOnly
            type="text"
            id="address"
            placeholder="Address"
            className="mt-2 border border-gray-300 bg-subContainerColor text-textColor rounded-md py-1 px-2 w-full focus:outline-none"
            value={profileDetails?.vendorDetails?.address}
          />
        </div>
        <div className="mb-4 sm:flex justify-between">
          <div className="mb-2 sm:w-1/2 sm:mr-2">
            <label htmlFor="city" className="text-gray-300 font-semibold">
              State
            </label>
            <input
              readOnly
              type="text"
              id="city"
              placeholder="City"
              className="mt-2 border border-gray-300 bg-subContainerColor text-textColor rounded-md py-1 px-2 w-full focus:outline-none"
              value={profileDetails?.vendorDetails?.state}
            />
          </div>
          <div className="mb-2 sm:w-1/2">
            <label htmlFor="state" className="text-gray-300 font-semibold">
              Country
            </label>
            <input
              readOnly
              type="text"
              id="state"
              placeholder="Country"
              className="mt-2 border border-gray-300 bg-subContainerColor text-textColor rounded-md py-1 px-2 w-full focus:outline-none"
              value={profileDetails?.vendorDetails?.country}
            />
          </div>
        </div>
        <div className="sm:flex justify-between mb-4">
          <div className="mb-2 sm:w-1/2 sm:mr-2">
            <label htmlFor="country" className="text-gray-300 font-semibold">
              Postal Code
            </label>
            <input
              readOnly
              type="text"
              id="country"
              placeholder="Post"
              className="mt-2 border border-gray-300 bg-subContainerColor text-textColor rounded-md py-1 px-2 w-full focus:outline-none"
              value={profileDetails?.vendorDetails?.postCode}
            />
          </div>
          <div className="sm:w-1/2">
            <label htmlFor="postcode" className="text-gray-300 font-semibold">
              ID
            </label>
            <input
              readOnly
              type="text"
              id="postcode"
              placeholder="Profile ID"
              className="mt-2 border border-gray-300 bg-subContainerColor text-textColor rounded-md py-1 px-2 w-full focus:outline-none"
              value={profileDetails?.vendorDetails?.profileId}
            />
          </div>
        </div>

        <div className="mb-4">
          <label htmlFor="returnPolicy" className="text-gray-300 font-semibold">
            Return Policy
          </label>

          <textarea
            style={{ resize: "none" }}
            type="text"
            placeholder="Return Policy"
            className="mt-2 border border-gray-300 bg-subContainerColor text-textColor rounded-md py-1 px-2 w-full focus:outline-none"
            value={profileDetails?.returnPolicy}
            onChange={(e) => {
              setReturnPolicy(e.target.value);
            }}
          />
        </div>

        <div className="mb-4">
          <label htmlFor="address" className="text-gray-300 font-semibold">
            Bank Account
          </label>
          <div className="border border-gray-300 rounded-md py-5 px-2 w-full">
            <div className="flex justify-end">
              <span
                className="text-gray-500 cursor-pointer"
                onClick={openModal}
              >
                Add
              </span>
              <svg
                className="m-1 cursor-pointer"
                onClick={openModal}
                width="17"
                height="17"
                viewBox="0 0 17 17"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="8.5" cy="8.5" r="8.5" fill="#2F4EFF" />
                <path d="M4 9H14M9 4V14" stroke="white" strokeLinecap="round" />
              </svg>
            </div>

            {showModal && (
              <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-700 bg-opacity-50">
                <div className="relative bg-white rounded-lg w-96">
                  <svg
                    onClick={closeModal}
                    className="absolute top-0 right-0 m-5 cursor-pointer"
                    width="26"
                    height="26"
                    viewBox="0 0 26 26"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M8.57896 17.4211L13 13M13 13L17.4211 8.57894M13 13L17.4211 17.4211M13 13L8.57896 8.57894M25 13C25 19.6274 19.6274 25 13 25C6.37258 25 1 19.6274 1 13C1 6.37258 6.37258 1 13 1C19.6274 1 25 6.37258 25 13Z"
                      stroke="white"
                      stroke-width="1.25"
                      stroke-linecap="round"
                    />
                  </svg>
                  {/* <button className="absolute top-0 right-0 p-0" onClick={closeModal}>Close</button> */}
                  <div className="p-6 bg-containerWhite rounded-lg">
                    <Countryselector
                      bankName={bankName}
                      setBankName={setBankName}
                      accountName={accountName}
                      setAccountName={setAccountName}
                      accountNumber={accountNumber}
                      setAccountNumber={setAccountNumber}
                      ifsc={ifsc}
                      setIfsc={setIfsc}
                      iban={iban}
                      setIban={setIban}
                      bankNameError={bankNameError}
                      accountNameError={accountNameError}
                      accountNumError={accountNumError}
                      ifscError={ifscError}
                      ibanError={ibanError}
                      isModal={true}
                      onSave={saveBankDetails}
                    />
                  </div>
                </div>
              </div>
            )}
            {profileDetails?.vendorDetails?.bankDetails
              .sort((a, b) => {
                if (a.isPrimary && !b.isPrimary) {
                  return -1; // Primary bank should come before non-primary bank
                }
              })
              .map((account, index) => (
                <div
                  key={index}
                  className="mt-4 border border-gray-300 rounded-md p-2 text-textColor"
                >
                  <div className="flex items-center space-x-4">
                    <div className="flex flex-col flex-grow">
                      <div className="flex items-center justify-between">
                        <p className="font-bold">{account.bankName}</p>
                        <button
                          className="text-blue-500 text-sm"
                          onClick={() => openEditModal(account)}
                        >
                          Edit
                        </button>
                      </div>
                      <div className="flex items-center justify-between">
                        <p className="text-sm text-gray-600">
                          {account.accountNumber}
                        </p>
                        {account.isPrimary && (
                          <button className="font-semibold text-sm">
                            Primary
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            {showEditModal && (
              <div className="fixed top-0 left-0 w-full h-full flex items-center  justify-center bg-gray-700 bg-opacity-50">
                <div className="rounded-lg w-96 bg-containerWhite">
                  <svg
                    onClick={closeEditModal}
                    className="absolute top-0 right-0 m-5 cursor-pointer"
                    width="26"
                    height="26"
                    viewBox="0 0 26 26"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M8.57896 17.4211L13 13M13 13L17.4211 8.57894M13 13L17.4211 17.4211M13 13L8.57896 8.57894M25 13C25 19.6274 19.6274 25 13 25C6.37258 25 1 19.6274 1 13C1 6.37258 6.37258 1 13 1C19.6274 1 25 6.37258 25 13Z"
                      stroke="white"
                      stroke-width="1.25"
                      stroke-linecap="round"
                    />
                  </svg>
                  <div className="p-6">
                    <Countryselector
                      bankName={bankName}
                      setBankName={setBankName}
                      accountName={accountName}
                      setAccountName={setAccountName}
                      accountNumber={accountNumber}
                      setAccountNumber={setAccountNumber}
                      ifsc={ifsc}
                      setIfsc={setIfsc}
                      iban={iban}
                      setIban={setIban}
                      bankNameError={bankNameError}
                      accountNameError={accountNameError}
                      accountNumError={accountNumError}
                      ifscError={ifscError}
                      ibanError={ibanError}
                      isEditMode={true}
                      onSave={editBankDetails}
                      onMakePrimary={makeBankPrimary}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
