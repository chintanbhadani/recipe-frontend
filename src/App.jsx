import { ToastContainer } from "react-toastify";
import RoutesContainer from "./Routes";
import "./assets/css/index.css";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <ToastContainer />
      <RoutesContainer></RoutesContainer>
    </>
  );
}

export default App;
