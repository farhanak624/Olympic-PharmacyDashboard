import EcomUpdatedInstance from "./Axios";

export const vendorCostomersDemoGraph = async () => {
  return await EcomUpdatedInstance.get("vendor/customers");
};
export const getvendorTopSellingProducts = async (date) => {
  return await EcomUpdatedInstance.get(`vendor/topProducts/?duration=${date}`);
};
export const getVendorStats = async () => {
  return await EcomUpdatedInstance.get("vendor/stats");
};
export const getVendorSalesAnalysis = async (selected) => {
  if (selected == "Current Year") {
    return await EcomUpdatedInstance.get("vendor/salesAnalysis");
  } else {
    return await EcomUpdatedInstance.get("vendor/salesAnalysis/?year=lastYear");
  }
};
/////////////////////////////////////////Products////////////////////////////////////////
export const addProduct = async (data) => {
  console.log("to uploadd", data);
  return await EcomUpdatedInstance.post(`/vendor/product`, data);
};
export const addCategory = async (data, role) => {
  console.log("to category", data);
  return await EcomUpdatedInstance.post(`${role}/category`, data);
};
export const editCategory = async (id, data, role) => {
  return await EcomUpdatedInstance.put(`${role}/category/${id}`, data);
};
export const getSections = async () => {
  return await EcomUpdatedInstance.get(`vendor/getAllSections`);
};
export const getBrands = async (categoryId) => {
  return await EcomUpdatedInstance.get(`vendor/getBrands?id=${categoryId}`);
};
export const getCategory = async () => {
  return await EcomUpdatedInstance.get(`vendor/getCategories`);
};
export const getSectionCategories = async (sectionId) => {
  console.log("secfsd", sectionId);
  return await EcomUpdatedInstance.get(
    `vendor/getSectionCategories?sectionId=${sectionId}`
  );
};
export const addBrand = async (data) => {
  return await EcomUpdatedInstance.post(`vendor/addBrands`, data);
};
export const allProducts = async (sectionId, search, pages) => {
  console.log("sectionId", sectionId, "search", search);
  console.log(
    `vendor/products?section=${sectionId ? sectionId : ""}&search=${
      search ? search : ""
    }&page=${pages ? pages : "1"}`
  );
  return await EcomUpdatedInstance.get(
    `vendor/products?section=${sectionId ? sectionId : ""}&search=${
      search ? search : ""
    }&page=${pages ? pages : "1"}`
  );
};
export const getProductDetails = async (productId) => {
  return await EcomUpdatedInstance.get(`vendor/product/${productId}`);
};
export const editProduct = async (data, productId) => {
  return await EcomUpdatedInstance.put(`vendor/product/${productId}`, data);
};
export const productDetailed = async (productId, year) => {
  console.log({ year });
  return await EcomUpdatedInstance.get(
    `vendor/product/${productId}?year=${year ? year : new Date().getFullYear()}`
  );
};
export const productOverview = async (productId, year) => {
  console.log({ year });
  return await EcomUpdatedInstance.get(
    `vendor/productOverview/${productId}?year=${
      year ? year : new Date().getFullYear()
    }`
  );
};
export const deleteProduct = async (productId) => {
  return await EcomUpdatedInstance.delete(`vendor/product/${productId}`);
};
export const addSubCategory = async (data, role) => {
  return await EcomUpdatedInstance.post(`${role}/subCategory`, data);
};
export const editSubCategory = async (id, data, role) => {
  return await EcomUpdatedInstance.put(`${role}/subCategory/${id}`, data);
};
/////////////////////////////////////////Orders////////////////////////////////////////
export const getOrderStatics = async (filter) => {
  return await EcomUpdatedInstance.get(
    `vendor/getOrderStatics?filter=${filter}`
  );
};

export const getOrders = async (status, page) => {
  let apiUrl = `/vendor/getOrders?page=${page}`;
  if (status) {
    apiUrl += `&status=${status}`;
  }
  console.log("getOrders", status);
  return await EcomUpdatedInstance.get(apiUrl);
};
export const getOrderDetails = async (id) => {
  return await EcomUpdatedInstance.get(`vendor/getOrderDetails?orderId=${id}`);
};
/////////////////////////////////////////Special Deals////////////////////////////////////////
export const getAllSpecialDeals = async () => {
  return await EcomUpdatedInstance.get("vendor/specialDeal");
};
export const deleteDeals = async (product) => {
  console.log(product, "???????????");
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
/////////////////////////////////////////Wallet////////////////////////////////////////
export const getWalletHistory = async () => {
  return await EcomUpdatedInstance.get("vendor/getCreditedWallet");
};
export const getVendorPayoutHistory = async () => {
  return await EcomUpdatedInstance.get("vendor/payOutHistory");
};
export const getBalanceDetails = async () => {
  return await EcomUpdatedInstance.get(`vendor/getWalletStatics?year=2024`);
};
/////////////////////////////////////////Slider////////////////////////////////////////
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
export const getProfile = async () => {
  return await EcomUpdatedInstance.get(`vendor/getProfiles`);
};

export const addNewBank = async (data) => {
  console.log("addNewBank", data);
  return await EcomUpdatedInstance.post(`vendor/addNewBank`, data);
};

export const editBank = async (data) => {
  console.log("editBank", data);
  return await EcomUpdatedInstance.post(`vendor/editBank`, data);
};

export const makePrimary = async (data) => {
  console.log("makePrimary", data);
  return await EcomUpdatedInstance.post(`vendor/makePrimaryAccount`, data);
};
/////////////////////////////////////////Coupons////////////////////////////////////////
export const vendorAddCoupons = async (data) => {
  return await EcomUpdatedInstance.post(`vendor/coupon`, data);
};
export const vendorGetCoupons = async (page) => {
  return await EcomUpdatedInstance.get(`vendor/coupons?page=${page}`);
};
export const vendorBlockOrUnblock = async (couponId) => {
  return await EcomUpdatedInstance.put(`vendor/coupon`, {
    couponId: couponId,
  });
};
