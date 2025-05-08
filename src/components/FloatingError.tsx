/** @jsxImportSource @emotion/react */
import { errorBaseStyle, errorAnimationStyle, errorCloseButtonStyle, errorIconStyle } from '@/styles/loginPageStyles';
import { useAppDispatch, useAppSelector } from '@/redux/storeHooks';
import { showError, clearError } from '@/redux/authReducer';
import ErrorIcon from '@/components/icons/ErrorIcon';

/**
 * Renders authentication-related errors.
 *
 * This component listens to the `auth` slice of the Redux store and displays an animated
 * floating error box when an error is present. It automatically triggers `showError` on render
 * and allows the user to manually dismiss the error via a close button.
 *
 * @component
 * @returns {React.ReactElement | null} The floating error element, or `null` if no error exists.
 */
const FloatingError = (): React.ReactElement | null => {
	const dispatch = useAppDispatch();
	const { error, errorVisible } = useAppSelector((state) => state.auth);

	if (!error) return null;

	dispatch(showError());

	const handleClose = () => {
		dispatch(clearError());
	};

	return (
		<div css={[errorBaseStyle, errorAnimationStyle(errorVisible)]}>
			<span css={errorIconStyle}>
				<ErrorIcon />
			</span>
			<span>{error}</span>
			<button onClick={handleClose} css={errorCloseButtonStyle} aria-label="Dismiss error">
				×
			</button>
		</div>
	);
};

export default FloatingError;
