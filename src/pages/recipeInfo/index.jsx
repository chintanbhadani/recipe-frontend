import { useEffect } from "react";
import { useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import Loading from "../../container/Loading";

const RecipeShowPage = () => {
  const { id } = useParams(); // Get the recipe ID from the URL
  const recipeUrl = `https://api.spoonacular.com/recipes/${id}/information?apiKey=${import.meta.env.VITE_API_KEY || "baf2d6aaa0b34d3fba0adcd5d6642c30"}`; // Construct the URL for fetching recipe details

  const { res: recipe, fetchApi } = useFetch(recipeUrl);

  // Use effect to refetch if needed
  useEffect(() => {
    fetchApi();
  }, [id]);

  return (
    <>
      {recipe ? (
        <div className="container mx-auto p-5">
          {/* Recipe Title Section */}
          <div className="intro-y box p-5 sm:py-10 mt-5 bg-white shadow-md rounded-lg">
            <h1 className="text-2xl font-bold mb-3">{recipe.title}</h1>
            <img
              src={recipe.image}
              alt={recipe.title}
              className="w-full h-64 object-cover rounded-md"
            />
          </div>

          {/* Recipe Details Section */}
          <div className="intro-y box mt-5 bg-white shadow-md rounded-lg p-5">
            <h2 className="text-xl font-semibold mb-4">Recipe Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Recipe Title and Summary */}
              <div className="mb-4">
                <p dangerouslySetInnerHTML={{ __html: recipe?.summary }} />
              </div>
              <div>
                <h3 className="font-medium">Preparation Time:</h3>
                <p>
                  {recipe.preparationMinutes
                    ? `${recipe?.preparationMinutes} minutes`
                    : "N/A"}
                </p>
              </div>
              <div>
                <h3 className="font-medium">Cooking Time:</h3>
                <p>
                  {recipe?.cookingMinutes
                    ? `${recipe?.cookingMinutes} minutes`
                    : "N/A"}
                </p>
              </div>
              <div>
                <h3 className="font-medium">Servings:</h3>
                <p>{recipe?.servings}</p>
              </div>
              <div>
                <h3 className="font-medium">Health Score:</h3>
                <p>{recipe?.healthScore}</p>
              </div>
            </div>
          </div>

          {/* Ingredients Section */}
          <div className="intro-y box mt-5 bg-white shadow-md rounded-lg p-5">
            <h2 className="text-xl font-semibold mb-4">Ingredients</h2>
            <ul className="space-y-3">
              {recipe?.extendedIngredients?.map((ingredient, index) => (
                <li key={index} className="flex items-center space-x-3">
                  <img
                    src={`https://spoonacular.com/cdn/ingredients_100x100/${ingredient.image}`}
                    alt={ingredient?.name}
                    className="w-12 h-12 object-cover rounded-full"
                    style={{ width: "50px", height: "50px" }}
                  />
                  <span>{ingredient?.original}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
};

export default RecipeShowPage;
