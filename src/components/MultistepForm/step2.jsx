const Step2 = ({
  errors,
  values,
  handleChange,
  handleBlur,
  touched,
  step,
  nextStep,
  prevStep,
}) => {
  return (
    <div className="mt-5 flex justify-center">
      <div className="md:w-2/3 max-w-sm">
        <div>
          <label
            htmlFor="email"
            className="block text-lg font-medium  text-gray-900"
          >
            Email{" "}
          </label>
          <input
            type="text"
            name="email"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
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
        <p className="py-2">
          Use 8 or more characters with a mix of letters, numbers and symbols.
        </p>
        <button
          onClick={nextStep}
          className="bg-red-400 text-2xl font-semibold text-center h-[50px] w-full rounded-md mt-3 text-white"
        >
          Next
        </button>
        <button
          onClick={prevStep}
          className="bg-red-400 text-2xl font-semibold text-center h-[50px] w-full rounded-md mt-3 text-white"
        >
          Previous
        </button>
        <div className="flex items-center">
          <div className="flex-1 border-t-2 border-gray-200"></div>
          <span className="px-3 text-md text-slate-400 text-center my-3">
            or login with
          </span>
          <div className="flex-1 border-t-2 border-gray-200"></div>
        </div>
        {/* <div className="flex justify-center items-center">
          <a className="w-12 h-12 rounded-md border border-slate-300 flex items-center justify-center cursor-pointer">
            <FcGoogle className="text-2xl" />
          </a>
          <a className="w-12 h-12 rounded-md border border-slate-300 flex items-center justify-center mx-5 cursor-pointer">
            <MdFacebook className="text-2xl text-cyan-600" />
          </a>
          <a className="w-12 h-12 rounded-md border border-slate-300 flex items-center justify-center cursor-pointer">
            <BsApple className="text-xl" />
          </a>
        </div> */}
      </div>
    </div>
  );
};
export default Step2;
