import type { FetchOptions } from '@/types/commonTypes';
import { API_BASE_URL } from '@/config/apiConfig';
import { tokenStorage, getErrorMessage } from '@/utils';

/**
 * Handles API requests with base URL and default headers.
 * 
 * @async
 * @param endpoint - API endpoint
 * @param options - Fetch options (method, headers, body, etc.)
 * @returns Promise<T>
 */
const fetchClient = async <T>(endpoint: string, options: FetchOptions = {}): Promise<T> => {
	const url = `${API_BASE_URL}${endpoint}`;
	const defaultHeaders: HeadersInit = {
		'Content-Type': 'application/json',
	};

	const accessToken = tokenStorage.get();

	if ((window.location.hostname === 'localhost') && accessToken) {
		defaultHeaders['Authorization'] = `Bearer ${accessToken}`;
	}

	const config: FetchOptions = {
		...options,
		headers: {
			...defaultHeaders,
			...options.headers,
		},
	};

	try {
		const response = await fetch(url, config);

		if (!response.ok) {
			const errorData = await response.json();
			throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
		}

		return response.json();
	} catch (error: unknown) {
		const message = getErrorMessage(error);
		console.error('Fetch API error:', message);
		throw error;
	}
};

export default fetchClient;
