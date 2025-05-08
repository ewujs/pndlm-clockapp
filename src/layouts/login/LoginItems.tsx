import Logo from '@/components/Logo';
import LoginForm from '@/components/form/LoginForm';

/**
 * Encapsulates the elements displayed on the login page,
 * including the application logo and the login form.
 *
 * @returns {React.ReactElement} The logo and login form UI elements.
 */
const LoginItems = (): React.ReactElement => {
	return (
		<>
			<Logo />
			<LoginForm />
		</>
	);
};

export default LoginItems;
