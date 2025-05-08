
import fetchClient from './fetchClient';
import type { User, LoginPayload, AuthResponse } from '@/types/authTypes';

const UserApi = {
	/**
	 * Fetches the user data from the API.
	 * 
	 * @async
	 * @returns {Promise<User>} - The user data.
	 */
	getUser: async (): Promise<User> => {
		return fetchClient<User>('/me', { method: 'GET' });
	},

	/**
	 * Authenticates the user with email/phone/username and password.
	 * 
	 * @async
	 * @param credentials - The user's email/phone/username and password.
	 * @returns {Promise<authResponse>} - The authentication response containing user data and access token.
	 */
	login: async (credentials: LoginPayload): Promise<AuthResponse> => {
		return fetchClient<AuthResponse>('/login', {
			method: 'POST',
			body: JSON.stringify(credentials),
		});
	},
};

export default UserApi;
