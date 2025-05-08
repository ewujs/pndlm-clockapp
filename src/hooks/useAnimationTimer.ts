import { useEffect, useRef, useState } from 'react';

/**
 * Custom hook to track animation state with duration-based timeout.
 * Ensures state resets even under browser throttling via fallback polling.
 *
 * @param duration Animation duration in milliseconds
 * @returns [isAnimating, startAnimation]
 */
const useAnimationTimer = (duration: number): [boolean, () => void] => {
	const [isAnimating, setIsAnimating] = useState(false);
	const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
	const fallbackRef = useRef<ReturnType<typeof setInterval> | null>(null);
	const startTimeRef = useRef<number>(0);

	const clearTimers = () => {
		if (timeoutRef.current) clearTimeout(timeoutRef.current);
		if (fallbackRef.current) clearInterval(fallbackRef.current);
		timeoutRef.current = null;
		fallbackRef.current = null;
	};

	const startAnimation = () => {
		clearTimers();
		setIsAnimating(true);
		startTimeRef.current = Date.now();

		timeoutRef.current = setTimeout(() => {
			setIsAnimating(false);
			clearTimers();
		}, duration);

		// Fallback check in case timeout is throttled
		fallbackRef.current = setInterval(() => {
			if (Date.now() - startTimeRef.current >= duration) {
				setIsAnimating(false);
				clearTimers();
			}
		}, 100);
	};

	useEffect(() => clearTimers, []);

	return [isAnimating, startAnimation];
}

export default useAnimationTimer;
