import { Form, Formik } from "formik";
import { useDispatch } from "react-redux";
import { onLogin } from "../services/auth";
import { useNavigate } from "react-router-dom";
import { onLoginValidation } from "../helper/validation";

const Login = () => {
  const initialValues = {
    email: "",
    password: "",
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    const payload = {
      email: values.email,
      password: values.password,
    };
    await onLogin(payload, dispatch, navigate);
  };

  return (
    <>
      <div className="flex flex-col lg:flex-row min-h-screen">
        {/* Left Side - Recipe Banner */}
        <div
          className="hidden lg:flex flex-col bg-cover bg-no-repeat bg-center min-h-full w-full lg:w-1/2"
          style={{
            backgroundImage: "url('src/assets/images/recipe-banner.jpg')",
          }}
        >
          <div className="my-auto text-center">
            {/* Placeholder for Logo */}
            {/* <div className="flex justify-center">
              <img
                alt="Recipe Finder Logo"
                className="w-1/3 mx-auto"
                src="src/assets/images/recipe-logo.png"
              />
            </div> */}
            <h1 className="text-white text-4xl font-semibold mt-8">
              Discover Delicious Recipes
            </h1>
            <p className="text-white text-lg mt-4 opacity-80">
              Find recipes from all over the world and start cooking your
              favorites today!
            </p>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="flex flex-col justify-center p-10 bg-white lg:w-1/2">
          <h2 className="text-center text-3xl font-bold mb-6">
            Welcome to Recipe Finder
          </h2>
          <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            validationSchema={onLoginValidation}
          >
            {({ values, handleChange, errors, handleBlur, touched }) => (
              <Form className="w-full max-w-sm mx-auto">
                <div className="mb-4">
                  <label
                    htmlFor="email"
                    className="block text-lg font-medium text-gray-900"
                  >
                    Email
                  </label>
                  <input
                    type="text"
                    name="email"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`form-control block w-full px-4 py-3 mt-1 ${
                      errors.email && touched.email
                        ? "border-danger"
                        : "border-gray-300"
                    } rounded-md`}
                    placeholder="Enter email"
                  />
                  {errors.email && touched.email && (
                    <div className="text-danger mt-2">{errors.email}</div>
                  )}
                </div>

                <div className="mb-6">
                  <label
                    htmlFor="password"
                    className="block text-lg font-medium text-gray-900"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`form-control block w-full px-4 py-3 mt-1 ${
                      errors.password && touched.password
                        ? "border-danger"
                        : "border-gray-300"
                    } rounded-md`}
                    placeholder="Enter password"
                  />
                  {errors.password && touched.password && (
                    <div className="text-danger mt-2">{errors.password}</div>
                  )}
                </div>

                <button
                  type="submit"
                  className="w-full bg-gray-800 text-white py-3 rounded-md font-semibold text-lg hover:bg-gray-900"
                  style={{
                    appearance: "none", // Ensures no default styling overrides
                    backgroundColor: "#1f2937", // Equivalent to bg-gray-800
                    color: "#ffffff", // Ensures the text is white
                  }}
                >
                  Sign in
                </button>

                <p className="text-center text-md font-medium mt-4">
                  Don't have an account?{" "}
                  <a
                    onClick={() => navigate("/signup")}
                    className="text-green-600 cursor-pointer"
                  >
                    Register here!
                  </a>
                </p>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </>
  );
};

export default Login;
