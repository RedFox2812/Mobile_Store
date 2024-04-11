/* eslint-disable no-unused-vars */
import { data } from "autoprefixer";
import Test from "../backend/Test";
import "./App.css";
import "./Responsive.css";
import AdminPage from "./component/admin/AdminPage";
import HomePage from "./component/home/HomePage";
import SigIn from "./component/logreg_components/SigIn";
import { useState } from "react";
import Logreg from "./component/logreg_components/Logreg";
import FgPwd from "./component/logreg_components/FgPwd";
import ChangePwd from "./component/logreg_components/ChangePwd";
// import FetchAPI from "./data/FetchAPI";
// import ButtonExtra from "./component/elements/ButtonExtra";
// import HoverText from "./component/elements/HoverText";
// import Toggle from "./component/elements/toggle";

function App() {
  const consoleLog = (e) => {
    console.log(e.target);
  };
  const [show, setShow] = useState("login");
  document.addEventListener("click", (e) => {
    if (e.target.classList.contains("btn-register")) {
      setShow("register");
    }
    if (e.target.classList.contains("btn-login")) {
      setShow("login");
    }
    if (e.target.classList.contains("btn-fgpass")) {
      setShow("fgpass");
    }
    if (e.target.classList.contains("btn-changepass")) {
      setShow("changepass");
    }
    if (e.target.classList.contains("btn-dangnhap")) {
      setShow("homepage");
    }
  });

  return (
    <div className="h-full">
      {/* <AdminPage></AdminPage> */}
      {/* <HomePage></HomePage> */}
      {/* <Test></Test> */}
      {show == "login" ? (
        <SigIn></SigIn>
      ) : show == "register" ? (
        <Logreg></Logreg>
      ) : show == "fgpass" ? (
        <FgPwd></FgPwd>
      ) : show == "changepass" ? (
        <ChangePwd></ChangePwd>
      ) : show == "homepage" ? (
        <HomePage></HomePage>
      ) : (
        ""
      )}
    </div>
  );
}

export default App;
