const Host = import.meta.env.VITE_BACKEND_API;

export const API = {
  login: `/auth/login`,
  user_signup: `/auth/signup`,
  user: "https://api.slingacademy.com/v1/sample-data/users",
  recipe: "https://api.spoonacular.com/recipes/findByIngredients",
  addFavorite: "/favorites",
  getFavorite: `${Host}/favorites`,
  // getRecipeInfo: "https://api.spoonacular.com/recipes/:id/information"
};
