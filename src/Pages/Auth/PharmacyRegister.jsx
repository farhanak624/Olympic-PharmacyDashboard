import React, { useState } from "react";
import curlyWave from "../../assets/images/curlyWave.png";
import GoogleMapReact from "google-map-react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { ClipLoader, PuffLoader } from "react-spinners";
import Loader from "../../Components/Loader/Loader";
import { signup } from "../../Api/VendorApi";
import { validateConfirmPassword, validateEmail, validateFirstName, validateLastName, validatePassword, validatePhoneNumber } from "../../Utils/validation";

const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "yellow",
};
const AnyReactComponent = ({ text }) => <div>{text}</div>;

const PharmacyRegister = () => {
  // const dispatch = useDispatch()
  const [color, setColor] = useState("#FFDD11");
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false);

  const [firstNameError, setFirstNameError] = useState('');
  const [lastNameError, setlastNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [phoneNumberError, setPhoneNumberError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');

  const navigate = useNavigate()
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const firstNameValidationResult = validateFirstName(firstName);
    setFirstNameError(firstNameValidationResult);

    const lastNameValidationResult = validateLastName(lastName);
    setlastNameError(lastNameValidationResult);

    const emailValidationResult = validateEmail(email);
    setEmailError(emailValidationResult);

    const phoneNumberValidationResult = validatePhoneNumber(phoneNumber);
    setPhoneNumberError(phoneNumberValidationResult);

    const passwordValidationResult = validatePassword(password);
    setPasswordError(passwordValidationResult);

    const confirmPasswordValidationResult = validateConfirmPassword(password, confirmPassword);
    setConfirmPasswordError(confirmPasswordValidationResult);

    if (
      !firstNameValidationResult &&
      !lastNameValidationResult &&
      !emailValidationResult &&
      !phoneNumberValidationResult &&
      !passwordValidationResult &&
      !confirmPasswordValidationResult
    ) {
      try {
        const res = await signup({ firstName, lastName, email, phoneNumber, password })
        console.log('responseSignup:', res)
        if (res.data.message) {
          const responseEmail = res.data.email
          setIsLoading(false);
          navigate('/verifyOTP', { state: { email: responseEmail } });
        } else {
          console.log("error")
          setIsLoading(false);
          toast.error(res.error.data.message);
        }
      } catch (err) {
        console.log(err)
        //toast.error('Register Failed'); 
        setIsLoading(false);
        toast.error(err?.response?.data?.message || err.error);
      }
    } else{
      setIsLoading(false);
    }
  };


  return (
    <div className="bg-black min-h-screen flex flex-col lg:flex-row">
      {/* left section */}
      <div className="lg:w-[60%] w-full px-20 py-10">
        <div className="mb-8 text-center">
          <p className="text-2xl sm:text-3xl font-bold text-white mb-1">
            Register
          </p>
          <img
            src={curlyWave}
            className="inline-flex justify-center w-24 sm:w-32"
            alt="Curly wave"
          />
          <p className="text-gray-500 text-xs sm:text-sm my-4 sm:my-7">
            Welcome back! Please enter your details.
          </p>
        </div>
        <div className="flex items-center justify-center ml-2 w-full">
          <div className="">
            <form onSubmit={handleSubmit}>
              <div className="">
                <div className="-mx-3 flex flex-wrap">
                  <div className="w-full px-3 sm:w-1/2">
                    <div className="mb-4">
                      <label
                        htmlFor="name"
                        className="block text-sm pb-2 font-medium text-textColor"
                      >
                        First Name
                      </label>
                      <input
                        type="text"
                        name="area"
                        id="area"
                        placeholder="Enter First name"
                        className="w-full rounded-md border border-[#e0e0e0] bg-containerWhite py-1.5 px-6 text-base font-medium text-textColor outline-none focus:border-navblue focus:shadow-md"
                        value={firstName} onChange={(e) => { setFirstName(e.target.value) }}
                      />
                      {firstNameError && <p className='text-red-500 italic text-xs'>{firstNameError}</p>}
                    </div>
                  </div>
                  <div className="w-full px-3 sm:w-1/2">
                    <div className="mb-4">
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium pb-2 text-textColor"
                      >
                        Last Name
                      </label>
                      <input
                        type="text"
                        name="city"
                        id="city"
                        placeholder="Enter last name"
                        className="w-full rounded-md border border-[#e0e0e0] bg-containerWhite py-1.5 px-6 text-base font-medium text-textColor outline-none focus:border-navblue focus:shadow-md"
                        value={lastName}
                        onChange={(e) => { setLastName(e.target.value) }}
                      />
                      {lastNameError && <p className='text-red-500 italic text-xs'>{lastNameError}</p>}
                    </div>
                  </div>
                </div>
              </div>
              <div className="mb-4">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-textColor pb-2"
                >
                  Email
                </label>
                <input
                  type="email"
                  name="name"
                  id="name"
                  placeholder="Enter email"
                  className="w-full rounded-md border border-[#e0e0e0] bg-containerWhite py-1.5 px-6 text-base font-medium text-textColor outline-none focus:border-navblue focus:shadow-md"
                  value={email}
                  onChange={(e) => { setEmail(e.target.value) }}
                />
                {emailError && <p className='text-red-500 italic text-xs'>{emailError}</p>}
              </div>
              <div className="mb-5">
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-textColor pb-2"
                >
                  Phone Number
                </label>
                <input
                  type="text"
                  name="phone"
                  id="phone"
                  placeholder="Enter phone number"
                  className="w-full rounded-md border border-[#e0e0e0] bg-containerWhite py-1.5 px-6 text-base font-medium text-textColor outline-none focus:border-navblue focus:shadow-md"
                  value={phoneNumber}
                  onChange={(e) => { setPhoneNumber(e.target.value) }}
                />
                {phoneNumberError && <p className='text-red-500 italic text-xs'>{phoneNumberError}</p>}
              </div>
              <div className="mb-3 w-full">
                <label
                  htmlFor="email"
                  className=" block text-sm font-medium pb-2 text-textColor"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Enter password"
                  className="w-full rounded-md border border-[#e0e0e0] bg-containerWhite py-1.5 px-6 text-base font-medium text-textColor outline-none focus:border-navblue focus:shadow-md"
                  value={password}
                  onChange={(e) => { setPassword(e.target.value) }}
                />
                {passwordError && <p className='text-red-500 italic text-xs'>{passwordError}</p>}
              </div>
              <div className="mb-2">
                <label
                  htmlFor="email"
                  className=" block text-sm font-medium text-textColor pb-2"
                >
                  Confirm Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="confirmPassword"
                  placeholder="Enter password to confirm"
                  className="w-full rounded-md border border-[#e0e0e0] bg-containerWhite py-1.5 px-6 text-base font-medium text-textColor outline-none focus:border-navblue focus:shadow-md"
                  value={confirmPassword}
                  onChange={(e) => { setConfirmPassword(e.target.value) }}
                />
                {confirmPasswordError && <p className='text-red-500 italic text-xs'>{confirmPasswordError}</p>}
              </div>
              <div className="-mx-3 flex flex-wrap">
                <div className="w-full px-3 sm:w-1/2"></div>
              </div>

              <div className="pt-8 w-full flex justify-center">
                <button className="hover:shadow-form  w-3/4 rounded-md bg-navblue py-2 px-8 text-center text-base font-normal text-textColor2 outline-none">
                  {isLoading ? <Loader /> : "SIGN UP"}
                </button>
              </div>
            </form>
            <div className="flex justify-center py-6">
              <p className="text-xs text-textColor">Already have an account</p>{" "}
              &nbsp;
              <a className="text-navblue text-xs" href="/login">
                {"  "}
                login
              </a>
            </div>
          </div>
        </div>
        {/* <p
          onClick={() => {
            navigate("/login");
          }}
          className="text-[#FFDD11] cursor-pointer"
        >
          Back to login
        </p> */}
        {/* <div className="flex justify-center">
          <button
            onClick={handleSubmit}
            className="mt-4 w-40 h-10 bg-[#FFDD11] hover:bg-blue-700 rounded-lg text-black font-semibold text-xs sm:text-sm tracking-wider"
          >
            Sign Up
          </button>
        </div> */}
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
      {/* {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-75 z-50">
          <div className="w-3/4 h-3/4 bg-containerWhite rounded-lg shadow-lg overflow-hidden">
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
      )} */}
    </div>
  );
};

export default PharmacyRegister;
