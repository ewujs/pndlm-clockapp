/** @jsxImportSource @emotion/react */
import React from 'react';
import LoginPageLayout from '@/layouts/login/LoginPageLayout';
import LoginItems from '@/layouts/login/LoginItems';

/**
 * The main page component that renders the login screen layout,
 * including background ellipses, the logo, and the login form.
 *
 * @component
 * @returns {React.ReactElement} The rendered login page UI.
 */
const LoginPage = (): React.ReactElement => {
	return (
		<LoginPageLayout>
			<LoginItems />
		</LoginPageLayout>
	);
};

export default LoginPage;
