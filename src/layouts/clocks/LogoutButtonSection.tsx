/** @jsxImportSource @emotion/react */
import { logoutButtonContainerStyle, logoutButtonMobileLandscapeStyle } from '@/styles/clocksPageStyles';
import { useAppDispatch } from '@/redux/storeHooks';
import { logoutUser } from '@/redux/authReducer';
import LogoutButton from '@/components/buttons/LogoutButton';

/**
 * A layout component that renders the logout button
 * within a styled container. It handles dispatching the `logoutUser` action
 * when the button is clicked.
 *
 * @component
 * @returns {React.ReactElement} A styled section containing the Logout button.
 */
const LogoutButtonSection = (): React.ReactElement => {
	const dispatch = useAppDispatch();
	return (
		<div css={[logoutButtonContainerStyle, logoutButtonMobileLandscapeStyle]}>
			<LogoutButton type="button" onClick={() => dispatch(logoutUser())} />
		</div>
	);
};

export default LogoutButtonSection;
