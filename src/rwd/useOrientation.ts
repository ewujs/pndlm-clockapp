import type { Orientation } from '@/types/rwdTypes';
import { useMediaQuery } from './useMediaQuery';
import { mediaQueries } from './mediaQueries';

/**
 * A hook that returns the current screen orientation.
 *
 * @returns `'portrait'` if the screen is in portrait mode, `'landscape'` otherwise.
 *
 * Uses `useMediaQuery('(orientation: portrait)')` internally.
 */
export const useOrientation = (): Orientation => {
	const isLandscape = useMediaQuery(mediaQueries.landscape);
	return isLandscape ? 'landscape' : 'portrait';
};
