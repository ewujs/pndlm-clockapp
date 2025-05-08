import type { DeviceType } from '@/types/rwdTypes';
import { useMediaQuery } from './useMediaQuery';
import { mediaQueries } from './mediaQueries';

/**
 * A hook that returns the current device type based on screen width.
 *
 * @returns `'mobile'`, `'tablet'`, or `'desktop'` depending on screen size.
 *
 * Breakpoint thresholds:
 * - mobile: < 768px
 * - tablet: 768px – 1023px
 * - desktop: ≥ 1024px
 */
export const useDeviceType = (): DeviceType => {
	const isTabletOrAbove = useMediaQuery(mediaQueries.md);
	const isDesktop = useMediaQuery(mediaQueries.lg);

	if (isDesktop) return 'desktop';
	if (isTabletOrAbove) return 'tablet';
	return 'mobile';
};
