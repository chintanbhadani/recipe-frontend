import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  const moveToNextStep = (type) => {
    if (type === "individual") {
      navigate("/signup");
    } else if (type === "restaurant") {
      navigate("/signup-restaurant");
    }
  };
  return (
    <>
      <div className="grid grid-cols-1 min-h-screen md:grid-cols-2">
        <div className="bg-[url('src\assets\images\banner.jpg')] bg-no-repeat bg-cover">
          <h1 className="font-bold text-3xl p-5 text-white h-[50vh]">Logo</h1>
        </div>
        <div className="p-5">
          <h1 className="text-center mt-5 mb-3 text-4xl font-semibold">
            Join us
          </h1>
          <p className="text-center text-md font-medium">
            TO begin this journey, tell us what type of account you'd be opening
            {/* <a className="text-red-400">Register here!</a> */}
          </p>
          <div className="mt-5 flex justify-center">
            <div className="md:w-2/3 max-w-sm">
              <button
                type="submit"
                className="bg-red-400 text-2xl font-semibold text-center h-[50px] w-full rounded-md mt-3 text-black"
                onClick={() => {
                  moveToNextStep("individual");
                }}
              >
                Individual
                {/* <span className="">Create account your self</span> */}
              </button>
              <button
                type="submit"
                className="bg-red-400 text-2xl font-semibold text-center h-[50px] w-full rounded-md mt-3 text-white"
                onClick={() => {
                  moveToNextStep("restaurant");
                }}
              >
                Restaurant
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
