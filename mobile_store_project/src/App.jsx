/* eslint-disable no-unused-vars */
import "./App.css";
import AdminPage from "./component/admin_components/AdminPage";
// import FetchAPI from "./data/FetchAPI";
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
