import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "./datepicker.css";
function Datepicker({ fn }) {
  const [startDate, setStartDate] = useState(new Date());
  return (
    <div
      className="w-36 bg-subContainerColor rounded-3xl flex items-center overflow-hidden p-2 pl-0.5 pr-0"
      style={{ backgroundColor: "rgba(244, 245, 250, 1)" }}
    >
      <div className=" mr-2 ml-2">
        <svg
          width="14"
          height="14"
          viewBox="0 0 14 14"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M11.6667 1.55556H12.4483C13.3053 1.55556 14 2.25129 14 3.10649V12.4491C14 13.3056 13.3057 14 12.4483 14H1.55174C0.694735 14 0 13.3043 0 12.4491V3.10649C0 2.24993 0.694262 1.55556 1.55174 1.55556H2.33333V0.381483C2.33333 0.170796 2.51373 0 2.72222 0C2.937 0 3.11111 0.167267 3.11111 0.381483V1.55556H10.8889V0.381483C10.8889 0.170796 11.0693 0 11.2778 0C11.4926 0 11.6667 0.167267 11.6667 0.381483V1.55556ZM11.6667 2.33333V2.72963C11.6667 2.94032 11.4863 3.11111 11.2778 3.11111C11.063 3.11111 10.8889 2.94384 10.8889 2.72963V2.33333H3.11111V2.72963C3.11111 2.94032 2.93072 3.11111 2.72222 3.11111C2.50744 3.11111 2.33333 2.94384 2.33333 2.72963V2.33333H1.55174C1.12393 2.33333 0.777778 2.67938 0.777778 3.10649V12.4491C0.777778 12.8752 1.12477 13.2222 1.55174 13.2222H12.4483C12.8761 13.2222 13.2222 12.8762 13.2222 12.4491V3.10649C13.2222 2.68036 12.8752 2.33333 12.4483 2.33333H11.6667ZM0.777778 3.88889H13.2222V4.66667H0.777778V3.88889ZM10.1111 6.61475C10.1111 6.39796 10.2776 6.22222 10.5036 6.22222H11.2741C11.4909 6.22222 11.6667 6.38869 11.6667 6.61475V7.38525C11.6667 7.60204 11.5002 7.77778 11.2741 7.77778H10.5036C10.2869 7.77778 10.1111 7.61131 10.1111 7.38525V6.61475ZM6.22222 6.61475C6.22222 6.39796 6.38869 6.22222 6.61475 6.22222H7.38525C7.60204 6.22222 7.77778 6.38869 7.77778 6.61475V7.38525C7.77778 7.60204 7.61131 7.77778 7.38525 7.77778H6.61475C6.39796 7.77778 6.22222 7.61131 6.22222 7.38525V6.61475ZM2.33333 6.61475C2.33333 6.39796 2.4998 6.22222 2.72587 6.22222H3.49636C3.71315 6.22222 3.88889 6.38869 3.88889 6.61475V7.38525C3.88889 7.60204 3.72242 7.77778 3.49636 7.77778H2.72587C2.50908 7.77778 2.33333 7.61131 2.33333 7.38525V6.61475ZM2.33333 10.5036C2.33333 10.2869 2.4998 10.1111 2.72587 10.1111H3.49636C3.71315 10.1111 3.88889 10.2776 3.88889 10.5036V11.2741C3.88889 11.4909 3.72242 11.6667 3.49636 11.6667H2.72587C2.50908 11.6667 2.33333 11.5002 2.33333 11.2741V10.5036ZM6.22222 10.5036C6.22222 10.2869 6.38869 10.1111 6.61475 10.1111H7.38525C7.60204 10.1111 7.77778 10.2776 7.77778 10.5036V11.2741C7.77778 11.4909 7.61131 11.6667 7.38525 11.6667H6.61475C6.39796 11.6667 6.22222 11.5002 6.22222 11.2741V10.5036ZM10.1111 10.5036C10.1111 10.2869 10.2776 10.1111 10.5036 10.1111H11.2741C11.4909 10.1111 11.6667 10.2776 11.6667 10.5036V11.2741C11.6667 11.4909 11.5002 11.6667 11.2741 11.6667H10.5036C10.2869 11.6667 10.1111 11.5002 10.1111 11.2741V10.5036Z"
            fill="black"
            fill-opacity="0.4"
          />
        </svg>
      </div>
      <DatePicker
        className="custom-datepicker"
        selected={startDate}
        onChange={(date) => {
          setStartDate(date);
          fn(new Date(date).toISOString());
        }}
      />
    </div>
  );
}

export default Datepicker;


