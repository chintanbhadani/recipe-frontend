import store from "../../store/Store";
import { Navigate } from "react-router-dom";

const AuthGuard = ({ children }) => {
  const { base } = store.getState();

  console.log(" ==>  base.token  :: ", base.token);
  if (!base.token) {
    return <Navigate to="/" />;
  }

  return <>{children}</>;
};

export default AuthGuard;
