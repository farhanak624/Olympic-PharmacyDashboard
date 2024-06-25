import { ThemeProvider } from "@emotion/react";
import React from "react";
import theme from "../../../member/theme";
import { Pagination } from "@mui/material";

const VendorRequestsTable = () => {
  return (
    <div class="relative overflow-x-auto shadow-md sm:rounded-lg bg-[#0A0A0B]">
      <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 ">
        <thead class="text-xs text-gray-700  ">
          <tr>
            <th scope="col" class="px-6 py-3">
              Vendor Name
            </th>
            <th scope="col" class="px-6 py-3">
              Email
            </th>
            <th scope="col" class="px-6 py-3">
              Phone Number
            </th>

            <th scope="col" class="px-6 py-3 text-center">
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
              <td class="px-6 py-4 ">$2999</td>
              <td class="px-6 py-4 text-center">
                <button className="bg-[#008B0E] text-white py-2 px-4 rounded">
                  Approve
                </button>
                <button className="bg-[#DB3022] text-white py-2 px-5 ml-4 rounded">
                  Reject
                </button>
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

export default VendorRequestsTable;
