import { Outlet } from "react-router-dom";
import axios from "./axiosinstance";
import Footer from "./Components/Footer/Footer";
import NavBar from "./Components/NavBar/NavBar";

function App() {
  return (
    <>
      <NavBar />
      <Outlet></Outlet>
    </>
  );
}

export default App;
