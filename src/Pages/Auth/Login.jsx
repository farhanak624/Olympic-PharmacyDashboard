import React, { useEffect, useState, CSSProperties } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import curlyWave from "../../assets/images/curlyWave.png";
import loginFrame from "../../assets/images/loginFrame.png";
import { ToastContainer, toast } from "react-toastify";
import { ClipLoader, PuffLoader } from "react-spinners";
import { LoginUserdata, userLogin } from "../../Api/AdminApi";
import { requestForToken } from "../../Firebase/FirebaseConfig";
// import "../Pages/login.css"
const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "yellow",
};
const LoginIn = () => {
  const [color, setColor] = useState("#ffdd11");
  const navigate = useNavigate();
  const location = useLocation();
  const [errmsg, setErrmsg] = useState("");
  const [viewPassword, setViewPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const LoginUser = async (e) => {
    setIsLoading(true);
    e.preventDefault();
    setIsLoading(true);
    setErrmsg("");

    const form = new FormData(e.target);
    const UserData = Object.fromEntries(form);
    console.log(UserData);

    try {
      const response = await userLogin({
        email: UserData.email,
        password: UserData.password,
      });
      console.log("Success", response);
      localStorage.setItem("encryptedToken", JSON.stringify(response.data));
      localStorage.setItem("token", response?.data?.encryptedToken);
      setIsLoading(false);
      if (response.data.role === "vendor") {
        console.log("Vendor");
        navigate("/vendor/");
      }
      if (response.data.role === "admin") {
        console.log("Admin");
        navigate("/admin/");
      }
    } catch (error) {
      setIsLoading(false);
      console.log("Error", error);
      toast.error(error?.response?.data?.message);
    }
  };

  useEffect(() => {
    document.querySelectorAll("input").forEach((input) => {
      input.addEventListener("animationstart", (event) => {
        if (event.animationName === "onAutoFillStart") {
          // Add your styling or classes here
          input.classList.add("autofilled");
        }
      });
    });
  }, []);

  return (
    <div className="bg-black min-h-screen flex flex-col mt-0 sm:flex-row justify-center items-center">
      <ToastContainer position="top-center" />
      <section className="w-full flex justify-center lg:max-w-4xl">
        <div className="flex w-full flex-col sm:flex-row justify-center">
          <div className="flex flex-col justify-center items-center sm:w-1/2 px-4">
            <div className="w-full sm:max-w-md flex flex-col">
              <div className="mb-8 text-start">
                <p className="text-2xl sm:text-3xl font-bold text-white mb-1">
                  Welcome Back
                </p>
                <img
                  src={curlyWave}
                  className="w-24 sm:w-32"
                  alt="Curly wave"
                />
                <p className="text-red-500 font-bold">{errmsg}</p>
              </div>
              <p className="text-gray-500 text-xs sm:text-sm my-4 sm:my-7">
                Welcome back! Please enter your details.
              </p>
              {location.state && (
                <p className="text-green-500 font-bold mb-2">
                  {location.state.reg}
                </p>
              )}
              <form onSubmit={LoginUser} className="w-full">
                <div className="w-full">
                  <label
                    className="text-white text-xs sm:text-sm"
                    htmlFor="email"
                  >
                    Email
                  </label>
                  <input
                    required
                    name="email"
                    className="bg-black border border-gray-800 text-gray-400 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white  my-2"
                    type="text"
                    placeholder="Email Address"
                  />
                  <div className="relative">
                    <label
                      className="text-white text-xs sm:text-sm"
                      htmlFor="password"
                    >
                      Password
                    </label>
                    <input
                      required
                      name="password"
                      className="bg-black border border-gray-800 text-gray-400 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white my-2"
                      type={viewPassword ? "text" : "password"}
                      placeholder="Password"
                    />
                    <div
                      onClick={() => setViewPassword(!viewPassword)}
                      className="absolute inset-y-0 right-0 top-8 pr-3 flex items-center cursor-pointer"
                    >
                      <i
                        className={`fa-regular ${
                          viewPassword ? "fa-eye" : "fa-eye-slash"
                        } text-gray-500 text-lg`}
                      ></i>
                    </div>
                  </div>
                </div>
                <div className="flex">
                  <p className="text-white text-sm">New Vendor...?</p>{" "}
                  <p
                    onClick={() => navigate("/register")}
                    className="text-yellow-400 ml-3 text-sm cursor-pointer"
                  >
                    Register
                  </p>
                </div>
                <div className="text-center w-full">
                  <button
                    className="mt-4 relative w-full h-10 bg-[#FFDD11] hover:bg-blue-700 rounded-lg text-black font-semibold text-xs sm:text-sm tracking-wider"
                    type="submit"
                  >
                    Sign in{" "}
                    {isLoading ? (
                      <img
                        src="/loadinggif1.gif"
                        className="w-5 absolute right-3 bottom-2"
                        alt=""
                      />
                    ) : (
                      ""
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
          <div className="hidden sm:flex w-full sm:max-w-md justify-center items-center">
            <img
              src={loginFrame}
              alt="Login Frame"
              className="max-w-xs sm:max-w-sm"
            />
          </div>
        </div>
      </section>
      {isLoading ? (
        <div className="absolute inset-0 flex justify-center items-center bg-black bg-opacity-50">
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
    </div>
  );
};

export default LoginIn;
