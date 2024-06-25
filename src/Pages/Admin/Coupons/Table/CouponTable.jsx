import { ThemeProvider } from "@emotion/react";
import React from "react";
import theme from "../../../member/theme";
import { Pagination } from "@mui/material";

const CouponTable = () => {
  return (
    <div class="relative overflow-x-auto shadow-md sm:rounded-lg bg-[#0A0A0B]">
      <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 ">
        <thead class="text-xs text-gray-400  ">
          <tr>
            <th scope="col" class="px-6 py-3">
              Coupon name
            </th>
            <th scope="col" class="px-6 py-3">
              Min Price
            </th>
            <th scope="col" class="px-6 py-3">
              Discount
            </th>
            <th scope="col" class="px-6 py-3">
              Discount type
            </th>
            <th scope="col" class="px-6 py-3">
              <span class="">Start date</span>
            </th>
            <th scope="col" class="px-6 py-3">
              <span class="">End date</span>
            </th>
            <th scope="col" class="px-6 py-3">
              <span class="">Max per user</span>
            </th>
            <th scope="col" class="px-6 py-3">
              <span class="">Status</span>
            </th>
            <th scope="col" class="px-6 py-3">
              <span class="">Action</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: 5 }).map((_, i) => (
            <tr class="border-b dark:border-gray-700 bg-[#0A0A0B]">
              <th
                scope="row"
                class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                <div className="flex items-center ">
                  <div className="w-12 h-12 bg-orange-600 rounded-full">
                    <img src="" alt="" />
                  </div>
                  <div className="ml-4">
                    <p>John Doe</p>
                  </div>
                </div>
              </th>
              <td class="px-6 py-4">Silver</td>
              <td class="px-6 py-4">Laptop</td>
              <td class="px-6 py-4">Silver</td>
              <td class="px-6 py-4">Laptop</td>
              <td class="px-6 py-4">Silver</td>
              <td class="px-6 py-4">Laptop</td>
              <td class="px-6 py-4 ">$2999</td>
              <td class="px-6 py-4 text-left">
                <div className="bg-[#1F222A] flex justify-evenly rounded-lg h-8 border">
                  <button className="border-e px-1">
                    <svg
                      width="15"
                      height="14"
                      viewBox="0 0 15 14"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g opacity="0.6">
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M8.06535 8.15755L6.05469 8.44518L6.34177 6.43397L11.5125 1.26322C11.9885 0.787261 12.7602 0.787261 13.2361 1.26322C13.7121 1.73917 13.7121 2.51084 13.2361 2.9868L8.06535 8.15755Z"
                          stroke="#6F757E"
                          stroke-width="0.918314"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M10.9375 1.83594L12.6611 3.55952"
                          stroke="#6F757E"
                          stroke-width="0.918314"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M11.1562 8.21875V12.2812C11.1562 12.73 10.7925 13.0938 10.3438 13.0938H2.21875C1.77002 13.0938 1.40625 12.73 1.40625 12.2812V4.15625C1.40625 3.70752 1.77002 3.34375 2.21875 3.34375H6.28125"
                          stroke="#6F757E"
                          stroke-width="0.918314"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </g>
                    </svg>
                  </button>
                  <button>
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
          ))}
        </tbody>
      </table>
      <div className=" p-3 sm:flex sm:justify-center items-center lg:justify-between ">
        <div className="mb-3 sm:mb-0 flex justify-center">
          <p className="text-gray-600">
            Showing {1} of {2} pages
          </p>
        </div>
        <div className="flex justify-center">
          <ThemeProvider theme={theme}>
            <Pagination count={2} />
          </ThemeProvider>
        </div>
      </div>
    </div>
  );
};

export default CouponTable;
