import { useEffect, useState } from 'react';

/**
 * A custom React hook that listens to a CSS media query
 * and returns whether it currently matches the viewport.
 *
 * @param query - A valid CSS media query string (e.g. '(min-width: 768px)')
 * @returns `true` if the media query matches, otherwise `false`
 *
 * @example
 * const isWideScreen = useMediaQuery('(min-width: 1200px)');
 */
export const useMediaQuery = (query: string): boolean => {
	// Set initial state based on current match result (for SSR safety, default is false)
	const [matches, setMatches] = useState(() => {
		if (typeof window !== 'undefined' && typeof window.matchMedia === 'function') {
			return window.matchMedia(query).matches;
		}
		return false;
	});

	useEffect(() => {
		// Ensure matchMedia is available
		if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
			return;
		}

		// Create a MediaQueryList for the provided query
		const mediaQueryList = window.matchMedia(query);

		// Listener that updates the state when the query result changes
		const listener = (event: MediaQueryListEvent) => {
			setMatches(event.matches);
		};

		mediaQueryList.addEventListener('change', listener);

		// Set the initial value in case it changed since first render
		setMatches(mediaQueryList.matches);

		// Cleanup the event listener when the component unmounts or query changes
		return () => {
			mediaQueryList.removeEventListener('change', listener);
		};
	}, [query]);

	return matches;
};
