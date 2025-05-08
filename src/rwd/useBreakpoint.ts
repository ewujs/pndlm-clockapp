import { useMediaQuery } from './useMediaQuery';
import type { BreakpointKey } from '@/types/rwdTypes';
import { mediaQueries } from './mediaQueries';

/**
 * Returns the current active breakpoint label.
 *
 * @returns A breakpoint key: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
 *
 * Uses `matchMedia` to evaluate screen width.
 */
export const useBreakpoint = (): BreakpointKey => {
	const isXl = useMediaQuery(mediaQueries.xl);
	const isLg = useMediaQuery(mediaQueries.lg);
	const isMd = useMediaQuery(mediaQueries.md);
	const isSm = useMediaQuery(mediaQueries.sm);

	if (isXl) return 'xl';
	if (isLg) return 'lg';
	if (isMd) return 'md';
	if (isSm) return 'sm';
	return 'xs';
};
