import React, { useState, useEffect } from "react";
import { VectorMap } from "@react-jvectormap/core";
import { worldMill } from "@react-jvectormap/world";
import ReactCountryFlag from "react-country-flag";
import { useDispatch } from "react-redux";
import VendorCard from "../../../Components/Card/VendorCard";
import LineAreaChart from "../../../Components/Lineareachart/LineAreaChart";
import {
  getVendorStats,
  getvendorTopSellingProducts,
  vendorCostomersDemoGraph,
} from "../../../Api/VendorApi";
import { countryAlpha2List } from "../../../Utils/utils";
import Datepicker from "../../../Components/Lineareachart/Datepicker";
import { colorScale1 } from "../../../Utils/data";
import { colorScale2 } from "../../../Utils/data";

const VentorDashboard = () => {
  const dispatch = useDispatch();
  const [data5, setData] = useState({});
  const [vendorTable, setVendorTable] = useState([]);
  const [Currency, setCurrency] = useState();
  const [viewed, setViewed] = useState([]);
  const [Selled, setSelled] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    vendorStats();
    vendorTableData(new Date().toISOString());
    customerData();
  }, []);
  const customerData = async () => {
    try {
      // dispatch(loadSpinner());
      const res = await vendorCostomersDemoGraph();
      console.log("res", res?.data?.topViewedCountries);
      console.log("res", res?.data?.topSalesCountries);
      setViewed(res?.data?.topViewedCountries);
      setSelled(res?.data?.topSalesCountries);
      // dispatch(loadSpinner());
    } catch (error) {
      console.log(error);
      // dispatch(loadSpinner());
    }
  };
  const countryCodeMap = countryAlpha2List?.reduce((acc, country) => {
    acc[country.name] = country.code;
    return acc;
  }, {});

  const customerViewed = viewed?.reduce((acc, item) => {
    const countryCode = countryCodeMap[item.country];
    console.log("countryCode", countryCode, item.country);
    if (countryCode) {
      acc[countryCode] = item.views;
    } else {
      console.warn(`No code found for country: ${item.country}`);
    }
    return acc;
  }, {});

  const customerSelled = Selled?.reduce((acc, item) => {
    const countryCode = countryCodeMap[item.country];
    console.log("countryCode", countryCode, item.country);
    if (countryCode) {
      acc[countryCode] = item.sales;
    } else {
      console.warn(`No code found for country: ${item.country}`);
    }
    return acc;
  }, {});
  console.log("customerSelled", customerSelled);
  console.log("customerViewed", customerViewed);
  useEffect(() => {
    setLoading(true);
    vendorStats();
    vendorTableData(new Date().toISOString());
  }, []);
  const vendorStats = async () => {
    try {
      const res = await getVendorStats();
      console.log("res", res.data);
      setData(res.data);
      setCurrency(res.data.currency);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  const vendorTableData = async (date) => {
    try {
      const res = await getvendorTopSellingProducts(date);
      setVendorTable(res.data.topProducts);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  // const datachart = {
  //   labels: ["January", "February", "March", "April", "May", "June", "July"],
  //   values: [65, 59, 80, 81, 56, 55, 40],
  // };
  return (
    <div>
      <>
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          <VendorCard
            color={"rgba(240, 251, 235, 1)"}
            icon={
              <svg
                width="20"
                height="18"
                viewBox="0 0 20 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g opacity="0.6">
                  <path
                    d="M0.3 16.2668H18.2839V17.1012H0.3V16.2668Z"
                    stroke="black"
                    stroke-width="0.6"
                  />
                  <path
                    d="M17.5598 15.7114V15.7092L19.4971 16.6778C19.2711 16.7907 18.9952 16.9287 18.7126 17.07C18.2972 17.2777 17.8673 17.4927 17.5598 17.6464V17.6445V17.6409V17.6372V17.6335V17.6298V17.6261V17.6223V17.6186V17.6149V17.6111V17.6074V17.6036V17.5998V17.596V17.5922V17.5884V17.5846V17.5807V17.5769V17.5731V17.5692V17.5653V17.5615V17.5576V17.5537V17.5498V17.5459V17.542V17.538V17.5341V17.5301V17.5262V17.5222V17.5183V17.5143V17.5103V17.5063V17.5023V17.4983V17.4942V17.4902V17.4862V17.4821V17.4781V17.474V17.4699V17.4659V17.4618V17.4577V17.4536V17.4495V17.4454V17.4412V17.4371V17.433V17.4288V17.4247V17.4205V17.4163V17.4121V17.408V17.4038V17.3996V17.3954V17.3911V17.3869V17.3827V17.3785V17.3742V17.37V17.3657V17.3614V17.3572V17.3529V17.3486V17.3443V17.34V17.3357V17.3314V17.3271V17.3228V17.3185V17.3141V17.3098V17.3054V17.3011V17.2967V17.2924V17.288V17.2836V17.2792V17.2748V17.2704V17.266V17.2616V17.2572V17.2528V17.2484V17.2439V17.2395V17.2351V17.2306V17.2262V17.2217V17.2172V17.2128V17.2083V17.2038V17.1993V17.1949V17.1904V17.1859V17.1814V17.1768V17.1723V17.1678V17.1633V17.1588V17.1542V17.1497V17.1452V17.1406V17.1361V17.1315V17.1269V17.1224V17.1178V17.1132V17.1087V17.1041V17.0995V17.0949V17.0903V17.0857V17.0811V17.0765V17.0719V17.0673V17.0627V17.0581V17.0534V17.0488V17.0442V17.0395V17.0349V17.0303V17.0256V17.021V17.0163V17.0117V17.007V17.0023V16.9977V16.993V16.9883V16.9837V16.979V16.9743V16.9696V16.965V16.9603V16.9556V16.9509V16.9462V16.9415V16.9368V16.9321V16.9274V16.9227V16.918V16.9132V16.9085V16.9038V16.8991V16.8944V16.8896V16.8849V16.8802V16.8755V16.8707V16.866V16.8613V16.8565V16.8518V16.8471V16.8423V16.8376V16.8328V16.8281V16.8233V16.8186V16.8138V16.8091V16.8043V16.7996V16.7948V16.7901V16.7853V16.7805V16.7758V16.771V16.7663V16.7615V16.7567V16.752V16.7472V16.7424V16.7377V16.7329V16.7281V16.7234V16.7186V16.7138V16.7091V16.7043V16.6995V16.6948V16.69V16.6852V16.6804V16.6757V16.6709V16.6661V16.6614V16.6566V16.6518V16.6471V16.6423V16.6375V16.6328V16.628V16.6232V16.6185V16.6137V16.6089V16.6042V16.5994V16.5946V16.5899V16.5851V16.5803V16.5756V16.5708V16.5661V16.5613V16.5566V16.5518V16.5471V16.5423V16.5375V16.5328V16.5281V16.5233V16.5186V16.5138V16.5091V16.5043V16.4996V16.4949V16.4901V16.4854V16.4807V16.4759V16.4712V16.4665V16.4617V16.457V16.4523V16.4476V16.4429V16.4382V16.4335V16.4287V16.424V16.4193V16.4146V16.4099V16.4052V16.4005V16.3959V16.3912V16.3865V16.3818V16.3771V16.3724V16.3678V16.3631V16.3584V16.3538V16.3491V16.3444V16.3398V16.3351V16.3305V16.3258V16.3212V16.3166V16.3119V16.3073V16.3027V16.298V16.2934V16.2888V16.2842V16.2796V16.275V16.2704V16.2658V16.2612V16.2566V16.252V16.2474V16.2429V16.2383V16.2337V16.2292V16.2246V16.22V16.2155V16.2109V16.2064V16.2019V16.1973V16.1928V16.1883V16.1838V16.1792V16.1747V16.1702V16.1657V16.1612V16.1567V16.1523V16.1478V16.1433V16.1388V16.1344V16.1299V16.1255V16.121V16.1166V16.1121V16.1077V16.1033V16.0989V16.0945V16.09V16.0856V16.0812V16.0769V16.0725V16.0681V16.0637V16.0594V16.055V16.0506V16.0463V16.0419V16.0376V16.0333V16.029V16.0246V16.0203V16.016V16.0117V16.0074V16.0032V15.9989V15.9946V15.9903V15.9861V15.9818V15.9776V15.9734V15.9691V15.9649V15.9607V15.9565V15.9523V15.9481V15.9439V15.9397V15.9355V15.9314V15.9272V15.9231V15.9189V15.9148V15.9107V15.9066V15.9024V15.8983V15.8942V15.8902V15.8861V15.882V15.8779V15.8739V15.8698V15.8658V15.8618V15.8577V15.8537V15.8497V15.8457V15.8417V15.8378V15.8338V15.8298V15.8259V15.8219V15.818V15.814V15.8101V15.8062V15.8023V15.7984V15.7945V15.7907V15.7868V15.7829V15.7791V15.7752V15.7714V15.7676V15.7638V15.76V15.7562V15.7524V15.7486V15.7449V15.7411V15.7374V15.7336V15.7299V15.7262V15.7225V15.7188V15.7151V15.7114Z"
                    stroke="black"
                    stroke-width="0.6"
                  />
                  <path
                    d="M2.13203 3.39682C2.13203 3.28078 2.22627 3.18672 2.3419 3.18672H3.87197C3.98761 3.18672 4.08185 3.28078 4.08185 3.39682V15.0734C4.08185 15.1893 3.98753 15.2835 3.87197 15.2835H2.3419C2.22635 15.2835 2.13203 15.1893 2.13203 15.0734V3.39682Z"
                    stroke="black"
                    stroke-width="0.6"
                  />
                  <path
                    d="M13.7141 6.47667C13.7141 6.36095 13.8082 6.2668 13.9239 6.2668H15.454C15.5697 6.2668 15.6639 6.36095 15.6639 6.47667V15.0722C15.6639 15.1881 15.5696 15.2823 15.454 15.2823H13.9239C13.8084 15.2823 13.7141 15.1881 13.7141 15.0722V6.47667Z"
                    stroke="black"
                    stroke-width="0.6"
                  />
                  <path
                    d="M9.85469 4.99057C9.85469 4.87476 9.94892 4.78047 10.0648 4.78047H11.5946C11.7105 4.78047 11.8047 4.87476 11.8047 4.99057V15.0735C11.8047 15.1893 11.7105 15.2836 11.5946 15.2836H10.0648C9.94892 15.2836 9.85469 15.1893 9.85469 15.0735V4.99057Z"
                    stroke="black"
                    stroke-width="0.6"
                  />
                  <path
                    d="M5.99531 0.510096C5.99531 0.394202 6.08963 0.3 6.20519 0.3H7.73525C7.85098 0.3 7.94535 0.394372 7.94535 0.510096V15.0731C7.94535 15.1888 7.85098 15.2832 7.73525 15.2832H6.20519C6.08963 15.2832 5.99531 15.189 5.99531 15.0731V0.510096Z"
                    stroke="black"
                    stroke-width="0.6"
                  />
                </g>
              </svg>
            }
            data={{ price: `${Currency} ${data5?.totalSale?.toFixed(1)}` }}
            text={"Total Sale"}
          />
          <VendorCard
            color={"rgba(255, 211, 208, 1)"}
            icon={
              <svg
                width="24"
                height="28"
                viewBox="0 0 24 28"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M8.09079 10.6312L18.5989 4.14101L23.1519 6.52157L12.2868 13.0234L8.09079 10.6312ZM11.7121 0.541559L16.3789 2.98099L5.95958 9.41616L0.8464 6.50088L11.7121 0.541559ZM11.5627 0.463498L11.5646 0.46448L11.5627 0.463498ZM11.2214 14.7429V27.0824L0.5 20.9857V8.71145L5.36718 11.4499V14.7885C5.36718 15.3779 5.84147 15.8665 6.43907 15.8665C7.03607 15.8665 7.50963 15.3772 7.50963 14.7885V12.6552L11.2214 14.7429ZM23.5 8.73905V20.4151L13.3636 27.0733V14.8152L23.5 8.73905Z"
                  stroke="black"
                />
              </svg>
            }
            text={"Total Orders"}
            data={{ price: data5?.totalOrders }}
          />
          <VendorCard
            color={"rgba(209, 216, 255, 1)"}
            icon={
              <svg
                width="29"
                height="25"
                viewBox="0 0 29 25"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9.19937 12.0101C11.2597 12.0101 12.93 10.3398 12.93 8.27945C12.93 6.21908 11.2597 4.54883 9.19937 4.54883C7.13901 4.54883 5.46875 6.21908 5.46875 8.27945C5.46875 10.3398 7.13901 12.0101 9.19937 12.0101Z"
                  stroke="#3C3939"
                  stroke-width="1.4"
                  stroke-miterlimit="10"
                  stroke-linecap="square"
                />
                <path
                  d="M9.20737 15.7383C7.03064 15.7383 4.94306 16.603 3.40388 18.1422C1.8647 19.6813 1 21.7689 1 23.9457H17.4147C17.4147 21.7689 16.55 19.6813 15.0109 18.1422C13.4717 16.603 11.3841 15.7383 9.20737 15.7383Z"
                  stroke="#3C3939"
                  stroke-width="1.4"
                  stroke-miterlimit="10"
                  stroke-linecap="square"
                />
                <path
                  d="M20.4103 7.52954C22.0586 7.52954 23.3948 6.19334 23.3948 4.54504C23.3948 2.89675 22.0586 1.56055 20.4103 1.56055C18.762 1.56055 17.4258 2.89675 17.4258 4.54504C17.4258 6.19334 18.762 7.52954 20.4103 7.52954Z"
                  stroke="#3C3939"
                  stroke-width="1.4"
                  stroke-miterlimit="10"
                  stroke-linecap="square"
                />
                <path
                  d="M20.4103 18.723H27.8716C27.8716 17.3373 27.4857 15.9791 26.7573 14.8004C26.0288 13.6217 24.9865 12.6691 23.7471 12.0494C22.5078 11.4297 21.1203 11.1674 19.7403 11.2919C18.3602 11.4163 17.0421 11.9226 15.9336 12.754"
                  stroke="#3C3939"
                  stroke-width="1.4"
                  stroke-miterlimit="10"
                  stroke-linecap="square"
                />
              </svg>
            }
            text={"Total Customers"}
            data={{ price: data5?.totalCustomers }}
          />
          <VendorCard
            color={"rgba(255, 231, 193, 1)"}
            icon={
              <svg
                width="32"
                height="31"
                viewBox="0 0 32 31"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M24.0859 1.5V7.25"
                  stroke="black"
                  stroke-opacity="0.6"
                  stroke-width="1.4"
                  stroke-miterlimit="10"
                  stroke-linecap="square"
                />
                <path
                  d="M28.4062 13.9583V10.6042L24.0937 7.25L19.7812 10.6042V13.9583"
                  stroke="black"
                  stroke-opacity="0.6"
                  stroke-width="1.4"
                  stroke-miterlimit="10"
                  stroke-linecap="square"
                />
                <path
                  d="M19.7812 26.418V17.793H28.4062V26.418"
                  stroke="black"
                  stroke-opacity="0.6"
                  stroke-width="1.4"
                  stroke-miterlimit="10"
                  stroke-linecap="square"
                />
                <path
                  d="M3.48828 26.4154V13.957H15.9466V26.4154"
                  stroke="black"
                  stroke-opacity="0.6"
                  stroke-width="1.4"
                  stroke-miterlimit="10"
                  stroke-linecap="square"
                />
                <path
                  d="M7.80469 17.793H11.638"
                  stroke="black"
                  stroke-opacity="0.6"
                  stroke-width="1.4"
                  stroke-miterlimit="10"
                  stroke-linecap="square"
                />
                <path
                  d="M23.1328 20.666H25.0495"
                  stroke="black"
                  stroke-opacity="0.6"
                  stroke-width="1.4"
                  stroke-miterlimit="10"
                  stroke-linecap="square"
                />
                <path
                  d="M28.4036 26.418H3.48698C2.42843 26.418 1.57031 27.2761 1.57031 28.3346C1.57031 29.3932 2.42843 30.2513 3.48698 30.2513H28.4036C29.4622 30.2513 30.3203 29.3932 30.3203 28.3346C30.3203 27.2761 29.4622 26.418 28.4036 26.418Z"
                  stroke="black"
                  stroke-opacity="0.6"
                  stroke-width="1.4"
                  stroke-miterlimit="10"
                  stroke-linecap="square"
                />
              </svg>
            }
            text={"Total Product"}
            data={{ price: data5?.totalProducts }}
          />
        </div>
        {/* graph data */}
        <div className="flex md:flex-row flex-col mt-10 gap-3 ">
          <div className="bg-containerWhite w-full md:w-[60%] max-h-[550px] p-4 rounded-lg shadow-sm">
            <LineAreaChart />
          </div>
          <div
            className="bg-containerWhite max-h-[550px] overflow-hidden overflow-y-auto  w-full md:w-[40%] p-4 rounded-lg shadow-sm"
            style={{ scrollbarWidth: "none" }}
          >
            <h1 className="font-semibold text-2xl mt-1 text-textColor">
              Customers Demographic
            </h1>
            <h3 className=" text-textColor mb-5">
              Number of customers based on country
            </h3>
            <div
              className="rounded-xl overflow-hidden"
              style={{ width: "100%", height: "350px" }}
            >
              <VectorMap
                map={worldMill}
                backgroundColor="rgba(29, 29, 31, 1)"
                zoomOnScroll={false}
                containerStyle={{ width: "100%", height: "100%" }}
                containerClassName="map"
                series={{
                  regions: [
                    {
                      scale: colorScale1, // Assign the first color in colorScale to viewed data
                      // Assign the second color in colorScale to selled da
                      values: customerViewed,
                      attribute: "fill",
                    },
                    {
                      scale: colorScale2, // Assign the first color in colorScale to viewed data
                      // Assign the second color in colorScale to selled data

                      values: customerSelled,
                      attribute: "fill",
                    }, // Additional region for default gray color
                  ],
                }}
                regionStyle={{
                  initial: {
                    fill: "#CCCCCC", // Set default fill color to gray
                  },
                }}
                // topViewedCountry={topViewedCountry}
                // topSelledCountry={topSelledCountry}
              />
            </div>
            {/* top seeled cont */}
            <h1 className="text-md ">Top Selled Country</h1>
            {Selled.length > 0 &&
              Selled.map((country, index) => {
                const countryCode = countryCodeMap[country.country.trim()];
                return (
                  <div className="mt-4">
                    <div className="flex justify-between items-center mt-2">
                      <div className="flex gap-2 items-center">
                        <div className="rounded-full w-16 h-16 overflow-x-hidden">
                          <img src={country?.flag} className="mt-4" alt="" />
                        </div>
                        <div className="text-sm">
                          <h1>{country?.country}</h1>
                          <p className="text-gray-500 text-sm">
                            {country.sales} Views
                          </p>
                        </div>
                      </div>
                      <div
                        className="rounded-lg w-7 h-7"
                        style={{ backgroundColor: "#BE0A33" }}
                      ></div>
                    </div>
                  </div>
                );
              })}

            {/* top seeled cont */}
            {/* most viewed */}

            {viewed.length > 0 &&
              viewed.map((country, index) => {
                const countryCode = countryCodeMap[country.country.trim()];
                console.log("countryCode", countryCode, country);
                return (
                  <div className="mt-4">
                    <h1 className="text-md ">Most viewed Country</h1>
                    <div className="flex justify-between items-center mt-2">
                      <div className="flex gap-2 items-center">
                        <div className="rounded-full w-16 h-16 overflow-x-hidden">
                          <ReactCountryFlag
                            countryCode={countryCode}
                            svg
                            style={{
                              width: "4em",
                              height: "4em",
                            }}
                            title={country[index]}
                          />
                        </div>
                        <div className="text-sm">
                          <h1>{country.country}</h1>
                          <p className="text-gray-500 text-sm">
                            {country.views} Views
                          </p>
                        </div>
                      </div>
                      <div
                        className="rounded-lg w-7 h-7"
                        style={{ backgroundColor: "#002654" }}
                      ></div>
                    </div>
                  </div>
                );
              })}
            {/* most viewed */}
          </div>
        </div>
        {/* graph data */}
        {/* table data */}
        <div className="flex md:flex-row flex-col mt-10 gap-3 ">
          <div
            style={{ scrollbarWidth: "none" }}
            className="bg-containerWhite w-full md:w-[60%] h-[350px] overflow-hidden overflow-y-auto p-5 rounded-lg shadow-sm"
          >
            <div className="flex justify-between">
              <h1 className="font-bold text-textColor">Top Selling Products</h1>
              <Datepicker fn={vendorTableData} />
            </div>
            <table className="mt-2  w-full">
              <thead className="text-textColor">
                <tr className="h-12 font-bold bg-subContainerColor">
                  <td>
                    <div className="flex gap-1">
                      <img src="/Vectortable.png" className="w-5" alt="" />
                      <p>Product</p>
                    </div>
                  </td>
                  <td>
                    <div className="flex gap-4 items-center justify-center">
                      <img src="/Grouptable.png" className="w-5" alt="" />
                      <p>Status</p>
                    </div>
                  </td>
                  <td>
                    <div className="flex gap-4 items-center justify-center">
                      <img src="/Vectortabletable.png" className="w-5" alt="" />
                      <p>Sales</p>
                    </div>
                  </td>
                  <td>
                    <div className="flex gap-4 items-center justify-center">
                      <img src="/Vector (5)table.png" className="w-5" alt="" />
                      <p>Earning</p>
                    </div>
                  </td>
                </tr>
              </thead>
              {/* table body */}
              <tbody>
                {vendorTable.length > 0 ? (
                  vendorTable?.map((data) => (
                    <tr className="">
                      <td className="" style={{ maxWidth: "100px" }}>
                        <div className="flex items-center gap-2">
                          <div className="w-16 h-16 shadow-md p-1 rounded-xl bg-containerWhite flex items-center justify-center">
                            {" "}
                            <img src="/imgtable.png" alt="" />
                          </div>
                          <p className="overflow-wrap break-word max-w-40">
                            {data.productName}
                          </p>
                        </div>
                      </td>
                      <td className="justify-center items-center">
                        <div className="flex justify-center">
                          <div
                            className="rounded-xl flex justify-center  p-1 px-4"
                            style={{
                              backgroundColor: "rgba(233, 255, 229, 1)",
                            }}
                          >
                            {data.status == "active" ? "Live" : "Banned"}
                          </div>
                        </div>
                      </td>
                      <td className="text-center">{data.sales}</td>
                      <td className="text-center">$ {data.earnings}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4} className="text-center text-red-700 pt-2">
                      No Product Data Found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          {/* <div className="bg-containerWhite flex justify-center items-center w-full md:w-[40%] p-4 rounded-lg shadow-sm">
            <CustomSpeedometer value={80} />
          </div> */}
        </div>
        {/* table data */}
      </>
    </div>
  );
};

export default VentorDashboard;
