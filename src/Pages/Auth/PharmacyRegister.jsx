import React, { useState } from "react";
import curlyWave from "../../assets/images/curlyWave.png";
import GoogleMapReact from "google-map-react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { ClipLoader, PuffLoader } from "react-spinners";

const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "yellow",
};
const AnyReactComponent = ({ text }) => <div>{text}</div>;

const PharmacyRegister = () => {
  // const dispatch = useDispatch()
  const navigate = useNavigate();
  const [color, setColor] = useState("#ffffff");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [Location, setLocation] = useState();
  const [Name, setName] = useState("");
  const [Email, setEmail] = useState("");
  const [Phone, setPhone] = useState("");
  const [License, setLicense] = useState(null);
  const [Description, setDescription] = useState("");
  const [Password, setPassword] = useState("");
  const [ConfirmPassword, setConfirmPassword] = useState("");
  const [ProfileImage, setProfileImage] = useState(null);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCoordinates, setSelectedCoordinates] = useState({
    lat: "",
    lng: "",
  });

  const handleMapClick = ({ lat, lng }) => {
    setSelectedCoordinates({ lat, lng });
    setLocation(`Latitude: ${lat}, Longitude: ${lng}`);
    setIsModalOpen(false);
  };

  const handleSubmit = async (e) => {
    setIsLoading(true);
    e.preventDefault();
    if (
      Name === "" ||
      Email === "" ||
      Phone === "" ||
      Description === "" ||
      Password === "" ||
      ConfirmPassword === ""
    ) {
      toast.error("Please fill all the fields");
      setIsLoading(false);
      return false;
    }
    const validateEmail = (email) => {
      return String(email)
        .toLowerCase()
        .match(
          /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\\.,;:\s@\"]+\.)+[^<>()[\]\\.,;:\s@\"]{2,})$/
        );
    };
    if(!validateEmail(Email)){
      toast.error("Please enter valid email");
      setIsLoading(false)
      return false;
    }
    if (!selectedCoordinates.lat || !selectedCoordinates.lng) {
      toast.error("Please select location");
      setIsLoading(false)
      return false;
    }
    if(ProfileImage === null){
      toast.error("Please upload profile image");
      setIsLoading(false)
      return false;
    }
    if(License === null){
      toast.error("Please upload license");
      setIsLoading(false)
      return false;
    }
    if(Password !== ConfirmPassword){
      toast.error("Password and Confirm Password should be same");
      setIsLoading(false)
      return false;
    }
    const licencseResponse = await uploadImageV2(ProfileImage);
    const profileImageResponse = await uploadImageV2(License);
    const formData = {
      name: Name,
      email: Email,
      phoneNumber: Phone,
      licence: licencseResponse.images[0].imageUrl,
      description: Description,
      password: Password,
      latitude: selectedCoordinates.lat.toString(),
      longitude: selectedCoordinates.lng.toString(),
      profileImage: profileImageResponse.images[0].imageUrl,
    };
    console.log("Form Data: ", formData);
    // Call API to register pharmacy
    pharmaRegister(formData).then((res) => {
      console.log("Response: ", res);
      if (res.status === 200) {
        setIsLoading(false)
        toast.success("Pharmacy registered successfully");
        // Redirect to login page
        navigate("/otp-verify", { state: { email: Email,role:"pharma" } });
      }
    }).catch((err) => {
      setIsLoading(false)
      console.log("Error: ", err);
      toast.error("Failed to register pharmacy");
    });
  };

  return (
    <div className="bg-black min-h-screen flex flex-col lg:flex-row">
      {/* left section */}
      <div className="lg:w-[60%] w-full px-20 py-10">
        <div className="mb-8 text-start">
          <p className="text-2xl sm:text-3xl font-bold text-white mb-1">
            Register
          </p>
          <img src={curlyWave} className="w-24 sm:w-32" alt="Curly wave" />
          <p className="text-gray-500 text-xs sm:text-sm my-4 sm:my-7">
            Welcome back! Please enter your details.
          </p>
        </div>
        <form className="">
          <div className="flex flex-wrap">
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label className="block text-gray-400 text-xs font-bold mb-2">
                Company Name
              </label>
              <input
                className="appearance-none block w-full bg-black text-gray-400 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none "
                type="text"
                value={Name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter Company Name"
              />
            </div>
            <div className="w-full md:w-1/2 px-3">
              <label className="block text-gray-400 text-xs font-bold mb-2">
                Email Address
              </label>
              <input
                type="email"
                value={Email}
                onChange={(e) => setEmail(e.target.value)}
                className="appearance-none block w-full bg-black text-gray-400 border rounded py-3 px-4 leading-tight focus:outline-none "
                placeholder="Enter Email Address"
              />
            </div>
          </div>
          <div className="flex flex-wrap">
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label className="block text-gray-400 text-xs font-bold mb-2">
                Phone Number
              </label>
              <input
                value={Phone}
                type="number"
                max={10}
                min={10}
                onKeyDown={(e) =>
                  ["e", "E", "+", "-"].includes(e.key) && e.preventDefault()
                }
                onChange={(e) => {
                  if (e.target.value.length > 10) {
                    return;
                  }
                  setPhone(e.target.value);
                }}
                className="appearance-none block w-full bg-black text-gray-400 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none"
                placeholder="Enter Phone Number"
              />
            </div>
            <div className="w-full md:w-1/2 px-3">
              <label className="block text-gray-400 text-xs font-bold mb-2">
                Upload License
              </label>
              <div className="relative">
                <input
                  type="file"
                  onChange={(e) => setLicense(e.target.files[0])}
                  className="appearance-none file:hidden block w-full bg-black text-gray-400 border rounded py-3 px-4 pr-10 leading-tight focus:outline-none "
                  placeholder="Enter Location"
                />
                <svg
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  width="20"
                  height="21"
                  viewBox="0 0 20 21"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M3.33594 14.2742V15.1042C3.33594 15.7672 3.59933 16.4031 4.06817 16.8719C4.53701 17.3408 5.1729 17.6042 5.83594 17.6042H14.1693C14.8323 17.6042 15.4682 17.3408 15.937 16.8719C16.4059 16.4031 16.6693 15.7672 16.6693 15.1042V14.2708M10.0026 13.8542V4.6875M10.0026 4.6875L12.9193 7.60417M10.0026 4.6875L7.08594 7.60417"
                    stroke="white"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap">
            <div className="w-full md:w-1/2 px-3">
              <label className="block text-gray-400 text-xs font-bold mb-2">
                Location
              </label>
              <div className="relative">
                <input
                type="text"
                  value={Location}
                  onClick={() => {
                    setIsModalOpen(true);
                  }}
                  className="appearance-none block w-full bg-black text-gray-400 border rounded py-3 px-4 pr-10 leading-tight focus:outline-none "
                  placeholder="Enter Location"
                />
                <svg
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12.8169 16.6912L9.64781 20.6893C8.75354 19.6472 6.62056 17.1641 4.56907 14.7937L13.5515 7.41924L12.8118 16.5817C12.8088 16.6187 12.8107 16.6555 12.8169 16.6912ZM20.971 7.81066V13.1565L14.8561 15.5251L20.971 7.81066ZM20.5863 6.88923L13.7774 15.4794L14.473 6.86328H20.4581C20.5036 6.86328 20.5443 6.87808 20.5863 6.88923ZM0 10.8899C0.731618 11.71 1.9369 13.0911 3.32085 14.6877L0 17.414V10.8899ZM0 20.4258V18.5448L3.89327 15.3485C5.46504 17.1645 7.20191 19.1815 8.71026 20.9387H0.512866C0.229979 20.9387 0 20.7087 0 20.4258ZM20.4581 20.9387H10.565L13.7841 16.8776L20.971 14.0937V20.4258C20.971 20.7087 20.741 20.9387 20.4581 20.9387ZM9.46511 6.86331C8.79224 8.3838 7.55578 10.0965 6.46349 11.4509C6.13143 11.8704 5.63334 12.1107 5.10031 12.1107C4.56726 12.1107 4.06916 11.8704 3.73276 11.4509C2.64046 10.0878 1.40835 8.37505 0.739858 6.86331H0.512679C0.228672 6.86331 0.00146673 7.09489 0.00146673 7.37452V9.59841C0.534519 10.1533 2.18171 12.0364 3.9949 14.1336L12.8512 6.86331H9.46511Z"
                    fill="white"
                  />
                  <path
                    d="M5.1028 0.9375C2.89635 0.9375 1.10938 2.7245 1.10938 4.92656C1.10938 6.586 3.37554 9.60196 4.41684 10.9036C4.77074 11.3449 5.43484 11.3449 5.78439 10.9036C6.81836 9.61879 9.09621 6.58557 9.09621 4.92656C9.09621 2.7245 7.30923 0.9375 5.1028 0.9375ZM5.1028 6.92764C3.99739 6.92764 3.10172 6.0276 3.10172 4.92656C3.10172 3.82552 3.99739 2.92984 5.1028 2.92984C6.20382 2.92984 7.09952 3.82552 7.09952 4.92656C7.09952 6.0276 6.20382 6.92764 5.1028 6.92764Z"
                    fill="white"
                  />
                </svg>
              </div>
            </div>
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label className="block text-gray-400 text-xs font-bold mb-2">
                Description
              </label>
              <textarea
                value={Description}
                onChange={(e) => setDescription(e.target.value)}
                className="appearance-none block w-full bg-black text-gray-400 border rounded py-0.5 px-4 mb-3 leading-tight focus:outline-none "
                placeholder="Enter Description"
              />
            </div>
          </div>

          <div className="flex flex-wrap lg:flex-nowrap w-full">
            <div className="w-full lg:w-[50%] px-3 mb-6 lg:mb-0">
              <label className="block text-gray-400 text-xs font-bold mb-2">
                Add Profile Image
              </label>
              <div className="flex flex-col items-center p-4 bg-[#151515] border border-dashed rounded-lg shadow-md">
                <label
                  htmlFor="fileInput"
                  className="text-pink-600 p-2 rounded-full mb-2 cursor-pointer"
                >
                 {ProfileImage ? (
                  <img
                    src={URL.createObjectURL(ProfileImage)}
                    alt="Profile Image"
                    className="w-20 h-20 rounded-full"
                  />
                 ) : (
                  <svg
                  width="64"
                  height="48"
                  viewBox="0 0 64 48"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M51.944 18.912C51.3787 8.376 42.6827 0 32 0C21.32 0 12.6213 8.376 12.056 18.912C5.20267 20.1467 0 26.128 0 33.3333C0 41.432 6.568 48 14.6667 48H49.3333C57.432 48 64 41.432 64 33.3333C64 26.128 58.7973 20.1467 51.944 18.912ZM32 16L42.6667 26.6667H34.6667V37.3333H29.3333V26.6667H21.3333L32 16Z"
                    fill="#FFDD11"
                  />
                </svg>
                 )}
                </label>
                <input
                  type="file"
                  id="fileInput"
                  className="hidden"
                  onChange={(e) => setProfileImage(e.target.files[0])}
                  accept="image/*"
                />
                <p className="text-white font-semibold">
                  Drop your image here{" "}
                  <span
                    id="browseLink"
                    className="text-yellow-500 cursor-pointer"
                  >
                    Browse
                  </span>
                </p>
                <p className="text-sm text-zinc-500">Support: JPG, JPEG, PNG</p>
              </div>
            </div>
            <div className="w-full lg:w-[50%] px-3">
              <div className="mb-6">
                <label className="block text-gray-400 text-xs font-bold mb-2">
                  Password
                </label>
                <input
                  type="password"
                  value={Password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="appearance-none block w-full bg-black text-gray-400 border rounded py-3 px-4 leading-tight focus:outline-none "
                  placeholder="Password"
                />
              </div>
              <div>
                <label className="block text-gray-400 text-xs font-bold mb-2">
                  Confirm Password
                </label>
                <input
                  type="password"
                  value={ConfirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="appearance-none block w-full bg-black text-gray-400 border rounded py-3 px-4 leading-tight focus:outline-none "
                  placeholder="Confirm Password"
                />
              </div>
            </div>
          </div>
        </form>
        <p
        onClick={()=>{

          navigate("/login")
        }}
        className="text-[#FFDD11] cursor-pointer">Back to login</p>
        <div className="flex justify-center">
          <button
            onClick={handleSubmit}
            className="mt-4 w-40 h-10 bg-[#FFDD11] hover:bg-blue-700 rounded-lg text-black font-semibold text-xs sm:text-sm tracking-wider"
          >
            Sign Up
          </button>
        </div>
      </div>
      {/* right section */}
      <div className="hidden lg:flex lg:w-[40%] items-center justify-center pr-5">
        <img
          src="./RegisterImage.png"
          className="max-h-screen object-scale-down rounded-lg"
          alt="Curly wave"
        />
      </div>
      {isLoading ? (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-75 z-50">
          <PuffLoader
            color={color}
            loading={isLoading}
            cssOverride={override}
            size={150}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>
      ) : (
        ""
      )}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-75 z-50">
          <div className="w-3/4 h-3/4 bg-white rounded-lg shadow-lg overflow-hidden">
            <GoogleMapReact
              bootstrapURLKeys={{
                key: import.meta.env.VITE_REACT_APP_GOOGLE_MAP_API_KEY,
              }} // Replace "YOUR_API_KEY" with your actual Google Maps API key
              center={{ lat: 10.99835602, lng: 77.01502627 }}
              defaultZoom={11}
              onClick={handleMapClick}
            >
              {selectedCoordinates.lat && selectedCoordinates.lng && (
                <AnyReactComponent
                  lat={selectedCoordinates.lat}
                  lng={selectedCoordinates.lng}
                  text="Selected Location"
                />
              )}
            </GoogleMapReact>
          </div>
        </div>
      )}
    </div>
  );
};

export default PharmacyRegister;
