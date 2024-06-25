import React, { useEffect, useState } from "react";
import Card from "./card/Card";
import ChartComponent from "./linechart/ChartComponent";
import OrderTable from "../Dashboard/OrderTable";
import Loader from "../../../Components/Loader/Loader";

function calculatePercentageChange(returnOrders, prevReturnOrders) {
  if (prevReturnOrders === 0 && returnOrders === 0) {
    return "0";
  } else if (prevReturnOrders === 0) {
    return "100";
  } else {
    return (((returnOrders - prevReturnOrders) * 100) / prevReturnOrders)
      .toFixed(2)
      .replace(/\.?0+$/, "");
  }
}

function AdminOrders() {
  const [selected, setselected] = useState("This Year");
  const [dropdown, setdropdown] = useState(false);
  const [loading, setLoading] = useState(true);

  const [data, setData] = useState({});
  useEffect(() => {
    getOrderStats(selected);
  }, [selected]);

  const getOrderStats = async (selected) => {
    // dispatch(loadSpinner());
    try {
      setLoading(true);
      const res = await getAdminGetStats(selected);
      console.log(res.data);
      setData(res.data);
      //  dispatch(loadSpinner());
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
      // dispatch(loadSpinner());
    }
  };

  return (
    <div className="p-4">
      {/* dashbord card */}
      <div className="flex justify-between text-sm py-5">
        <h1 className="text-xl font-bold">Orders</h1>
        <div
          className="p-1.5 relative flex justify-between min-w-[20%] max-w-[30%] items-center rounded-lg cursor-pointer bg-containerWhite"
          onClick={() => setdropdown(!dropdown)}
        >
          <p className="text-white">{selected}</p>

          <svg
            width="10"
            height="6"
            viewBox="0 0 10 6"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0.375076 1.70711L3.96086 5.29289C4.35139 5.68342 4.98455 5.68342 5.37508 5.29289L8.96086 1.70711C9.59083 1.07714 9.14466 0 8.25376 0H1.08218C0.191278 0 -0.254888 1.07714 0.375076 1.70711Z"
              fill="white"
            />
          </svg>

          {dropdown && (
            <ul className="absolute top-9 w-full bg-subContainerColor text-white rounded-md left-0 z-40 ">
              <li
                className="p-1 flex justify-center hover:bg-gray-700"
                onClick={() => setselected("This Year")}
              >
                This Year
              </li>
              <li
                className="p-1 flex justify-center hover:bg-gray-700"
                onClick={() => setselected("This Month")}
              >
                This Month
              </li>
              <li
                className="p-1 flex justify-center hover:bg-gray-700"
                onClick={() => setselected("This Week")}
              >
                This Week
              </li>
            </ul>
          )}
        </div>
      </div>
      {!loading ? (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
            <Card
              text={"Total Orders"}
              data={{
                totalCount: data.totalOrder,
                persetage:
                  data.prevTotalOrder != 0
                    ? ((data.totalOrder - data.prevTotalOrder) * 100) /
                      data.prevTotalOrder
                    : 100,
              }}
              img={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="28"
                  viewBox="0 0 24 28"
                  fill="none"
                >
                  <path
                    d="M8.09079 10.6312L18.5989 4.14101L23.1519 6.52157L12.2868 13.0234L8.09079 10.6312ZM11.7121 0.541559L16.3789 2.98099L5.95958 9.41616L0.8464 6.50088L11.7121 0.541559ZM11.5627 0.463498L11.5646 0.46448L11.5627 0.463498ZM11.2214 14.7429V27.0824L0.5 20.9857V8.71145L5.36718 11.4499V14.7885C5.36718 15.3779 5.84147 15.8665 6.43907 15.8665C7.03607 15.8665 7.50963 15.3772 7.50963 14.7885V12.6552L11.2214 14.7429ZM23.5 8.73905V20.4151L13.3636 27.0733V14.8152L23.5 8.73905Z"
                    stroke="black"
                  />
                </svg>
              }
              color={"#FFDD11"}
            />
            <Card
              text={"Cancel Orders"}
              data={{
                totalCount: data.cancelledOrders,
                persetage:
                  data.preveCancelledOrders != 0
                    ? ((data.cancelledOrders - data.preveCancelledOrders) *
                        100) /
                      data.preveCancelledOrders
                    : data.cancelledOrders,
              }}
              img={
                <svg
                  width="27"
                  height="28"
                  viewBox="0 0 27 28"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M6.69208 16.4096L6.33853 16.056L6.69208 16.4096C6.90831 16.1933 7.02978 15.9001 7.02978 15.5943V10.9313L11.2536 13.0432V25.2966L0.5 20.2872V7.66644L4.72383 9.77835V15.5943C4.72383 15.9001 4.8453 16.1933 5.06153 16.4096C5.27775 16.6258 5.57102 16.7472 5.8768 16.7472C6.18259 16.7472 6.47586 16.6258 6.69208 16.4096Z"
                    stroke="black"
                  />
                  <path
                    d="M11.1885 4.79L11.1884 4.79002L5.84254 7.76031L1.91894 5.79851L12.401 0.55896L15.7726 2.24355L11.1885 4.79Z"
                    stroke="black"
                  />
                  <path
                    d="M24.9073 24.922L24.4573 25.1398L24.9073 24.922C24.8414 24.7857 24.7493 24.6638 24.6363 24.5632L23.8315 23.7561L24.6482 22.937L24.6616 22.9236L24.674 22.9092C24.8629 22.6886 24.9615 22.4049 24.9503 22.1147C24.9391 21.8246 24.8188 21.5493 24.6135 21.344C24.4082 21.1386 24.1329 21.0183 23.8427 21.0071C23.5526 20.9959 23.2688 21.0946 23.0483 21.2835L23.0339 21.2958L23.0204 21.3092L22.2014 22.126L21.3824 21.3092L21.3689 21.2958L21.3545 21.2835C21.134 21.0946 20.8502 20.9959 20.5601 21.0071C20.2699 21.0183 19.9946 21.1386 19.7893 21.344C19.5839 21.5493 19.4637 21.8246 19.4524 22.1147C19.4412 22.4049 19.5399 22.6886 19.7288 22.9092L19.7412 22.9236L19.7545 22.937L20.5713 23.7561L19.7545 24.5751L19.7412 24.5885L19.7288 24.6029C19.5399 24.8235 19.4412 25.1072 19.4524 25.3974C19.4637 25.6876 19.5839 25.9628 19.7893 26.1682L20.1193 25.8382L19.7893 26.1682C19.9946 26.3735 20.2699 26.4938 20.5601 26.505C20.8502 26.5162 21.134 26.4175 21.3545 26.2286L21.3689 26.2163L21.3824 26.2029L22.2014 25.3862L23.0085 26.191C23.1091 26.304 23.231 26.3961 23.3673 26.462C23.5104 26.5312 23.6662 26.5701 23.8249 26.5763C23.9837 26.5824 24.1421 26.5556 24.29 26.4977C24.438 26.4397 24.5724 26.3518 24.6847 26.2394C24.7971 26.1271 24.885 25.9927 24.943 25.8447C25.0009 25.6968 25.0277 25.5384 25.0216 25.3796C25.0154 25.2209 24.9766 25.065 24.9073 24.922ZM20.1211 20.6428C20.7369 20.2313 21.4608 20.0117 22.2014 20.0117C23.1945 20.0117 24.1469 20.4062 24.8491 21.1084C25.5513 21.8106 25.9458 22.763 25.9458 23.7561C25.9458 24.4966 25.7261 25.2206 25.3147 25.8363C24.9033 26.4521 24.3185 26.932 23.6343 27.2154C22.9501 27.4988 22.1972 27.573 21.4709 27.4285C20.7446 27.284 20.0774 26.9274 19.5537 26.4037C19.0301 25.8801 18.6735 25.2129 18.529 24.4866C18.3845 23.7602 18.4587 23.0074 18.7421 22.3232C19.0255 21.639 19.5054 21.0542 20.1211 20.6428Z"
                    stroke="black"
                  />
                  <path
                    d="M12.1281 6.91055L12.1285 6.91033L18.2838 3.49282L22.896 5.79764L12.4143 11.0371L8.3562 9.00932L12.1281 6.91055Z"
                    stroke="black"
                  />
                  <path
                    d="M22.1921 17.7062C20.5876 17.7063 19.0488 18.3437 17.9143 19.4783C16.7796 20.6129 16.1422 22.1519 16.1421 23.7565L16.1422 23.76C16.1429 23.8682 16.1465 23.9765 16.1528 24.0845L13.5508 25.2966V13.0432L24.3044 7.66644V18.0858C23.6308 17.8344 22.9154 17.7051 22.1921 17.7062ZM22.1921 17.7062C22.1922 17.7062 22.1923 17.7062 22.1925 17.7062V18.2062L22.1917 17.7062C22.1918 17.7062 22.1919 17.7062 22.1921 17.7062Z"
                    stroke="black"
                  />
                </svg>
              }
              color={"#FFDD11"}
            />
            <Card
              text={"Pending Orders"}
              data={{
                totalCount: data.pendingOrders,
                persetage:
                  data.prevPendingOrders != 0
                    ? ((data.pendingOrders - data.prevPendingOrders) * 100) /
                      data.prevPendingOrders
                    : 100,
              }}
              img={
                <svg
                  width="28"
                  height="28"
                  viewBox="0 0 28 28"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M25.5651 2.62834L25.565 2.62836L25.5675 2.6383L27.2591 9.43377C27.3185 9.7081 27.0676 9.94388 26.8116 9.88363C26.8113 9.88356 26.811 9.88349 26.8107 9.88342L19.9826 8.22016L19.9826 8.2201L19.9751 8.21838C19.7201 8.16045 19.6177 7.82059 19.8091 7.62916L21.4146 6.02367L21.7935 5.64485L21.3894 5.29304C16.9052 1.38841 10.0974 1.50648 5.82028 5.78362C1.36337 10.2405 1.36338 17.5036 5.78987 21.9606L5.797 21.9677L5.80441 21.9746L6.21308 22.3541L6.21305 22.3541L6.21785 22.3585C6.63139 22.7326 6.66381 23.3508 6.29953 23.7537C6.10245 23.9702 5.8284 24.0857 5.56083 24.0857C5.33415 24.0857 5.1141 24.0146 4.9254 23.8543C4.81416 23.726 4.67675 23.596 4.56182 23.4873C4.51051 23.4387 4.46368 23.3944 4.42565 23.3564C-0.808366 18.1224 -0.808551 9.6238 4.4251 4.38955C9.48942 -0.64619 17.5654 -0.788178 22.8287 3.94033L23.1812 4.25708L23.5164 3.92194L24.9759 2.46241C25.1673 2.27098 25.5072 2.3734 25.5651 2.62834Z"
                    stroke="black"
                  />
                  <path
                    d="M18.5161 15.6375L18.5184 15.6389C18.9885 15.9327 19.1068 16.5181 18.8108 16.9435L18.8038 16.9536L18.7972 16.9641C18.6004 17.2791 18.2969 17.4297 17.966 17.4297C17.8041 17.4297 17.604 17.3724 17.4444 17.2731L13.3594 14.6762L13.3595 14.6761L13.3484 14.6694C13.0692 14.5019 12.8906 14.1731 12.8906 13.843V7.59615C12.8906 7.05495 13.3382 6.60742 13.8793 6.60742C14.4205 6.60742 14.8681 7.05495 14.8681 7.59615V13.0548V13.3302L15.1008 13.4774L18.5161 15.6375Z"
                    stroke="black"
                  />
                  <path
                    d="M10.8996 24.8887L10.9121 24.8926L10.9247 24.8959C11.4474 25.0314 11.7406 25.569 11.594 26.0455L11.5908 26.0558L11.5881 26.0663C11.4724 26.5096 11.0645 26.8018 10.6415 26.8018C10.5893 26.8018 10.493 26.7858 10.3833 26.7583C10.1459 26.699 9.9397 26.6469 9.73705 26.5709L9.72294 26.5656L9.70853 26.5612C9.22452 26.4122 8.92555 25.8575 9.10173 25.329L9.10185 25.329L9.10527 25.3179C9.2542 24.8339 9.80895 24.5349 10.3375 24.7111L10.3375 24.7112L10.345 24.7135L10.8996 24.8887Z"
                    stroke="black"
                  />
                  <path
                    d="M16.1709 25.0501L16.1793 25.0488L16.1878 25.0472C16.7047 24.9515 17.2358 25.2987 17.3578 25.8216C17.4503 26.3688 17.1281 26.8578 16.5943 26.9816C16.4725 26.9976 16.3472 27.0197 16.2349 27.0396L16.2287 27.0407C16.102 27.063 15.9907 27.0825 15.8887 27.0953L15.8396 27.1014L15.7934 27.1168C15.7928 27.117 15.788 27.1181 15.7778 27.119C15.7629 27.1204 15.7473 27.1206 15.7172 27.1206C15.2746 27.1206 14.8336 26.7576 14.7521 26.2614C14.6758 25.7119 15.0481 25.2146 15.5836 25.1381L15.5836 25.1382L15.5871 25.1376L16.1709 25.0501Z"
                    stroke="black"
                  />
                  <path
                    d="M20.9557 22.855L20.9557 22.8551L20.9614 22.8507C21.4067 22.5066 22.0345 22.596 22.3178 23.0033L22.3289 23.0193L22.3412 23.0344C22.6882 23.4585 22.6085 24.0996 22.189 24.4238L22.1817 24.4295L22.1746 24.4354C22.0183 24.5656 21.8325 24.6988 21.6274 24.8454C21.446 24.9647 21.2523 25.02 21.0644 25.02C20.7612 25.02 20.4461 24.8667 20.247 24.5898C19.9322 24.1344 20.0411 23.5171 20.4742 23.2158L20.4815 23.2107L20.4886 23.2053L20.9557 22.855Z"
                    stroke="black"
                  />
                </svg>
              }
              color={"#FFDD11"}
            />
            <Card
              text={"Delivered Orders"}
              data={{
                totalCount: data.deliverdOrders,
                persetage:
                  data.prevDeliverdOrders != 0
                    ? ((data.deliverdOrders - data.prevDeliverdOrders) * 100) /
                      data.prevDeliverdOrders
                    : data.deliverdOrders,
              }}
              img={
                <svg
                  width="36"
                  height="23"
                  viewBox="0 0 36 23"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M27.4767 16.7561C28.002 16.4059 28.6194 16.2195 29.2507 16.2203C30.0953 16.2215 30.9049 16.5575 31.5021 17.1547C32.0993 17.7519 32.4353 18.5615 32.4365 19.4061C32.4373 20.0374 32.2509 20.6548 31.9006 21.1801C31.5504 21.7053 31.0523 22.1149 30.4692 22.3569C29.8861 22.5989 29.2443 22.6624 28.6251 22.5395C28.0058 22.4165 27.437 22.1126 26.9906 21.6662C26.5442 21.2198 26.2403 20.651 26.1173 20.0317C25.9944 19.4125 26.0579 18.7707 26.2999 18.1876C26.5419 17.6045 26.9515 17.1064 27.4767 16.7561ZM28.0252 21.0825C28.3694 21.3125 28.7741 21.4352 29.188 21.4352C29.7431 21.4352 30.2754 21.2147 30.6679 20.8222C31.0604 20.4297 31.2809 19.8974 31.2809 19.3423C31.2809 18.9284 31.1581 18.5237 30.9282 18.1796C30.6982 17.8354 30.3713 17.5671 29.9889 17.4087C29.6065 17.2503 29.1857 17.2089 28.7797 17.2896C28.3737 17.3704 28.0008 17.5697 27.7081 17.8624C27.4154 18.1551 27.2161 18.528 27.1353 18.934C27.0545 19.34 27.096 19.7608 27.2544 20.1432C27.4128 20.5257 27.6811 20.8525 28.0252 21.0825Z"
                    stroke="black"
                    stroke-width="0.8"
                  />
                  <path
                    d="M5.9572 16.7561C6.48247 16.4059 7.09984 16.2195 7.73116 16.2203C8.57573 16.2215 9.38538 16.5575 9.98259 17.1547C10.5798 17.7519 10.9158 18.5615 10.9169 19.4061C10.9178 20.0374 10.7313 20.6548 10.3811 21.1801C10.0309 21.7053 9.53273 22.1149 8.94963 22.3569C8.36654 22.5989 7.72476 22.6624 7.10553 22.5395C6.48631 22.4165 5.91749 22.1126 5.47108 21.6662C5.02468 21.2198 4.72076 20.651 4.59781 20.0317C4.47485 19.4125 4.53839 18.7707 4.78038 18.1876C5.02237 17.6045 5.43192 17.1064 5.9572 16.7561ZM6.50084 21.0825C6.84501 21.3125 7.24965 21.4352 7.66359 21.4352C8.21866 21.4352 8.751 21.2147 9.14349 20.8222C9.53599 20.4297 9.75649 19.8974 9.75649 19.3423C9.75649 18.9284 9.63375 18.5237 9.40377 18.1796C9.1738 17.8354 8.84694 17.5671 8.46451 17.4087C8.08208 17.2503 7.66127 17.2089 7.25529 17.2896C6.8493 17.3704 6.47639 17.5697 6.18369 17.8624C5.89099 18.1551 5.69166 18.528 5.61091 18.934C5.53015 19.34 5.5716 19.7608 5.73 20.1432C5.88841 20.5257 6.15666 20.8525 6.50084 21.0825Z"
                    stroke="black"
                    stroke-width="0.8"
                  />
                  <path
                    d="M35.2758 11.3801L35.276 11.3805C35.4597 11.7182 35.5551 12.0969 35.5532 12.4813V12.4833V17.3479C35.5532 17.411 35.5408 17.4735 35.5167 17.5318C35.4925 17.5901 35.4571 17.6431 35.4125 17.6877C35.3679 17.7323 35.3149 17.7677 35.2566 17.7919C35.1983 17.816 35.1358 17.8284 35.0727 17.8284H34.2268C33.9785 17.0444 33.5486 16.3283 32.9701 15.7395C32.3181 15.0758 31.5011 14.5979 30.603 14.3549C29.705 14.1119 28.7584 14.1125 27.8607 14.3568C27.2553 14.5216 26.6869 14.7931 26.1813 15.1563V5.75169H30.1108V5.75171L30.1141 5.75168C30.748 5.7465 31.3713 5.91398 31.9172 6.23616C32.4632 6.55833 32.9111 7.02305 33.213 7.58047L33.2132 7.58083L35.2758 11.3801ZM26.8406 9.8515V10.2527L30.6459 6.44624V6.04624H30.6455H27.2406H26.8406V6.44624V9.8515Z"
                    stroke="black"
                    stroke-width="0.8"
                  />
                  <path
                    d="M1.3767 15.9085H1.7767V15.5085V0.4H22.2553C22.6864 0.401155 23.0994 0.573177 23.4039 0.878372C23.7084 1.18367 23.8795 1.59731 23.8795 2.02856V17.6479H12.5889C12.2644 16.689 11.6611 15.8459 10.853 15.2285C9.96308 14.5485 8.87421 14.1802 7.75426 14.1802C6.6343 14.1802 5.54544 14.5485 4.6555 15.2285C3.84743 15.8459 3.24411 16.689 2.91957 17.6479H1.26967C1.03902 17.6479 0.817818 17.5562 0.654723 17.3931C0.491626 17.23 0.4 17.0088 0.4 16.7782C0.4 16.5475 0.491626 16.3263 0.654722 16.1632C0.817818 16.0001 1.03902 15.9085 1.26967 15.9085H1.3767ZM11.2316 12.6437L11.5145 12.927L11.7975 12.6439L18.7345 5.70693L19.0173 5.42409L18.7345 5.14125L17.3578 3.76455L17.0749 3.48171L16.7921 3.76455L11.5149 9.04172L9.40436 6.92686L9.12151 6.64344L8.83838 6.92657L7.46169 8.30327L7.17903 8.58593L7.4615 8.86878L11.2316 12.6437Z"
                    stroke="black"
                    stroke-width="0.8"
                  />
                </svg>
              }
              color={"#FFDD11"}
            />
          </div>
          {/* dashbord card */}
          {/* chart div */}
          <div className="flex flex-col md:flex-row gap-4 mt-8">
            <div className="w-full p-4 rounded-xl bg-containerWhite md:w-[110%]">
              <ChartComponent
                percentage={
                  data.prevTotalOrder != 0
                    ? ((data.totalOrder - data.prevTotalOrder) * 100) /
                      data.prevTotalOrder
                    : data.totalOrder
                }
                total={data.totalOrder}
                maxMonth={data?.monthWithMostOrders?.month}
                maxValue={data?.monthWithMostOrders?.totalOrders}
                minMonth={data?.monthWithLeastOrders?.month}
                minValue={data?.monthWithLeastOrders?.totalOrders}
                data={data?.orders}
              />
            </div>
            <div className="w-full bg-containerWhite rounded-lg md:w-[36%] flex flex-col justify-between">
              <h1 className="p-2 pl-5 pt-5 font-semibold text-white">
                Returned Orders
              </h1>
              <div className="flex gap-4 mt-10 pl-8 items-center">
                <div className="p-3 m-3 rounded-lg bg-[#FFDD11]">
                  <svg
                    width="22"
                    height="27"
                    viewBox="0 0 22 27"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M0 14.1429V15.7143C0 21.78 4.93429 26.7143 11 26.7143C17.0657 26.7143 22 21.78 22 15.7143C22 9.64857 17.0657 4.71429 11 4.71429H7.85714V0L1.57143 6.28571L7.85714 12.5714V7.85714H11C15.3324 7.85714 18.8571 11.3819 18.8571 15.7143C18.8571 20.0467 15.3324 23.5714 11 23.5714C6.66757 23.5714 3.14286 20.0467 3.14286 15.7143V14.1429H0Z"
                      fill="black"
                    />
                  </svg>
                </div>
                <div>
                  <div>
                    <p className="text-xl font-bold text-white">
                      {data?.returnOrders}
                    </p>
                    <p
                      className="flex gap-1 items-center text-white"
                      style={{
                        color:
                          data?.prevReturnOrders != 0
                            ? ((data?.returnOrders - data?.prevReturnOrders) *
                                100) /
                              data?.prevReturnOrders
                            : data?.returnOrders >= 0
                            ? "#FFDD11"
                            : "red",
                      }}
                    >
                      <span
                        className=""
                        style={{
                          color:
                            data?.prevReturnOrders != 0
                              ? ((data?.returnOrders - data?.prevReturnOrders) *
                                  100) /
                                data?.prevReturnOrders
                              : data?.returnOrders >= 0
                              ? "rgba(63, 197, 0, 1)"
                              : "red",
                          fontWeight: "bold",
                          fontSize: "1.2em", // Adjust font size to make it smaller
                          lineHeight: "0.1", // Adjust line height to make it smaller
                        }}
                      >
                        {"\u2191"}
                      </span>
                      {/* {(data.prevReturnOrders != 0 ? ((data.returnOrders - data.prevReturnOrders) * 100 / data.prevReturnOrders) : 100).toFixed(2).replace(/\.?0+$/, '')} */}
                      {calculatePercentageChange(
                        data?.returnOrders,
                        data?.prevReturnOrders
                      )}
                      %
                    </p>
                  </div>
                </div>
              </div>
              <div>
                <svg
                  width="251"
                  height="93"
                  viewBox="0 0 251 93"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M39.0765 36.5952L1 50.8333V73C1 84.0457 9.95431 93 21 93H230C241.046 93 250 84.0457 250 73V1L228.457 45.9048L173.847 16.881L123.746 45.9048L39.0765 36.5952Z"
                    fill="url(#paint0_linear_5057_17542)"
                  />
                  <path
                    d="M0.5 51L39 37L123.5 46L173 17.5L228 46L250.5 0.5"
                    stroke="#ADE5FF"
                  />
                  <defs>
                    <linearGradient
                      id="paint0_linear_5057_17542"
                      x1="125.5"
                      y1="47"
                      x2="125.5"
                      y2="93"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stop-color="#ffdd11" stop-opacity="0.6" />
                      <stop offset="1" stop-color="#ffdd11" stop-opacity="0" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
            </div>
          </div>
          {/* chart div end */}

          {/* orderTable */}
          <OrderTable />
        </>
      ) : (
        <div className="bg-inherit items-center pt-48">
          <Loader />
        </div>
      )}
    </div>
  );
}

export default AdminOrders;
