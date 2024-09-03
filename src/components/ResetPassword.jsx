import { Form, Formik } from "formik";
import { useDispatch } from "react-redux";
import { resetPassword } from "../services/auth";
import {
  forgotPasswordValidation,
  resetPasswordValidation,
} from "../helper/validation";
import { useParams } from "react-router-dom";

const ResetPassword = () => {
  const initialValues = {
    password: "",
    confirm_password: "",
  };

  const dispatch = useDispatch();
  const { token } = useParams();

  const onSubmit = async (values) => {
    const payload = {
      token: token,
      password: values.password,
    };
    await resetPassword(payload, dispatch);
  };
  return (
    <>
      <div className="grid grid-cols-1 min-h-screen md:grid-cols-2">
        <div className="bg-[url('src\assets\images\banner.jpg')] bg-no-repeat bg-cover">
          <h1 className="font-bold text-3xl p-5 text-white h-[50vh]">Logo</h1>
        </div>
        <div className="p-5">
          <h1 className="text-center mt-5 mb-3 text-4xl font-semibold">
            Reset Password
          </h1>
          <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            validationSchema={resetPasswordValidation}
          >
            {({ values, handleChange, errors, touched }) => (
              <Form>
                <div className="mt-5 flex justify-center">
                  <div className="md:w-2/3 max-w-sm">
                    <div>
                      <label
                        htmlFor="password"
                        className="block text-lg font-medium  text-gray-900 mt-3"
                      >
                        Password
                      </label>
                      <input
                        name="password"
                        value={values.password}
                        onChange={handleChange}
                        className="border mt-1 border-gray-400 w-full h-[40px] rounded-lg text-lg p-5"
                      />
                    </div>
                    {errors.password && touched.password && (
                      <p
                        id="standard_error_help"
                        className="mt-2 text-xs text-red-600 dark:text-red-400 italic"
                      >
                        {errors.password}
                      </p>
                    )}
                    <div>
                      <label
                        htmlFor="confirm_password"
                        className="block text-lg font-medium  text-gray-900 mt-3"
                      >
                        Confirm Password
                      </label>
                      <input
                        name="confirm_password"
                        value={values.confirm_password}
                        onChange={handleChange}
                        className="border mt-1 border-gray-400 w-full h-[40px] rounded-lg text-lg p-5"
                      />
                    </div>
                    {errors.confirm_password && touched.confirm_password && (
                      <p
                        id="standard_error_help"
                        className="mt-2 text-xs text-red-600 dark:text-red-400 italic"
                      >
                        {errors.confirm_password}
                      </p>
                    )}
                    <button
                      type="submit"
                      className="bg-red-400 text-2xl font-semibold text-center h-[50px] w-full rounded-md mt-3 text-white"
                    >
                      Reset Password
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

export default ResetPassword;
