import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ClipLoader,
  HashLoader,
  ClimbingBoxLoader,
  BarLoader,
  PuffLoader,
} from "react-spinners";

const ProcessingPage = () => {
  const navigate = useNavigate();
  const [color, setColor] = useState("#ffdd11");

  return (
    <div
      className="w-full h-screen"
      style={{
        backgroundImage: "linear-gradient( to bottom, #302b0e, #000000)",
      }}
    >
      <div className="flex items-center justify-center h-full ">
        <div className="bg-black rounded-lg p-20 flex flex-col items-center justify-center border">
          <PuffLoader
            color={color}
            // loading={spinnerLoader}
            // cssOverride={override}
            size={100}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
          <p className="text-xl font-bold mt-4 text-white">Please wait ...</p>
          <p className="text-sm mt-2 text-center text-gray-300">
            Your information will be reflected in a moment
          </p>
          <p
            onClick={() => navigate("/login")}
            className="cursor-pointer hover:text-subColor text-navblue"
          >
            Back to login
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProcessingPage;
