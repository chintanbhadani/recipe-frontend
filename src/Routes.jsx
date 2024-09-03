import { BrowserRouter, Routes, Route } from "react-router-dom";
import ExcelDataList from "./pages/excelData";

const RoutesContainer = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ExcelDataList />} />
      </Routes>
    </BrowserRouter>
  );
};
export default RoutesContainer;
