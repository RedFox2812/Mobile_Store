/* eslint-disable no-unused-vars */
import Test from "../backend/Test";
import "./App.css";
import "./Responsive.css";
import AdminPage from "./component/admin/AdminPage";
import HomePage from "./component/home/HomePage";
// import FetchAPI from "./data/FetchAPI";
// import ButtonExtra from "./component/elements/ButtonExtra";
// import HoverText from "./component/elements/HoverText";
// import Toggle from "./component/elements/toggle";

function App() {
  const consoleLog = (e) => {
    console.log(e.target);
  };
  return (
    <div className="h-full">
      {/* <AdminPage></AdminPage> */}
      <HomePage></HomePage>
      {/* <Test></Test> */}
    </div>
  );
}

export default App;
