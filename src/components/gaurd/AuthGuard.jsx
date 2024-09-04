import store from "../../store/Store";
import { Navigate } from "react-router-dom";

const AuthGuard = ({ children }) => {
  const { base } = store.getState();

  if (!base.token) {
    return <Navigate to="/" />;
  }

  return <>{children}</>;
};

export default AuthGuard;
