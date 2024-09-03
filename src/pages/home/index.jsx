import { useDispatch } from "react-redux";
import { onLogout } from "../../services/auth";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <div className="m-5">
      <div className="flex justify-end">
        <button
          className="bg-red-600 p-2 rounded-md"
          onClick={() => {
            onLogout(dispatch, navigate);
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Home;
