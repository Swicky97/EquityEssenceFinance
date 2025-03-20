import Navbar from "./Components/Navbar/Navbar";
import { ToastContainer } from "react-toastify";
import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import AppRoutes from "./Routes/AppRoutes";

function App() {
  return (
    <>
        <Navbar />
        <AppRoutes />
        <ToastContainer />
    </>
  );
}

export default App;
