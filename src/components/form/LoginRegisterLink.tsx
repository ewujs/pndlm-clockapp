/** @jsxImportSource @emotion/react */
import {
	registerTextStyle,
	registerTextTabletStyle,
	registerTextMobileLandscapeStyle,
	registerTextUltraSmallStyle,
} from '@/styles/loginPageStyles';

/**
 * A paragraph element displaying a link to register for a new account.
 * Currently shows a "coming soon" alert when the link is clicked.
 *
 * @component
 * @returns {React.ReactElement} A styled paragraph with a "Register" call-to-action.
 */
const LoginRegisterLink = (): React.ReactElement => (
	<p
		css={[
			registerTextStyle,
			registerTextTabletStyle,
			registerTextMobileLandscapeStyle,
			registerTextUltraSmallStyle
		]}
	>
		Don't have an account? <a href="#" onClick={() => alert('coming soon')}>Register</a>
	</p>
);

export default LoginRegisterLink;
