/* eslint-disable no-unused-vars */
import { data } from "autoprefixer";
import "./App.css";
import "./Responsive.css";
// import AdminPage from "./component/admin/AdminPage";
import { Routes, Route } from "react-router-dom";
import Homepage from "./component/home/HomePage";
import Login from "./component/logreg_components/Login";
import Register from "./component/logreg_components/Register";
import FgPwd from "./component/logreg_components/FgPwd";
import ChangePwd from "./component/logreg_components/ChangePwd";
function App() {
  return (
    <Routes>
      <Route path="/" element={<Homepage />}></Route>
      <Route path="/login" element={<Login />}></Route>
      <Route path="/register" element={<Register />}></Route>
      <Route path="/fgpass" element={<FgPwd />}></Route>
      <Route path="/changepass" element={<ChangePwd />}></Route>
    </Routes>
  );
}
export default App;
