import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ element, userType }) => {
  const token = userType === "worker" 
    ? localStorage.getItem("workerToken") 
    : localStorage.getItem("userToken");

  return token ? element : <Navigate to={userType === "worker" ? "/login-jobs" : "/login"} />;
};

export default ProtectedRoute;
