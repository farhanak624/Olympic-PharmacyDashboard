import React, { useEffect, useRef, useState } from "react";
import MultiCountrySelect from "./MultiCountrySelect";
import { Flip, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { uploadImageV2 } from "../../../Utils/imageUpload";
import {
  getAdminAllSection,
  getAdminAllcategory,
  sentPushNotification,
} from "../../../Api/AdminApi";

function SentNotificationpage() {
  const navigate = useNavigate();
  const [sectiondata, setSectionData] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    section: "",
    category: "",
    countries: "", // This will hold the array of selected countries
  });
  const [name, setName] = useState("");
  const [sectiondrop, setSectionDrop] = useState(false);
  const [productdrop, setProductdrop] = useState(false);
  const [productname, setProductName] = useState("");
  const [productData, setProductdata] = useState([]);
  const [file, setfile] = useState("");
  const [countryProp, setcountryProp] = useState({});

  useEffect(() => {
    getAdminAllcategory(productname)
      .then((data) => {
        console.log(data?.data?.data, ">>>>>>>");
        setProductdata(data?.data?.data);
      })
      .catch((err) => console.log(err));
  }, [productname]);

  // console.log(formData);
  useEffect(() => {
    getAdminAllSection(name)
      .then((data) => {
        setSectionData(data?.data?.data);
      })
      .catch((err) => console.log(err));
  }, [name]);
  const handleCountryChange = (selectedOptions) => {
    const countries = selectedOptions.label;
    setcountryProp(selectedOptions);
    setFormData({
      ...formData,
      countries: selectedOptions.label,
    });
  };
  const fileInputRef = useRef(null);
  const [newError, setnewErrors] = useState("");
  const handleChange = (e) => {
    const file = e.target.files[0];
    setfile(file);
  };
  const validateForm = () => {
    let newErrors = "";
    // Title validation
    if (!formData?.title?.trim()) {
      toast("Title is required");
      return false;
    }
    // Description validation
    if (!formData?.description?.trim()) {
      toast('"Description is required"');
      return false;
    }
    // Section validation
    if (!formData?.section) {
      toast("Section is required");

      return false;
    }
    // Category validation
    if (!formData?.category) {
      toast('"Category is required"');

      return false;
    }
    // Countries validation

    if (!formData?.countries) {
      toast("At least one country must be selected");

      return false;
    }
    // Image validation (optional, if you need to ensure an image is uploaded)
    if (file === "") {
      toast("Image is required");

      return false;
    }

    return true; // Return true if no errors
  };
  const handlesubmit = () => {
    if (!validateForm()) {
      return;
    }
    // dispatch(loadSpinner());
    let img;
    uploadImageV2(file)
      .then((data) => {
        console.log(data?.images[0]?.imageUrl);
        img = data?.images[0]?.imageUrl;
        if (!img) {
          toast("Image is Required");
          return;
        }
        sentPushNotification({
          title: formData?.title,
          description: formData?.description,
          categoryId: formData?.category,
          sectionId: formData?.section,
          country: formData.countries,
          image: img,
        })
          .then((data) => {
            console.log(data);
            // if (data?.data?.message === "No Users Found in this State") {
            toast(data?.data?.message);
            // }
            setcountryProp({});
            // toast("successfully created");
            setFormData({
              title: "",
              description: "",
              section: "",
              category: "",
              countries: [], // This will hold the array of selected countries
            });
            setfile("");
            setProductName("");
            setName("");
            fileInputRef.current.value = "";
          })
          .catch((err) => {
            toast("something wrong");
            setfile("");
            console.log(err);
            setFormData({
              title: "",
              description: "",
              section: "",
              category: "",
              countries: [], // This will hold the array of selected countries
            });
            setProductName("");

            setName("");
            fileInputRef.current.value = "";
          })
          .finally(() => {
            // dispatch(loadSpinner());
            navigate("/admin/pushNotification");
          });
      })
      .catch((err) => {
        toast("something wrong uploading image");
        // dispatch(loadSpinner());
        console.log(err);
      });
  };
  return (
    <div>
      <h1 className="text-textColor">Add Notification</h1>
      <div className=" p-3 bg-containerWhite rounded-lg">
        <div
          onClick={() => window.history.back()}
          className="flex items-center  border border-gray-100 cursor-pointer w-[100px] shadow-md justify-center font-bold gap-2"
        >
          {" "}
          <span className="font-bold text-white" style={{ fontSize: "30px" }}>
            &#8592;
          </span>{" "}
          <p className="text-textColor">Back</p>
        </div>
        {newError && (
          <div className="text-sm flex justify-center text-red-800 font-bold">
            {newError}
          </div>
        )}
        <div className="flex text-sm mt-5 gap-4 flex-col md:flex-row">
          <div className="w-full md:w-[60%]">
            <p className="font-bold text-textColor">Personal Informations</p>
            <div className=" p-3 bg-black rounded-md border">
              <p className="text-white">Title</p>
              <input
                type="text"
                className="w-full p-1 outline-none rounded-md shadow-sm bg-secondoryBackground text-textColor"
                placeholder="Enter title"
                name=""
                id=""
                value={formData.title}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    title: e.target.value,
                  })
                }
              />
              <p className="mt-5 text-white">Description</p>
              <textarea
                placeholder="Enter description"
                rows={2}
                value={formData.description}
                className="rounded-md p-3 w-full bg-secondoryBackground text-textColor"
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    description: e.target.value,
                  })
                }
              />
              <div className="flex gap-3 mt-3">
                <div className="relative">
                  <p className="text-white">Section</p>
                  <div className="flex overflow-hidden  rounded-md shadow-sm items-center bg-black text-textColor">
                    <input
                      type="text"
                      className="w-full p-1 outline-none border-none bg-secondoryBackground"
                      placeholder="Enter Section"
                      value={name}
                      onClick={() => setSectionDrop(!sectiondrop)}
                      onChange={(e) => {
                        setFormData({
                          ...formData,
                          category: e.target.value,
                        });
                        setName(e.target.value);
                      }}
                      name=""
                      id=""
                    />
                    <div className="p-1">
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 18 18"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M16.5 16.5L13.5834 13.5833M15.6667 8.58333C15.6667 12.4954 12.4954 15.6667 8.58333 15.6667C4.67132 15.6667 1.5 12.4954 1.5 8.58333C1.5 4.67132 4.67132 1.5 8.58333 1.5C12.4954 1.5 15.6667 4.67132 15.6667 8.58333Z"
                          stroke="#98A2B3"
                          stroke-width="1.66667"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                    </div>
                  </div>
                  {sectiondrop && (
                    <div className="absolute bg-secondoryBackground w-full h-28 top-14 rounded-md overflow-x-auto">
                      {sectiondata.length > 0 &&
                        sectiondata.map((data) => {
                          console.log(data);
                          return (
                            <p
                              onClick={() => {
                                setFormData({
                                  ...formData,
                                  section: data?._id,
                                });
                                setName(data?.name);
                                setSectionDrop(false);
                              }}
                              className="p-2 mt-1 mb-1 text-center cursor-pointer text-white"
                            >
                              {data?.name}
                            </p>
                          );
                        })}
                    </div>
                  )}
                </div>
                <div className="relative">
                  <p>category</p>
                  <div className="flex overflow-hidden border-gray-200 rounded-md shadow-sm items-center bg-white">
                    <input
                      type="text"
                      className="w-full p-1 outline-none border-none bg-secondoryBackground text-white"
                      placeholder="Search Category"
                      value={productname}
                      onClick={() => setProductdrop(!productdrop)}
                      onChange={(e) => {
                        setProductName(e.target.value);
                        setFormData({
                          ...formData,
                          category: e.target.value,
                        });
                      }}
                      name=""
                      id=""
                    />
                    <div className="p-1 bg-black">
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 18 18"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M16.5 16.5L13.5834 13.5833M15.6667 8.58333C15.6667 12.4954 12.4954 15.6667 8.58333 15.6667C4.67132 15.6667 1.5 12.4954 1.5 8.58333C1.5 4.67132 4.67132 1.5 8.58333 1.5C12.4954 1.5 15.6667 4.67132 15.6667 8.58333Z"
                          stroke="#98A2B3"
                          stroke-width="1.66667"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                    </div>
                  </div>
                  {productdrop && (
                    <div className="absolute  w-full h-28 top-14 rounded-md overflow-x-auto bg-secondoryBackground">
                      {productData.length > 0 &&
                        productData.map((data) => {
                          console.log(data);
                          return (
                            <p
                              onClick={() => {
                                setFormData({
                                  ...formData,
                                  category: data?._id,
                                });
                                setProductName(data?.name);
                                setProductdrop(false);
                              }}
                              className="p-2 mt-1 mb-1 text-center cursor-pointer text-white"
                            >
                              {data?.name}
                            </p>
                          );
                        })}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          {/* second div */}

          <div className="w-full notfi md:w-[40%]">
            <p className="font-bold text-textColor">Receiver Information</p>
            <div className=" p-3 bg-black rounded-md border">
              <p className="mt-2 text-textColor">Customer country</p>
              <MultiCountrySelect
                onChange={handleCountryChange}
                value={countryProp}
              />
              <p className="mt-2 text-textColor">Upload image</p>

              <div className="w-full p-3  justify-center rounded-md bg-secondoryBackground border-gray-200 shadow-sm">
                <input
                  type="file"
                  className="file:border file:bg-black file:text-white file:rounded-md file:shadow-sm text-white"
                  name="image"
                  onChange={handleChange}
                  ref={fileInputRef}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-end">
          <button
            onClick={handlesubmit}
            className="bg-navblue text-textColor2 p-2 rounded-r-full rounded-l-full"
          >
            Send Message
          </button>
        </div>
      </div>
    </div>
  );
}

export default SentNotificationpage;
