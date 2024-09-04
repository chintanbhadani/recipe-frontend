import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignupUser from "./components/SignupUser";
import Login from "./components/login";
import PageList from "./pages/list";
import RecipeList from "./pages/recipeList";

const RoutesContainer = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path="/" element={<ExcelDataList />} /> */}
        <Route path="/signup" element={<SignupUser />} />
        <Route path="/" element={<Login />} />
        <Route path="/list-old" element={<PageList />} />
        <Route path="/list" element={<RecipeList />} />
      </Routes>
    </BrowserRouter>
  );
};
export default RoutesContainer;
