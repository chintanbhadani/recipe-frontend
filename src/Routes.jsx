import { BrowserRouter, Routes, Route } from "react-router-dom";
import ExcelDataList from "./pages/excelData";
import SignupRestaurant from "./components/SignupRestaurant";
import SignupUser from "./components/SignupUser";
import Login from "./components/login";

const RoutesContainer = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path="/" element={<ExcelDataList />} /> */}
        <Route path="/signup" element={<SignupUser />} />
        <Route path="/" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
};
export default RoutesContainer;
