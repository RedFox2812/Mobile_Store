/* eslint-disable no-unused-vars */
import "./App.css";
import "./Order_Carts.css";
import "./Responsive.css";
// import AdminPage from "./component/admin/AdminPage";
import { Routes, Route } from "react-router-dom";
import Homepage from "./component/page/HomePage";
import Login from "./component/logreg_components/Login";
import Register from "./component/logreg_components/Register";
import FgPwd from "./component/logreg_components/FgPwd";
import ChangePwd from "./component/logreg_components/ChangePwd";
import OrderStatusPage from "./component/order_status_components/OrderStatusPage";
import Cart from "./component/carts/Cart";
import UserPage from "./component/page/UserPage";
import ChatPage from "./component/page/ChatPage";
import DetailProduct from "./component/detail_product/DetailProduct";
import Payment from "./component/carts/Payment";
function App() {
  return (
    <Routes>
      <Route path="/" element={<Homepage />}></Route>
      <Route path="/login" element={<Login />}></Route>
      <Route path="/register" element={<Register />}></Route>
      <Route path="/fgpass" element={<FgPwd />}></Route>
      <Route path="/changepass" element={<ChangePwd />}></Route>
      <Route path="/order_status" element={<OrderStatusPage />}></Route>
      <Route
        path="/order_status/order_edit"
        element={<>Trang chỉnh sửa thông tin đơn hàng</>}
      ></Route>
      <Route path="/cart" element={<Cart />}></Route>
      <Route path="/user-info" element={<UserPage />}></Route>
      <Route path="/detail_product" element={<DetailProduct />}></Route>
      <Route path="/cart/payment" element={<Payment />}></Route>
    </Routes>
  );
}
export default App;
