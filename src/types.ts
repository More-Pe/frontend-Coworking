import { SelectChangeEvent } from "@mui/material";

export interface CustomJwtPayload {
	person_id: number;
	role: string;
	email: string;
}

export interface Passport {
	token: string;
	tokenData: CustomJwtPayload;
}

export interface AuthContextType {
	token: string | null;
	isLoggedIn: boolean;
	isVisitor: boolean;
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

export interface AdministrationLabelProps {
	token: string;
}

export interface DailyReportResponse {
	report_date: Date;
	total_accesses: {
		count: number;
		persons: Array<{
			user_id: number;
			first_name: string;
			last_name: string;
			startup: string;
			last_access: Date;
		}>;
	};
	total_absences: number;
	frequent_users: number;
	infrequent_users: number;
	peak_hour: string;
	accesses_by_room: { [key: string]: number };
}

export interface DailyReportProps {
	data: DailyReportResponse;
}

export interface PeriodReportProps {
	data: DailyReportResponse[];
	page: number;
	totalPages: number;
	onPageChange: (event: React.ChangeEvent<unknown>, value: number) => void;
}

export interface RoomUsageData {
	room_name: string;
	totalUses: number;
	averageStay: string;
	absences: number;
	peakHour: string;
	longestPeriodWithoutUse: string;
}

export interface RoomUsageReportProps {
	data: RoomUsageData[];
}

export interface ProgramSelectProps {
	programs: string[];
	value: string;
	onChange: (event: SelectChangeEvent<string>) => void;
}

export interface StartupSelectProps {
	value: number | undefined | string;
	onChange: (event: SelectChangeEvent<number>) => void;
	disabled?: boolean;
  }
