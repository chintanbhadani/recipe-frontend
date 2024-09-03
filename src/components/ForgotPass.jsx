import { Form, Formik } from "formik";
import { useDispatch } from "react-redux";
import { forgotPassword } from "../services/auth";
import { forgotPasswordValidation } from "../helper/validation";

const ForgotPass = () => {
  const initialValues = {
    email: "",
  };

  const dispatch = useDispatch();

  const onSubmit = async (values) => {
    await forgotPassword(values, dispatch);
  };
  return (
    <>
      <div className="grid grid-cols-1 min-h-screen md:grid-cols-2">
        <div className="bg-[url('src\assets\images\banner.jpg')] bg-no-repeat bg-cover">
          <h1 className="font-bold text-3xl p-5 text-white h-[50vh]">Logo</h1>
        </div>
        <div className="p-5">
          <h1 className="text-center mt-5 mb-3 text-4xl font-semibold">
            Forgot Password
          </h1>
          <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            validationSchema={forgotPasswordValidation}
          >
            {({ values, handleChange, errors, handleBlur, touched }) => (
              <Form>
                <div className="mt-5 flex justify-center">
                  <div className="md:w-2/3 max-w-sm">
                    <div>
                      <label
                        htmlFor="username"
                        className="block text-lg font-medium  text-gray-900"
                      >
                        email
                      </label>
                      <input
                        type="text"
                        name="email"
                        value={values.email}
                        onChange={handleChange}
                        className="border mt-1 border-gray-400 w-full h-[40px] rounded-lg text-lg p-5"
                      />
                    </div>
                    {errors.email && touched.email && (
                      <p
                        id="standard_error_help"
                        className="mt-2 text-xs text-red-600 dark:text-red-400 italic"
                      >
                        {errors.email}
                      </p>
                    )}
                    <button
                      type="submit"
                      className="bg-red-400 text-2xl font-semibold text-center h-[50px] w-full rounded-md mt-3 text-white"
                    >
                      Verify email
                    </button>
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </>
  );
};

export default ForgotPass;
