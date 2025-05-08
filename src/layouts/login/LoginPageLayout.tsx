import BackgroundEllipses from '@/components/BackgroundEllipses';
import LoginGrid from './LoginGrid';

/**
 * Layout wrapper for the login page.
 * Renders the common structure for the login page, including background ellipses, a theme toggle button,
 * and the main grid structure for the login page content.
 *
 * @component
 * @param {React.ReactNode} children - The content to be rendered inside the grid.
 * @returns {React.ReactElement} The rendered layout structure for the login page.
 */
const LoginPageLayout = ({ children }: React.HTMLAttributes<HTMLDivElement>): React.ReactElement => {
	return (
		<>
			<BackgroundEllipses />
			<LoginGrid>
				{children}
			</LoginGrid>
		</>
	);
};

export default LoginPageLayout;
