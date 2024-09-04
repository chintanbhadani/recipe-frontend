import { Form } from "formik";
import { useSelector } from "react-redux";
import Select from "react-select";
import { INGREDIENTS } from "../../constant";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";

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

  const handleResetField = () => {
    resetForm();
  };

  const onChangeIngredient = useCallback((selectedItem) => {
    setFieldValue("ingredients", selectedItem);
  }, []);

  return (
    <Form
      id="tabulator-html-filter-form"
      className="flex flex-wrap items-center align-items-baseline report-form"
    >
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

      <div className="mt-2 report-action-button">
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
          type="submit"
          className="btn btn-primary w-auto px-4 ml-5"
          onClick={() => {
            navigate("/favorite-recipe");
          }}
        >
          Show favorite recipe
        </button>
      </div>
    </Form>
  );
};

export default FilterForm;
