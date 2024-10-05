export interface Passport {
	token: string;
	tokenData: {
		role: string;
	};
}

export interface AuthContextType {
	token: string | null;
	isLoggedIn: boolean;
	isAdmin: boolean;
	setSessionData: (passport: Passport) => void;
	logout: () => void;
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