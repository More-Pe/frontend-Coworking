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
