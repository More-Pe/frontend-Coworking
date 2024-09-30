import AppRoutes from './routes/AppRoutes';
import { AuthProvider } from './contexts/AuthProvider';
import './App.css';

function App() {
	return (
		<>
			<AuthProvider>
				<AppRoutes />
			</AuthProvider>
		</>
	);
}

export default App;
