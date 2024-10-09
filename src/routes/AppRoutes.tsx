import { Route, Routes } from 'react-router-dom';
import Login from '../pages/public/Auth/Login';
import Register from '../pages/public/Auth/Register';
import Home from '../pages/public/Home/Home';
import Profile from '../pages/user/Profile/Profile';
import AdminDashboard from '../pages/admin/AdminDashboard/AdminDashboard';
import NotFound from '../components/NotFound/NotFound';
import Rooms from '../pages/public/Rooms/Rooms';

const AppRoutes = () => {
	return (
		<Routes>
			<Route
				path='/'
				element={<Home />}
			/>
			<Route
				path='/profile'
				element={<Profile />}
			/>
						<Route
				path='/rooms'
				element={<Rooms />}
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
				path='/admin'
				element={<AdminDashboard />}
			/>
			<Route
				path='*'
				element={<NotFound />}
			/>
		</Routes>
	);
};

export default AppRoutes;
