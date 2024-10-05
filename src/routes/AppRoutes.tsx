import { Route, Routes } from "react-router-dom";
import Login from "../pages/public/Auth/Login";
import Register from "../pages/public/Auth/Register";
import Home from "../pages/public/Home/Home";
import Profile from "../pages/user/Profile/Profile";
import AdminDashboard from "../pages/admin/AdminDashboard/AdminDashboard";
import NotFound from "../components/NotFound/NotFound";
import { useAuth } from "../contexts/AuthContext";

const AppRoutes = () => {
  const { isLoggedIn, isAdmin } = useAuth();

  return (
    <Routes>
      <Route path='/home' element={<Home />} />
      
      {isLoggedIn ? (
        <Route path='/profile' element={<Profile />} />
      ) : (
        <>
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
        </>
      )}

      {isAdmin && (
        <Route path='/admin' element={<AdminDashboard />} />
      )}

      <Route path='*' element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
