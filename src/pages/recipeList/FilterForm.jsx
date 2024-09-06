import { Form } from "formik";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import { INGREDIENTS } from "../../constant";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { onLogout } from "../../services/auth";

const allIngredients = INGREDIENTS.map((ele) => ({ value: ele, label: ele }));

const FilterForm = ({
  values,
  setFieldValue,
  resetForm,
  errors,
  touched,
  dirty,
}) => {
  const loading = useSelector((state) => state.base.loading);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleResetField = () => {
    resetForm();
  };

  const onChangeIngredient = useCallback((selectedItem) => {
    setFieldValue("ingredients", selectedItem);
  }, []);

  return (
    <Form
      id="tabulator-html-filter-form"
      className="flex justify-between items-center align-items-baseline report-form w-full"
    >
      <div className="flex items-center">
        <div className="flex items-center sm:mr-4 py-1" style={{ zIndex: 60 }}>
          <label className="flex-none mr-2 mb-0">Ingredient</label>
          <div
            className="ts-control tom-select w-full"
            style={{ minWidth: "150px" }}
          >
            <Select
              isMulti
              name="ingredients"
              value={values.ingredients}
              options={allIngredients}
              onChange={onChangeIngredient}
              className={`form-control ${
                errors.ingredients && touched.ingredients && "border-danger"
              }`}
              classNamePrefix="select"
            />
          </div>
          {errors.ingredients && touched.ingredients && (
            <div className="text-danger">{errors.ingredients}</div>
          )}
        </div>

        <div className="mt-2 report-action-button flex">
          <button
            id="tabulator-html-filter-go"
            type="submit"
            className="btn btn-primary w-auto px-4"
            disabled={loading || !dirty}
          >
            Go
          </button>
          <button
            id="tabulator-html-filter-reset"
            type="button"
            className="btn btn-secondary w-16 ml-2"
            onClick={handleResetField}
            disabled={!dirty}
          >
            Reset
          </button>
          <button
            id="tabulator-html-filter-go"
            type="button"
            className="btn btn-primary w-auto px-4 ml-5"
            onClick={() => {
              navigate("/favorite-recipe");
            }}
          >
            Show favorite recipe
          </button>
        </div>
      </div>

      <div className="flex items-center">
        <button
          id="logout"
          type="button"
          className="btn btn-danger w-auto px-4"
          onClick={() => {
            // navigate("/");
            onLogout(dispatch, navigate);
          }}
        >
          Logout
        </button>
      </div>
    </Form>
  );
};

export default FilterForm;
