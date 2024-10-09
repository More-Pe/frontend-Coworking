export interface CustomJwtPayload {
	role: string;
}

export interface Passport {
	token: string;
	tokenData: CustomJwtPayload;
}

export interface AuthContextType {
	token: string | null;
	isLoggedIn: boolean;
	isUser: boolean;
	isAdmin: boolean;
	setSessionData: (passport: Passport) => void;
	logout: () => void;
	passport: Passport | null;
}

export interface FormRegister {
	firstName: string;
	lastName?: string;
	startup: string;
	dni?: string;
	phone?: string;
	email: string;
	password: string;
}

export interface FormLogin {
	email: string;
	password: string;
}

export interface CSurferProps {
	content: React.ReactNode;
	path: string;
	className?: string;
}

export interface User {
	person_id: number;
	role: string;
	first_name: string;
	last_name: string;
	startup: string;
	email: string;
	password: string;
	dni?: string | null;
	phone?: string | null;
	frequency_status: string;
}

export interface Startup {
	startup_id: number;
	name: string;
	description: string;
	program: string;
}

export interface Room {
	room_id: number;
	room_name: string;
	capacity: number;
	room_type: string;
}
