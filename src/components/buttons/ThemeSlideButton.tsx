/** @jsxImportSource @emotion/react */
import React from 'react';
import { useAppDispatch, useAppSelector } from '@/redux/storeHooks';
import type { AppRootState } from '@/redux/store';
import { toggleMode } from '@/redux/themeReducer';
import { slideButtonWrapperStyle, getSliderStyle, getKnobStyle } from '@/styles/clocksPageStyles';
import SunIcon from '@/components/icons/SunIcon';
import MoonIcon from '@/components/icons/MoonIcon';

/**
 * An UI control that allows users to toggle between light and dark themes for the clock.
 * It retrieves the current theme mode from the Redux store and dispatches a `toggleMode` action on click.
 *
 * @component
 * @returns {React.ReactElement} A styled button component that toggles the theme.
 */
const ThemeSlideButton = (): React.ReactElement => {
	const dispatch = useAppDispatch();
	const { mode } = useAppSelector((state: AppRootState) => state.theme);
	const isDark = mode === 'dark';
	const disabled = mode === 'luxury';

	const handleToggle = () => {
		dispatch(toggleMode());
	};

	return (
		<label css={slideButtonWrapperStyle(disabled)}>
			<input
				type="checkbox"
				checked={isDark}
				onChange={handleToggle}
				aria-label="Toggle Theme"
				disabled={disabled}
			/>
			<span className='slider' css={getSliderStyle(isDark)}>
				<span className="icon moon"><MoonIcon /></span>
				<span className="icon sun"><SunIcon /></span>
				<span className="knob" css={getKnobStyle(isDark)}/>
			</span>
		</label>
	);
};

export default ThemeSlideButton;
