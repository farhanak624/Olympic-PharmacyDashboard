import React from "react";

import PercentageBar from "./PercentageBar";
import { ThemeProvider } from "@emotion/react";
import { Pagination } from "@mui/material";
import ComenShadow from "../../../../../components/comenShadow/ComenShadow";
import theme from "../../../../Admin/member/theme";

function PharmaReviews() {
  return (
    <div className="text-white">
      <ComenShadow />
      <h1 className="font-semibold text-xl">Reviews</h1>
      <div className="w-full flex-col flex md:flex-row gap-5 mt-8">
        <div className="p-4 bg-[#151515] w-full md:w-[40%] md:max-w[300px] rounded-lg">
          <div className="flex gap-2 items-center">
            <svg
              width="28"
              height="28"
              viewBox="0 0 28 28"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M14 28C21.732 28 28 21.732 28 14C28 6.26801 21.732 0 14 0C6.26801 0 0 6.26801 0 14C0 21.732 6.26801 28 14 28Z"
                fill="#34A4E3"
              />
              <path
                d="M14.0009 5.44531L16.649 10.6937L22.5564 11.5574L18.2786 15.6099L19.2972 21.3898L14.0009 18.6659L8.70457 21.3898L9.72309 15.6099L5.44531 11.5574L11.3527 10.6937L14.0009 5.44531Z"
                fill="white"
              />
            </svg>
            Overall Ratings
          </div>
          <div className="flex items-center justify-center mt-4">
            <h1 className="font-semibold text-3xl" style={{ fontSize: "45px" }}>
              4.5<span className="text-[#858D9D]">/5</span>{" "}
            </h1>
          </div>
          <div className="flex items-center justify-center gap-2 mt-2">
            <img src="/ratingStar.png" alt="" className="w-4" />
            <img src="/ratingStar.png" alt="" className="w-4" />
            <img src="/ratingStar.png" alt="" className="w-4" />
            <img src="/ratingStar.png" alt="" className="w-4" />
            <img src="/ratingStar.png" alt="" className="w-4" />
          </div>
          <div className="flex items-center justify-center gap-2 mt-3 text-xs text-[#858D9D]">
            200 Ratings
          </div>
        </div>
        <div className="p-4 bg-[#151515] w-full rounded-lg">
          <div className="flex gap-2 items-center mb-4">
            <svg
              width="28"
              height="28"
              viewBox="0 0 28 28"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M14 28C21.732 28 28 21.732 28 14C28 6.26801 21.732 0 14 0C6.26801 0 0 6.26801 0 14C0 21.732 6.26801 28 14 28Z"
                fill="#34C727"
              />
              <path
                d="M14.0009 5.44141L16.649 10.6898L22.5564 11.5534L18.2786 15.606L19.2972 21.3859L14.0009 18.662L8.70457 21.3859L9.72309 15.606L5.44531 11.5534L11.3527 10.6898L14.0009 5.44141Z"
                fill="white"
              />
            </svg>
            Rating Breakdown
          </div>
          {/* 1111111 */}
          <div className="flex gap-1 items-center">
            <div className="w-[33px] flex gap-1 items-center ">
              5 <img src="/ratingStar.png" className="w-4 h-4" alt="" />
            </div>
            <PercentageBar color={"#43A358"} percentage={60} id={"1th"} />
            <div className="w-[30px] text-end flex gap-1 justify-end ">60</div>
          </div>
          {/* 1111111 */}
          {/* 22222222 */}
          <div className="flex gap-1 items-center">
            <div className="w-[33px] flex gap-1 items-center ">
              4 <img src="/ratingStar.png" className="w-4 h-4" alt="" />
            </div>
            <PercentageBar color={"#D1DF33"} percentage={53} id={"2th"} />
            <div className="w-[30px] text-end flex gap-1 justify-end ">53</div>
          </div>
          {/* 22222222 */}
          {/* 3333333 */}
          <div className="flex gap-1 items-center">
            <div className="w-[33px] flex gap-1 items-center ">
              3 <img src="/ratingStar.png" className="w-4 h-4" alt="" />
            </div>
            <PercentageBar color={"#A47600"} percentage={42} id={"3th"} />
            <div className="w-[30px] text-end flex gap-1 justify-end ">42</div>
          </div>
          {/* 3333333 */}
          {/* 44444444444 */}
          <div className="flex gap-1 items-center">
            <div className="w-[33px] flex gap-1 items-center ">
              2 <img src="/ratingStar.png" className="w-4 h-4" alt="" />
            </div>
            <PercentageBar color={"#FF7425"} percentage={35} id={"4th"} />
            <div className="w-[30px] text-end flex gap-1 justify-end ">35</div>
          </div>

          {/* 44444444444 */}
          {/* 55555555 */}
          <div className="flex gap-1 items-center">
            <div className="w-[33px] flex gap-1 items-center ">
              2 <img src="/ratingStar.png" className="w-4 h-4" alt="" />
            </div>
            <PercentageBar color={"#CF1717"} percentage={20} id={"5th"} />
            <div className="w-[30px] text-end flex gap-1 justify-end ">20</div>
          </div>
          {/* 55555555 */}
        </div>
      </div>
      {/* table start */}
      <div
        className="w-full bg-[#0A0A0B] rounded-lg mt-10 overflow-x-auto"
        style={{ scrollbarWidth: "none" }}
      >
        <table className="min-w-[70vh] w-full text-center  leading-normal mt-5">
          <thead className="border-b  border-b-[#3F3F3F]">
            <tr>
              <th className="px-5 py-6   text-sm font-semibold  capitalize tracking-wider">
                Products
              </th>
              <th className="px-5 py-6   text-sm font-semibold  capitalize tracking-wider">
                Customer
              </th>
              {/* <th className="px-5 py-6  text-left text-sm font-semibold  capitalize tracking-wider"></th> */}
              <th className="px-5 py-6   text-sm font-semibold  capitalize tracking-wider">
                Review
              </th>
              <th className="px-5 py-6   text-sm font-semibold  capitalize tracking-wider">
                Date
              </th>

              <th className="px-5 py-6   text-sm font-semibold  capitalize tracking-wider">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="border-b-2  border-b-[#3F3F3F]">
            <tr className="" style={{ height: "50px" }}>
              <td className="px-5 py-3 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 overflow-hidden rounded-full bg-[#1F222A]">
                    <img
                      src="/helmet.png"
                      className="w-10 h-10 rounded-full"
                      alt=""
                    />
                  </div>
                  Amlodipine
                </div>
              </td>
              <td className="px-5 py-3 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 overflow-hidden rounded-full bg-[#1F222A]">
                    <img
                      src="/user.png"
                      className="w-10 h-10 rounded-full"
                      alt=""
                    />
                  </div>
                  Amlodipine
                </div>
              </td>

              <td className="px-5 py-5 text-xs text-[#6F757E]">
                <div className="">
                  <div className="flex items-center justify-start px-3 mb-3 gap-2 mt-2">
                    <img src="/ratingStar.png" alt="" className="w-4" />
                    <img src="/ratingStar.png" alt="" className="w-4" />
                    <img src="/ratingStar.png" alt="" className="w-4" />
                    <img src="/ratingStar.png" alt="" className="w-4" />
                    <img src="/ratingStar.png" alt="" className="w-4" />
                  </div>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text
                </div>
              </td>
              <td className="px-5 py-3 text-sm">57.12</td>

              <td className="px-5 py-3 text-sm">
                <div className="bg-[#1F222A] rounded-md border flex border-[#6F757E]">
                  <button className="flex w-full items-center justify-center   p-1">
                    <svg
                      width="15"
                      height="14"
                      viewBox="0 0 15 14"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M10.9094 13.0156H4.08438C3.5459 13.0156 3.10938 12.5791 3.10938 12.0406V3.26562H11.8844V12.0406C11.8844 12.5791 11.4479 13.0156 10.9094 13.0156Z"
                        stroke="#F85949"
                        stroke-width="0.918314"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M6.03984 10.0875V6.1875"
                        stroke="#F85949"
                        stroke-width="0.918314"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M8.96172 10.0875V6.1875"
                        stroke="#F85949"
                        stroke-width="0.918314"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M1.16406 3.2625H13.8391"
                        stroke="#F85949"
                        stroke-width="0.918314"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M8.9625 1.3125H6.0375C5.49902 1.3125 5.0625 1.74902 5.0625 2.2875V3.2625H9.9375V2.2875C9.9375 1.74902 9.50098 1.3125 8.9625 1.3125Z"
                        stroke="#F85949"
                        stroke-width="0.918314"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </button>
                </div>
              </td>
            </tr>
            <tr className="" style={{ height: "50px" }}>
              <td className="px-5 py-5 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 overflow-hidden rounded-full bg-[#1F222A]">
                    <img
                      src="/helmet.png"
                      className="w-10 h-10 rounded-full"
                      alt=""
                    />
                  </div>
                  Amlodipine
                </div>
              </td>
              <td className="px-5 py-3 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 overflow-hidden rounded-full bg-[#1F222A]">
                    <img
                      src="/user.png"
                      className="w-10 h-10 rounded-full"
                      alt=""
                    />
                  </div>
                  Amlodipine
                </div>
              </td>

              <td className="px-5 py-5 text-xs text-[#6F757E]">
                <div className="">
                  <div className="flex items-center justify-start px-3 mb-3 gap-2 mt-2">
                    <img src="/ratingStar.png" alt="" className="w-4" />
                    <img src="/ratingStar.png" alt="" className="w-4" />
                    <img src="/ratingStar.png" alt="" className="w-4" />
                    <img src="/ratingStar.png" alt="" className="w-4" />
                    <img src="/ratingStar.png" alt="" className="w-4" />
                  </div>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text
                </div>
              </td>
              <td className="px-5 py-5 text-sm">57.12</td>

              <td className="px-5 py-5 text-sm">
                <div className="bg-[#1F222A] rounded-md border flex border-[#6F757E]">
                  <button className="flex w-full items-center justify-center  p-1">
                    <svg
                      width="15"
                      height="14"
                      viewBox="0 0 15 14"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M10.9094 13.0156H4.08438C3.5459 13.0156 3.10938 12.5791 3.10938 12.0406V3.26562H11.8844V12.0406C11.8844 12.5791 11.4479 13.0156 10.9094 13.0156Z"
                        stroke="#F85949"
                        stroke-width="0.918314"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M6.03984 10.0875V6.1875"
                        stroke="#F85949"
                        stroke-width="0.918314"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M8.96172 10.0875V6.1875"
                        stroke="#F85949"
                        stroke-width="0.918314"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M1.16406 3.2625H13.8391"
                        stroke="#F85949"
                        stroke-width="0.918314"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M8.9625 1.3125H6.0375C5.49902 1.3125 5.0625 1.74902 5.0625 2.2875V3.2625H9.9375V2.2875C9.9375 1.74902 9.50098 1.3125 8.9625 1.3125Z"
                        stroke="#F85949"
                        stroke-width="0.918314"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        <div className="w-full flex justify-end px-10 mb-4 mt-8">
          <ThemeProvider theme={theme}>
            <Pagination
              count={2}
              // onChange={handlePageChange}
            />
          </ThemeProvider>
        </div>
      </div>
    </div>
  );
}

export default PharmaReviews;
