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
