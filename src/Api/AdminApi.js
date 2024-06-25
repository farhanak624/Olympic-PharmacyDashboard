import EcomUpdatedInstance from "./Axios";

export const LoginUserdata = async (data) => {
  try {
    const response = await EcomUpdatedInstance.post("/admin/login", data);
    return response.data;
  } catch (error) {
    console.error("Login failed:", error);
    throw error; // rethrow the error to handle it further up the call stack if needed
  }
};
export const userLogin = async (data) => {
  console.log("login", data);
  return await EcomUpdatedInstance.post("admin/login", data);
};
export const getNotification = async () => {
  return await EcomUpdatedInstance.get("admin/getAllNotification");
};
export const getNotcount = async () => {
  return await EcomUpdatedInstance.get("admin/getTotalCountNotification");
};

export const readNotification = async (id) => {
  const notification = { notficationId: id };
  return await EcomUpdatedInstance.post("admin/readNotification", notification);
};
export const updateFCM = async (data) => {
  return await EcomUpdatedInstance.post("admin/updateFirebaseToken", data);
};
export const getAdminDashboardData = async (selected) => {
  if (selected == "This Year") {
    return await EcomUpdatedInstance.get("admin/dashboardDatas/?filter=year");
  } else if (selected == "This Month") {
    return await EcomUpdatedInstance.get("admin/dashboardDatas/?filter=month");
  } else if (selected == "This Week") {
    return await EcomUpdatedInstance.get("admin/dashboardDatas/?filter=week");
  }
};
export const getAdminOrders = async (page, status) => {
  return await EcomUpdatedInstance.get(
    `admin/getOrders/?status=${status}&page=${page}`
  );
};
export const addCoupons = async (data) => {
  return await EcomUpdatedInstance.post("vendor/coupon", data);
};
export const getCoupons = async () => {
  return await EcomUpdatedInstance.get("vendor/coupons");
};
export const blockOrUnblock = async (couponId) => {
  console.log(couponId);
  return await EcomUpdatedInstance.put("vendor/coupon", { couponId: couponId });
};
export const getAllSpecialDeals = async () => {
  return await EcomUpdatedInstance.get("vendor/specialDeal");
};
export const deleteDeals = async (product) => {
  return await EcomUpdatedInstance.delete(
    `vendor/specialDeal?product=${product}`,
    product
  );
};
export const addSpcialDeal = async (formdata) => {
  console.log(formdata);
  return await EcomUpdatedInstance.post("vendor/specialDeal", formdata);
};
export const getsearchProduct = async (search) => {
  return await EcomUpdatedInstance.get(`vendor/products?search=${search}`);
};
export const getOrders = async (status, page) => {
  let apiUrl = `/vendor/getOrders?page=${page}`;
  if (status) {
    apiUrl += `&status=${status}`;
  }
  console.log("getOrders", status);
  return await EcomUpdatedInstance.get(apiUrl);
};
export const getOrderStatics = async (filter) => {
  return await EcomUpdatedInstance.get(
    `vendor/getOrderStatics?filter=${filter}`
  );
};
export const getWalletHistory = async () => {
  return await EcomUpdatedInstance.get("vendor/getCreditedWallet");
};
export const getVendorPayoutHistory = async () => {
  return await EcomUpdatedInstance.get("vendor/payOutHistory");
};
export const getBalanceDetails = async () => {
  return await EcomUpdatedInstance.get(`vendor/getWalletStatics?year=2024`);
};
export const getBanners = async () => {
  return await EcomUpdatedInstance.get("vendor/banner");
};
export const getAprovedBanners = async () => {
  return await EcomUpdatedInstance.get("vendor/banner/approved");
};
export const deleteBannerReq = async (id) => {
  console.log(id);
  return await EcomUpdatedInstance.delete(`vendor/banner?request=${id}`);
};
export const stripepaymentbanner = async (amount) => {
  console.log(amount);
  return await EcomUpdatedInstance.post("vendor/stripe", amount);
};
export const palypalPaymentBanner = async (amount) => {
  return await EcomUpdatedInstance.post("vendor/paypal", amount);
};
export const sliderReq = async (wholData) => {
  console.log(wholData);
  return await EcomUpdatedInstance.post("vendor/banner", wholData);
};
export const getCategories = async (keyword) => {
  return await EcomUpdatedInstance.get(`vendor/categories?keyword=${keyword}`);
};

////Shipping////
export const updateShipping = async (data) => {
  return await EcomUpdatedInstance.post(`admin/editShippingCharge`, data);
};
export const addShipping = async (data) => {
  return await EcomUpdatedInstance.post(`admin/addShippingCharge`, data);
};
export const getShipping = async () => {
  return await EcomUpdatedInstance.get(`admin/getShippingCharge`);
};
export const deleteShipping = async (data) => {
  return await EcomUpdatedInstance.post(`admin/deleteShippingCharge`, data);
};
///notification///
export const getAllNotification = async (page) => {
  return await EcomUpdatedInstance.get(
    `admin/getAllNotifications?page=${page}`
  );
};
export const getAdminAllSection = async (name) => {
  return await EcomUpdatedInstance.get(`admin/getAllSections?name=${name}`);
};
export const getAdminAllcategory = async (productname) => {
  return await EcomUpdatedInstance.get(
    `admin/getAllCategories?name=${productname}`
  );
};
export const sentPushNotification = async (data) => {
  return await EcomUpdatedInstance.post("admin/createNotification", data);
};
///slider///
export const adminGetbannerReq = async (page) => {
  return await EcomUpdatedInstance.get(`admin/getBannerRequest?page=${page}`);
};
export const adminGetApprovedbannerReq = async () => {
  return await EcomUpdatedInstance.get(
    `admin/getBannerRequest?status=Approved`
  );
};
export const adminAprovebnrEeq = async (data) => {
  return await EcomUpdatedInstance.post("admin/approveRequest", data);
};
export const adminDeleteBannerReq = async (data) => {
  return await EcomUpdatedInstance.post("admin/rejectRequest", data);
};
export const getbyadminBanner = async (page) => {
  return await EcomUpdatedInstance.get(`admin/banners?page=${page}`);
  // ?page=${page}
};
export const addAdminBAnnerreq = async (data) => {
  return await EcomUpdatedInstance.post("admin/banner", data);
};
export const addAdminrepDelete = async (id) => {
  console.log(id);
  return await EcomUpdatedInstance.delete(`admin/banner/${id}`);
};
//////////////////////////////////Today pay out////////////////////////////////////////
export const getAlltodaypayout = async (page) => {
  return await EcomUpdatedInstance.get(`admin/getPendingWallets${page}`);
};
export const aprovedPayOut = async (data) => {
  return await EcomUpdatedInstance.post("admin/payWallet", data);
};
/////////////////////////////////////////Delivery boys////////////////////////////////////////
export const getDeliveryBoysAdmin = async () => {
  return await EcomUpdatedInstance.get(`admin/showAllDeliveryBoys`);
};

export const actionOnDeliveryBoy = async (id) => {
  return await EcomUpdatedInstance.put(`admin/blockActionDeliveryBoy`, {
    id: id,
  });
};

export const addNewDeliveryBoy = async (data) => {
  return await EcomUpdatedInstance.post(`admin/addPerson`, data);
};

export const editDeliveryBoy = async ({
  boyId,
  name,
  email,
  profileImage,
  password,
}) => {
  const data = { name, email, profileImage, password };
  console.log("editBank", data);
  return await EcomUpdatedInstance.put(
    `admin/updateDeliveryBoyProfile/${boyId}`,
    data
  );
};

export const getOrderForAssigning = async () => {
  return await EcomUpdatedInstance.get(`admin/getOrderForAssigning`);
};

export const assignOrders = async (data) => {
  console.log("assignOrders", data);
  return await EcomUpdatedInstance.post(`admin/assignOrders`, data);
};

export const getAssignedOrdersAdmin = async () => {
  return await EcomUpdatedInstance.get(`admin/getAssignedOrders`);
};

export const getReturnOrdersAdmin = async (status) => {
  return await EcomUpdatedInstance.get(
    `admin/getReturnOrders?status=${status}`
  );
};

export const assignPickup = async (data) => {
  console.log("assignPickup", data);
  return await EcomUpdatedInstance.post(`admin/assignPickup`, data);
};
/////////////////////////////////////////Refund////////////////////////////////////////
export const getRefundRequest = async () => {
  return await EcomUpdatedInstance.get(`admin/get-refund-request`);
};
export const payRefund = async (data) => {
  return await EcomUpdatedInstance.post(`admin/pay-refund`, data);
};
export const refundRequest = async () => {
  return await EcomUpdatedInstance.get(`admin/get-refund-history`);
};
/////////////////////////////////////////Vendors////////////////////////////////////////
export const getVendorRequests = async (page) => {
  return await EcomUpdatedInstance.get(`admin/getVendorRequests?page=${page}`);
};

export const getVendorDetails = async (id) => {
  return await EcomUpdatedInstance.get(`admin/getVendorDetails?id=${id}`);
};

export const approveVendor = async (id) => {
  console.log("approve: ", id);
  return await EcomUpdatedInstance.post(`admin/approve`, { id: id });
};

export const rejectVendor = async (id) => {
  return await EcomUpdatedInstance.post(`admin/reject`, { id: id });
};

export const actionOnVendor = async (id) => {
  console.log("actionOnVendor: ", id);
  return await EcomUpdatedInstance.post(`admin/blockAction`, { id: id });
};

export const getTopVendors = async (page) => {
  return await EcomUpdatedInstance.get(`admin/topVendors?page=${page}`);
};
/////////////////////////////////////////Customers////////////////////////////////////////
export const adminRemindNotification = async (data) => {
  return await EcomUpdatedInstance.post("admin/sendNotification", data);
};
export const getAdminCustomers = async (activeButton, page) => {
  if (activeButton == "Ecomers") {
    return await EcomUpdatedInstance.get(`admin/getEcomCustomers?page=${page}`);
  } else if (activeButton == "Flicks") {
    return await EcomUpdatedInstance.get(`admin/getFlixUsers?page=${page}`);
  }
};
/////////////////////////////////////////Coupons////////////////////////////////////////
export const adminAddCoupons = async (data) => {
  return await EcomUpdatedInstance.post("admin/coupon", data);
};
export const adminGetCoupons = async (page) => {
  return await EcomUpdatedInstance.get(`admin/coupons?page=${page}`);
};
export const adminBlockOrUnblock = async (couponId) => {
  return await EcomUpdatedInstance.put("admin/coupon", { couponId: couponId });
};
export const deleteCoupon = async (id,role) => {
  return await EcomUpdatedInstance.delete(`${role}/coupon/${id}`);
};
/////////////////////////////////////////Revenue////////////////////////////////////////
export const adminCloudRevenuetable = async (page) => {
  return await EcomUpdatedInstance.get(`admin/cloudDetails?page=${page}`);
};
export const adminFlixTablerevenue = async (page) => {
  return await EcomUpdatedInstance.get(`admin/membershipDetails?page=${page}`);
};
export const adminrevenueOreder = async (page) => {
  return await EcomUpdatedInstance.get(`admin/orderDetails?page=${page}`);
};
export const adminrevenueSpesialDeals = async () => {
  return await EcomUpdatedInstance.get("admin/specialDealsDetails");
};
export const adminrevenuebenner = async (page) => {
  return await EcomUpdatedInstance.get(`admin/bannerDetails?page=${page}`);
};
export const getBannerRevenue = async (bannerkey) => {
  return await EcomUpdatedInstance.get(`admin/revenue/banner?filter=${bannerkey}`);
};
export const getCloudRevenue = async (cloud) => {
  return await EcomUpdatedInstance.get(`admin/revenue/cloud?filter=${cloud}`);
};
export const getColorGraph = async (filter) => {
  return await EcomUpdatedInstance.get(`admin/income/stats?filter=${filter}`);
};
export const getRevenueOrderDetails = async (orders) => {
  return await EcomUpdatedInstance.get(`admin/revenue/orders?filter=${orders}`);
};
export const specialDealrevenue = async (Spciel) => {
  return await EcomUpdatedInstance.get(`admin/revenue/specialDeals?filter=${Spciel}`);
};
export const geytgraphdataofRevenue = async (year) => {
  console.log(year);
  return await EcomUpdatedInstance.get(`admin/revenue/analysis?year=${year}`);
};
export const getrevenueFirstSection = async () => {
  return await EcomUpdatedInstance.get("admin/revenue/details");
};
/////////////////////////////////////////Order////////////////////////////////////////
export const getAdminGetStats = async () => {
  return await EcomUpdatedInstance.get("admin/getOrderStatics");
};