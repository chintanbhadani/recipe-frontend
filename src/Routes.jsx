import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignupUser from "./components/SignupUser";
import Login from "./components/login";
import PageList from "./pages/list";
import RecipeList from "./pages/recipeList";
import AuthGuard from "./components/gaurd/AuthGuard";
import RecipeFavList from "./pages/recipeFavorite";
import RecipeShowPage from "./pages/recipeInfo";

const RoutesContainer = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<SignupUser />} />
        <Route path="/" element={<Login />} />
        <Route
          path="/dashboard"
          element={
            <AuthGuard>
              <RecipeList />
            </AuthGuard>
          }
        />
        <Route
          path="/favorite-recipe"
          element={
            <AuthGuard>
              <RecipeFavList />
            </AuthGuard>
          }
        />
        <Route
          path="/recipe/:id"
          element={
            <AuthGuard>
              <RecipeShowPage />
            </AuthGuard>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};
export default RoutesContainer;
