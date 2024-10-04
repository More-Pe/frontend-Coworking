import AppRoutes from './routes/AppRoutes';
import { AuthProvider } from './contexts/AuthProvider';
import NavBar from './components/Navbar/Navbar';
import './App.css';

function App() {
	return (
			<AuthProvider>
				<NavBar />
				<AppRoutes />
			</AuthProvider>
	);
}

export default App;
