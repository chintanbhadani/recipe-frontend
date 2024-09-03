// import { Form } from "formik";
import SelectDropDown from "../../helper/dropdown";

const RestaurantForm = ({
  values,
  //   setFieldValue,
  handleSubmit,
  handleChange,
  handleBlur,
}) => {
  console.log("RestaurantForm values :: ", values);
  //   console.log("RestaurantForm values :: ", values);
  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="mt-3">
          <div>
            <label
              htmlFor="name"
              className="block text-lg font-medium  text-gray-900"
            >
              Restaurant Name
            </label>
            <input
              type="text"
              name="name"
              className="border mt-1 border-gray-400 w-full h-[40px] rounded-lg text-lg p-5"
              //   value={values.name}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </div>
          <div>
            <label
              htmlFor="username"
              className="block text-lg font-medium  text-gray-900"
            >
              Phone Number
            </label>
            <input
              type="text"
              name="usename"
              className="border mt-1 border-gray-400 w-full h-[40px] rounded-lg text-lg p-5"
            />
          </div>
          <div>
            <label
              htmlFor="address"
              className="block text-lg font-medium  text-gray-900"
            >
              Restaurant Address
            </label>
            <input
              type="text"
              name="address"
              className="border mt-1 border-gray-400 w-full h-[40px] rounded-lg text-lg p-5"
            />
          </div>
          <div>
            <label
              htmlFor="username"
              className="block text-lg font-medium  text-gray-900"
            >
              Email
            </label>
            <input
              type="text"
              name="usename"
              className="border mt-1 border-gray-400 w-full h-[40px] rounded-lg text-lg p-5"
            />
          </div>
          <div>
            <label
              htmlFor="username"
              className="block text-lg font-medium  text-gray-900"
            >
              Restaurant Description
            </label>
            <input
              type="text"
              name="usename"
              className="border mt-1 border-gray-400 w-full h-[40px] rounded-lg text-lg p-5"
            />
          </div>
          <SelectDropDown value={values?.cuisine_type} />
        </div>
      </form>
    </>
  );
};

export default RestaurantForm;
