import { ACCESS_KEY } from '@/config/apiConfig';
import type { CleanupFn } from '@/types/clockTypes';

/**
 * Detects the type of user input as either an email, phone number, or username.
 *
 * This function uses regular expressions to determine if the input string
 * matches the format of an email or a US/Taiwan phone number. If it matches neither,
 * it is treated as a username by default.
 *
 * @param input - A user-provided string which could be an email, phone number, or username.
 * @returns One of the strings: 'email', 'phone', or 'username'.
 */
export const detectInputType = (input: string): 'email' | 'phone' | 'username' => {
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	const usOrTwPhoneRegex = /^(?:\+1[\s.-]?)?(?:\(?\d{3}\)?[\s.-]?)?\d{3}[\s.-]?\d{4}$|^(?:\+886[\s-]?|0)(?:9\d{8}|[2-8]\d{7,8})$/;
	if (emailRegex.test(input)) return 'email';
	if (usOrTwPhoneRegex.test(input)) return 'phone';
	return 'username';
};

/**
 * Converts a given timestamp to the local time in the specified time zone.
 *
 * @param timestamp - The timestamp in milliseconds to convert (e.g., from Date.now()).
 * @param timeZone - The IANA time zone identifier (e.g., 'Asia/Taipei').
 * @returns An object containing the hour, minute, and second as numbers in the target time zone.
 */
export const getTimeInZone = (
	timestamp: number,
	timeZone: string
): { hour: number; mins: number; secs: number } => {
	const date = new Date(timestamp);
	const formatter = new Intl.DateTimeFormat('en-US', {
		hour: 'numeric',
		minute: 'numeric',
		second: 'numeric',
		hour12: false,
		timeZone
	});

	// Format the date into a time string, split it into parts, and convert each part to a number
	const [hour, mins, secs] = formatter
		.format(date)  // e.g., "14:23:45"
		.split(':')
		.map((part) => parseInt(part, 10));  // → [14, 23, 45]

	return { hour, mins, secs };
};

/**
 * Returns the current formatted date in the target time zone.
 * 
 * @param {string} timeZone - The IANA time zone string (e.g., 'Asia/Taipei').
 * @param {Date} date - The date to be formatted.
 * @returns {string} - The formatted date string in the 'en-CA' locale (YYYY-MM-DD).
 */
export const getFormattedDate = (timeZone: string, date: Date): string => {
	return new Intl.DateTimeFormat('en-CA', {
		timeZone,
		year: 'numeric',
		month: '2-digit',
		day: '2-digit',
	}).format(date);
};

/**
 * Calculates the UTC timestamp for the next midnight in the given IANA time zone.
 *
 * This uses `Intl.DateTimeFormat` to get the current date in the target time zone,
 * then constructs a new Date object for midnight of the next day.
 *
 * @param tz - The IANA time zone string (e.g., 'Asia/Taipei').
 * @returns The UTC timestamp (in milliseconds) for the next midnight in that time zone.
 */
const getNextMidnightTimestamp = (tz: string): number => {
	const now = new Date();
	const parts = new Intl.DateTimeFormat('en-US', {
		timeZone: tz,
		year: 'numeric',
		month: 'numeric',
		day: 'numeric',
		hour12: false,
	}).formatToParts(now);

	const year = Number(parts.find(p => p.type === 'year')?.value);
	const month = Number(parts.find(p => p.type === 'month')?.value) - 1;
	const day = Number(parts.find(p => p.type === 'day')?.value) + 1;

	return Date.UTC(year, month, day);
};

/**
 * Schedules a callback to run at the next midnight in the specified IANA time zone.
 * 
 * Also sets up a fallback interval that checks every minute to detect missed date changes 
 * (e.g. due to browser throttling or tab inactivity).
 *
 * @param tz - The IANA time zone string (e.g., 'Asia/Taipei').
 * @param callback - A function to invoke when the date changes at local midnight.
 * @returns A cleanup function to cancel the scheduled timeout and fallback interval.
 */
const scheduleMidnightUpdate = (tz: string, callback: (tz: string) => void): CleanupFn => {
	const nextMidnight = getNextMidnightTimestamp(tz);
	const delay = nextMidnight - Date.now();

	let timeoutId: ReturnType<typeof setTimeout> | null = null;
	let fallbackId: ReturnType<typeof setInterval> | null = null;

	const schedule = (): CleanupFn => {
		timeoutId = setTimeout(() => {
			callback(tz);
			const reschedule = schedule();
			cleanup = reschedule;
		}, delay);

		fallbackId = setInterval(() => {
			const currentDate = new Date().toLocaleDateString('en-US', { timeZone: tz });
			const checkDate = new Date().toLocaleDateString('en-US', {
				timeZone: tz,
				timeZoneName: 'short',
			});
			if (currentDate !== checkDate) {
				callback(tz);
			}
		}, 60_000);

		let cleanup: CleanupFn = () => {
			if (timeoutId) clearTimeout(timeoutId);
			if (fallbackId) clearInterval(fallbackId);
		};

		return cleanup;
	};

	return schedule();
};

/**
 * Schedules midnight update callbacks for multiple time zones.
 *
 * This function sets up both a timeout for the next midnight and a fallback interval
 * (checking once per minute) to detect the date change for each time zone.
 *
 * @param timeZones - An array of IANA time zone strings (e.g., 'Asia/Taipei').
 * @param callback - A function to call when midnight is reached in a specific time zone.
 *                   The time zone string is passed as the only argument.
 * @returns A cleanup function that cancels all scheduled timeouts and intervals.
 */
export const scheduleMultiMidnightUpdates = (
	timeZones: string[],
	callback: (tz: string) => void
): CleanupFn => {
	const cleanups = timeZones.map((tz) => scheduleMidnightUpdate(tz, callback));
	return () => cleanups.forEach((fn) => fn());
};

/**
 * A utility object for managing the access token in localStorage or sessionStorage
 * based on environment and "remember me" preference.
 *
 * - In development (`localhost`), tokens are stored in either `localStorage` or `sessionStorage`.
 * - In production (HTTPS), access tokens are assumed to be handled via HttpOnly cookies and not stored here.
 */
export const tokenStorage = {
	/**
	 * Retrieves the access token from localStorage or sessionStorage (if running on localhost).
	 * Returns `null` in production since cookies are used.
	 *
	 * @returns {string | null} The access token, or null if not found or in HTTPS.
	 */
	get: (): string | null => {
		if (window.location.hostname === 'localhost') {
			return localStorage.getItem(ACCESS_KEY) || sessionStorage.getItem(ACCESS_KEY);
		}
		return null; // cookies handled by browser
	},

	/**
	 * Stores the access token in localStorage or sessionStorage depending on the "remember me" option.
	 * Does nothing in production (HTTPS) as the server should set the token via a cookie.
	 *
	 * @param {string} token - The access token to store.
	 * @param {boolean} [rememberMe] - If true, uses localStorage; otherwise, uses sessionStorage.
	 */
	set: (token: string, rememberMe?: boolean) => {
		if (window.location.hostname === 'localhost') {
			const storage = rememberMe ? localStorage : sessionStorage;
			storage.setItem(ACCESS_KEY, token);
		}
		// skip for https – token should come via Set-Cookie
	},

	/**
	 * Clears the access token from both localStorage and sessionStorage.
	 * Used when logging out or clearing session data.
	 */
	clear: () => {
		localStorage.removeItem(ACCESS_KEY);
		sessionStorage.removeItem(ACCESS_KEY);
	},
};

/**
 * Safely extracts a human-readable message from an unknown error.
 *
 * @param error - The thrown value from a `try-catch` block
 * @returns A string representing the error message
 */
export const getErrorMessage = (error: unknown): string => {
	if (error instanceof Error) {
		return error.message;
	}
	if (typeof error === 'string') {
		return error;
	}
	return 'An unknown error occurred';
};
