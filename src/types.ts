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