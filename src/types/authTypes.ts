/**
 * User represents a basic authenticated user object.
 */
export interface User {
	id: number;
	name: string;
	email: string;
	phone?: string;
	username?: string;
}

/**
 * LoginPayload ensures mutual exclusivity for login via email, phone, or username.
 * Only one of the three fields should be provided, along with a password.
 */
export type LoginPayload = {
	password: string;
} & (
		| { email: string; username?: never; phone?: never }
		| { username: string; email?: never; phone?: never }
		| { phone: string; email?: never; username?: never }
	);

/**
 * AuthState defines the shape of the authentication slice in Redux.
 */
export interface AuthState {
	user: User | null;
	accessToken: string | null;
	loading: boolean;
	error: string | null;
	errorVisible: boolean;
}

/**
 * Represents the response received after a successful authentication request.
 */
export interface AuthResponse extends User {
	accessToken: string;
}
