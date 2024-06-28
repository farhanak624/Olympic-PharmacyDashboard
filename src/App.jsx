import "./App.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import VendorRoutes from "./Routes/VendorRoutes";
import AdminRoutes from "./Routes/AdminRoutes";
import LoginCheck from "./Routes/LoginCheck";
import LoginIn from "./Pages/Auth/Login";
import PharmacyRegister from "./Pages/Auth/PharmacyRegister";
import AdminHome from "./Components/Layout/Admin/AdminHome";
import Welcome from "./Pages/Home/Welcome";
import AdminDashboard from "./Pages/Admin/Dashboard/Dashboard";
import ShippingCharge from "./Pages/Admin/Shipping/ShippingCharge";
import PushNotification from "./Pages/Admin/Notification/PushNotification";
import SentNotificationpage from "./Pages/Admin/Notification/SentNotificationpage";
import AdminSlider from "./Pages/Admin/Slider/AdminSlider";
import TodayPayout from "./Pages/Admin/TodayPayOut/TodayPayout";
import DeliveryBoys from "./Pages/Admin/DeliveryBoys/DeliveryBoys";
import RefundPage from "./Pages/Admin/Refund/RefundPage";
import AdminOrders from "./Pages/Admin/Orders/AdminOrders";
import Coupons from "./Pages/Admin/Coupons/Coupons";
import VendorsPage from "./Pages/Admin/Vendors/VendMain";
import Customers from "./Pages/Admin/Customers.jsx/Customers";
import Adminrevenue from "./Pages/Admin/revenue/Adminrevenue";
import VendorHome from "./Components/Layout/Vendor/VendorHome";
import VendorDashboard from "./Pages/Vendor/Dashboard/VendorDashboard";
import AddNewProducts from "./Pages/Vendor/Product/AddNewProducts";
import AllProducts from "./Pages/Vendor/Product/AllProducts";
import ProductDetailed from "./Pages/Vendor/Product/ProductDetailed";
import EditProduct from "./Pages/Vendor/Product/EditProduct";
import OrdersPage from "./Pages/Vendor/Orders/OrdersPage";
import VendorSpecialDeals from "./Pages/Vendor/Specialdeal/SpecialDeals";
import Wallet from "./Pages/Vendor/Wallet/Wallet";
import VendorSlider from "./Pages/Vendor/Slider/VendorSlider";
import ProfilePage from "./Pages/Vendor/Profile/ProfilePage";
import VendorCoupons from "./Pages/Vendor/Coupon/VendorCoupons";
import VendMain from "./Pages/Admin/Vendors/VendMain";
import VenDetail from "./Pages/Admin/Vendors/VenDetail";
import VendorRequests from "./Pages/Admin/Vendors/VendorRequests";
import OtpVerify from "./Pages/Auth/OtpVerify";
import VentorProfile from "./Pages/Auth/VentorProfile";
import ProcessingPage from "./Pages/Auth/ProcessingPage";
import BlockedPage from "./Pages/Auth/BlockedPage";

function App() {
  return (
    <BrowserRouter>
      <ToastContainer position="top-center" />
      <Routes>
        <Route path="" element={<VendorRoutes />}>
          <Route element={<VendorHome />}>
            <Route
              path="/vendor/"
              element={<Navigate replace to="/vendor/dashboard" />}
            />
            <Route path="/vendor/dashboard" element={<VendorDashboard />} />
            <Route path="/vendor/products" element={<AddNewProducts />} />
            <Route path="/vendor/AllProducts" element={<AllProducts />} />
            <Route
              path="/vendor/ProductDetailed"
              element={<ProductDetailed />}
            />
            <Route path="/vendor/editProduct" element={<EditProduct />} />
            <Route path="/vendor/orders" element={<OrdersPage />} />
            <Route
              path="/vendor/specialdeals"
              element={<VendorSpecialDeals />}
            />
            <Route path="/vendor/wallet" element={<Wallet />} />
            <Route path="/vendor/slider" element={<VendorSlider />} />
            <Route path="/vendor/profile" element={<ProfilePage />} />
            <Route path="/vendor/coupon" element={<VendorCoupons />} />
          </Route>
        </Route>

        <Route path="" element={<AdminRoutes />}>
          <Route element={<AdminHome />} path="/admin">
            <Route
              path="/admin"
              element={<Navigate replace to="/admin/dashboard" />}
            />
            <Route path="/admin/home" element={<Welcome />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/shipping" element={<ShippingCharge />} />
            <Route path="/admin/notification" element={<PushNotification />} />
            <Route path="/admin/sent-page" element={<SentNotificationpage />} />
            <Route path="/admin/slider" element={<AdminSlider />} />
            <Route path="/admin/todaypayout" element={<TodayPayout />} />
            <Route path="/admin/deliveryBoys" element={<DeliveryBoys />} />
            <Route path="/admin/refund" element={<RefundPage />} />
            <Route path="/admin/orders" element={<AdminOrders />} />
            <Route path="/admin/coupon" element={<Coupons />} />
            <Route path="/admin/vendors" element={<VendorsPage />} />
            <Route path="/admin/customers" element={<Customers />} />
            <Route path="/admin/revenue" element={<Adminrevenue />} />
            <Route path="/admin/vendors" element={<VendMain />} />
            <Route path="/admin/vendorsOverview/:id" element={<VenDetail />} />
            <Route
              path="/admin/vendorsRequestOverview/:id"
              element={<VendorRequests />}
            />
          </Route>
        </Route>

        <Route element={<LoginCheck />} path="">
          <Route element={<LoginIn />} path="/login" />
          <Route element={<PharmacyRegister />} path="/register" />
          <Route element={<OtpVerify />} path="/verifyOTP" />
          <Route path="/addProfile" element={<VentorProfile />} />
        </Route>
        <Route path="/blocked" element={<BlockedPage />} />
        <Route path="/processing" element={<ProcessingPage />} />
        {/* <Route path="/404" element={<NotFound />} /> */}
      <Route path="*" element={<Navigate replace to="/404" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
