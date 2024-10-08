import { API } from "../../axios/api";
import CustomTable from "../../helper/newTable/CustomTable";
import useTable from "../../hooks/useTable";
import { Formik } from "formik";
import FilterForm from "./FilterForm";
// import data from "../../../src/helper/test.json";
import { Tooltip } from "react-tooltip";
import { Eye, Heart } from "react-feather";
import { useNavigate } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import dataService from "../../axios/dataService";
import { successToast } from "../../helper/toast";
import { errorHandler } from "../../helper/handleError";
import RatingModal from "../../components/Modal/RatingModel";
const initialValue = {
  ingredients: [],
};

const RecipeList = () => {
  const navigate = useNavigate();

  const [recipe, setRecipe] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const jobTimeTable = useTable("relieverJobHours", API.recipe, false, {
    apiKey: import.meta.env.VITE_API_KEY || "baf2d6aaa0b34d3fba0adcd5d6642c30",
    ingredients: "carrots,tomatoes",
  });

  // const jobTimeTable = data;

  const addToFavorite = useCallback(async (record) => {
    try {
      const payload = {
        recipeId: record.id.toString(),
        recipeName: record.title,
        recipeImage: record.image,
        recipeSummary: record.title,
        ingredients: [
          ...record.missedIngredients.map((ingredient) => ingredient.name),
          ...record.usedIngredients.map((ingredient) => ingredient.name),
        ],
      };
      const response = await dataService.post(API.addFavorite, payload);

      successToast(response.data.message);
    } catch (error) {
      return errorHandler(error);
    }
  }, []);

  const onAddRating = useCallback((record) => {
    setRecipe(record);
    setIsOpen(true);
  }, []);

  const ratingModalCancel = () => {
    setIsOpen(false);
  };

  const jobTimeCols = [
    {
      title: "#",
      key: "id",
      render: (record, srNo) => {
        return <span>{srNo}</span>;
      },
    },
    {
      title: "NAME",
      key: "name",
      sortable: false,
      render: (record) => {
        return <span>{record?.title}</span>;
      },
    },
    {
      title: "INGREDIENTS",
      key: "ingredients",
      sortable: false,
      render: (record) => {
        const ingredients = record?.usedIngredients
          ?.map((ingredient) => ingredient.name)
          .join(", ");
        return <span>{ingredients}</span>;
      },
    },
    {
      title: "IMAGE",
      key: "imaage",
      sortable: false,
      render: (record) => {
        // Display the image using the img tag
        return (
          <img
            src={
              record?.image ||
              "https://img.spoonacular.com/recipes/663559-312x231.jpg"
            } // Use a default image or record image
            alt={record?.job?.centreForJob?.centreName || "Image"} // Provide a meaningful alt text
            style={{ width: "100px", height: "auto" }} // Adjust the size as needed
          />
        );
      },
    },
    {
      title: "ACTION",
      key: "action",
      render: (record) => {
        return (
          <>
            <div className="flex justify-center items-center text-primary">
              <Tooltip id="simpleTooltipEditDeleteAgeGroup" place="top" />
              <div
                className="flex items-center mr-3 cursor-pointer"
                data-tooltip-id="simpleTooltipEditDeleteAgeGroup"
                data-tooltip-content={"Add to favorite"}
                onClick={() => addToFavorite(record)}
              >
                <Heart className="w-4 h-4 mr-1" />
              </div>
              <Tooltip id="simpleTooltipEditDeleteAgeGroup" place="top" />
              <div
                className="flex items-center mr-3 cursor-pointer"
                data-tooltip-id="simpleTooltipEditDeleteAgeGroup"
                data-tooltip-content={"View recipe"}
                onClick={() => navigate(`/recipe/${record?.id}`)}
              >
                <Eye className="w-4 h-4 mr-1" />
              </div>
              <div
                className="flex items-center mr-3 cursor-pointer"
                data-tooltip-id="simpleTooltipEditDeleteAgeGroup"
                data-tooltip-content={"Add review"}
                onClick={() => onAddRating(record)}
              >
                Add rating
              </div>
              <div
                className="flex items-center mr-3 cursor-pointer"
                data-tooltip-id="simpleTooltipEditDeleteAgeGroup"
                data-tooltip-content={"View review"}
                onClick={() => navigate(`/rating/${record?.id}`)}
              >
                View rating
              </div>
            </div>
          </>
        );
      },
    },
  ];

  const onSearch = (values) => {
    const metaFilters = {};
    if (values.ingredients && values.ingredients.length > 0) {
      metaFilters.ingredients = values.ingredients
        .map((ingredient) => ingredient.value) // Extract the 'value' from each ingredient
        .join(","); // Join the values into a comma-separated string
    }

    jobTimeTable.onSearch("", metaFilters);
  };

  useEffect(() => {
    const handleScroll = () => {

      console.log("  window.innerHeight  :: ", window.innerHeight);
      console.log("  document.documentElement.scrollTop  :: ", document.documentElement.scrollTop);
      console.log("  document.documentElement.scrollHeight  :: ", document.documentElement.scrollHeight);
      
      if (
        window.innerHeight + document.documentElement.scrollTop + 1 >=
        document.documentElement.scrollHeight
      ) {
        jobTimeTable.loadMore();
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [jobTimeTable]);

  return (
    <>
      <RatingModal
        isOpen={isOpen}
        handleCancel={ratingModalCancel}
        recipeId={recipe?.id}
      />
      <div className="grid grid-cols-12 gap-6 mt-5">
        <CustomTable
          cols={jobTimeCols}
          data={jobTimeTable.tableData ?? []}
          tableKey="id"
          reload={jobTimeTable.fetchApi}
          currentOrder={jobTimeTable.currentOrder}
          error={jobTimeTable.error}
          loading={jobTimeTable.loading}
          tableOffset={jobTimeTable.tableOffset}
          onSetOrderBy={jobTimeTable.onSetOrderBy}
          component={
            <>
              <Formik
                initialValues={initialValue}
                enableReinitialize
                onSubmit={onSearch}
              >
                {(props) => <FilterForm {...props} />}
              </Formik>
            </>
          }
        />
      </div>
    </>
  );
};

export default RecipeList;
