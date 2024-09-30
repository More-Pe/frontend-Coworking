import { Route, Routes } from "react-router-dom";
import Login from "../pages/public/Auth/Login";
import Register from "../pages/public/Auth/Register";
import Home from "../pages/public/Home/Home";
import Profile from "../pages/user/Profile/Profile";
import AdminDashboard from "../pages/admin/AdminDashboard/AdminDashboard";
import NotFound from "../components/NotFound/NotFound";

const AppRoutes = () => {
  return (
    <>
<Routes>
				<Route
					path='*'
					element={<NotFound />}
				/>
				<Route
					path='/'
					element={<Home />}
				/>
				<Route
					path='/login'
					element={<Login />}
				/>
				<Route
					path='/register'
					element={<Register />}
				/>
				<Route
					path='/profile'
					element={<Profile />}
				/>
				<Route
					path='/admin'
					element={<AdminDashboard />}
				/>

			</Routes>
    </>
  );
};

export default AppRoutes;