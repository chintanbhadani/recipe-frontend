import Uploader from "../../helper/Uploader";
import ImageComponent from "./ImageComponent";
import restaurantBanner from "../../assets/images/restaurant.jpg";
import { Form, Formik } from "formik";
import RestaurantForm from "./Form";
// import { useState } from "react";

const Setting = () => {
  const initialValues = {
    name: "",
    address: "",
    city: "",
    pin_code: "",
    gst_no: "",
    reg_no: "",
    logo: "",
    cuisine_type: "",
  };

  // const [state, setState] = useState(initialValue);
  return (
    <>
      <div className="flex flex-col m-5">
        <div className="flex flex-row justify-center">
          <div className="md:w-2/3 max-w-sm">
            <div className="h-32">
              {/* <img src={restaurantBanner}></img> */}
            </div>
          </div>
        </div>
        <div className="mt-5 flex justify-center">
          <div className="md:w-2/3 max-w-sm">
            <Formik
              initialValues={initialValues}
              // validationSchema={userSignUpValidation}
              // onSubmit={onSubmit}
            >
              {(props) => <RestaurantForm {...props} />}
            </Formik>
          </div>
        </div>

        <div className="mt-5 flex justify-center">
          <div className="md:w-2/3 max-w-sm">
            <div className="mt-5">
              <h1>Upload photo</h1>
              <Uploader />
            </div>
            <div className="flex flex-row flex-wrap gap-5 mt-5">
              <ImageComponent />
              <ImageComponent />
              <ImageComponent />
              <ImageComponent />
            </div>
          </div>
        </div>

        <div className="mt-5 flex justify-center">
          <div className="md:w-2/3 max-w-sm">
            <div className="mt-5 flex justify-between">
              <h1>Professional Information</h1>
              <span className="">Edit</span>
            </div>
            <div className="mt-3">
              <div>
                <label
                  htmlFor="username"
                  className="block text-lg font-medium  text-gray-900"
                >
                  Username{" "}
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
                  Username{" "}
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
                  Username{" "}
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
                  Username{" "}
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
                  Username{" "}
                </label>
                <input
                  type="text"
                  name="usename"
                  className="border mt-1 border-gray-400 w-full h-[40px] rounded-lg text-lg p-5"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Setting;
