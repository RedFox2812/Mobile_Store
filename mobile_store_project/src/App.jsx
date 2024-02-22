/* eslint-disable no-unused-vars */
import "./App.css";
import AdminPage from "./component/admin_components/AdminPage";
import Button from "/media/macos/New Volume/git clone/Mobile_Store/mobile_store_project/src/component/elements_component/Button.jsx";
// import ButtonExtra from "./component/elements_component/ButtonExtra";
// import HoverText from "./component/elements_component/HoverText";
// import Toggle from "./component/elements_component/toggle";

function App() {
  const consoleLog = (e) => {
    console.log(e.target);
  };
  return (
    <>
      <AdminPage></AdminPage>
    </>
  );
}

export default App;
