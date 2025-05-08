/** @jsxImportSource @emotion/react */
import { useState, useRef, useEffect, useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '@/redux/storeHooks';
import type { AppRootState } from '@/redux/store';
import { setClcokFace, setMode } from '@/redux/themeReducer';
import useAnimationTimer from '@/hooks/useAnimationTimer';
import { ThemeMode, ClockFace } from '@/types/themeTypes';
import { CLOCK_FACE_OPTIONS } from '@/config/clocksConfig';
import MenuToggle from './MenuToggle';
import { backdropStyle, floatingWrapperStyle, floatingMainButtonStyle, optionButtonStyle } from '@/styles/clocksPageStyles';
import { useDeviceType } from '@/rwd';

/**
 * Rendera a floating button with a hamburger or close icon and a set of options to select the clock face mode.
 * The component animates open/close actions and handles clicks outside the menu to close it.
 *
 * @returns {React.ReactElement} - A JSX element that renders the floating menu with clock face options.
 */
const FloatingCollapseSelector = (): React.ReactElement => {
	const dispatch = useAppDispatch();
	const { clockFace } = useAppSelector((state: AppRootState) => state.theme);
	const [open, setOpen] = useState(false);
	const [isAnimating, startAnimation] = useAnimationTimer(500);
	const wrapperRef = useRef<HTMLDivElement>(null);
	const isDesktop = useDeviceType() === 'desktop';

	const toggleOpen = () => {
		if (isDesktop) return;
		startAnimation();
		setOpen(prev => !prev);
	};

	const closeMenu = useCallback(() => {
		if (isDesktop) return;
		startAnimation();
		setOpen(false);
	}, [isDesktop, startAnimation]);

	useEffect(() => {
		const handleClickOutside = (e: MouseEvent) => {
			if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
				closeMenu();
			}
		};
		if (open) {
			document.addEventListener('mousedown', handleClickOutside);
		}
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [open, closeMenu]);

	const handleOptionClick = (label: string) => {
		const mode = label === 'luxury' ? 'luxury' : 'light';
		dispatch(setMode(mode as ThemeMode));
		dispatch(setClcokFace(label as ClockFace));
		closeMenu();
	};

	return (
		<>
			{!isDesktop && <div css={backdropStyle(open)} />}
			<div css={floatingWrapperStyle(isDesktop)} ref={wrapperRef}>
				{!isDesktop && (
					<button css={floatingMainButtonStyle} onClick={toggleOpen}>
						<MenuToggle isOpen={open} />
					</button>
				)}
				{(isDesktop || open || isAnimating) && CLOCK_FACE_OPTIONS.map((option, index) => {
					const delay = open
						? index * 100 // opening: 0ms, 100ms, 200ms, 300ms...
						: (CLOCK_FACE_OPTIONS.length - 1 - index) * 100; // closing: 300ms, 200ms, 100ms, 0ms
					const isActive = clockFace === option.label;

					return (
						<button
							key={option.label}
							css={optionButtonStyle(index, open, isAnimating, delay, isActive)}
							onClick={() => handleOptionClick(option.label)}
							title={option.label}
							aria-label={option.label}
						>
							{option.emoji}
						</button>
					);
				})}
			</div>
		</>
	);
};

export default FloatingCollapseSelector;
