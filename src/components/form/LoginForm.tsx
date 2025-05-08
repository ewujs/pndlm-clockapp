/** @jsxImportSource @emotion/react */
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '@/redux/storeHooks';
import type { AppRootState } from '@/redux/store';
import { login } from '@/redux/authReducer';
import { detectInputType } from '@/utils';
import LoginIdentifierField from './LoginIdentifierField';
import LoginPasswordField from './LoginPasswordField';
import LoginExtras from './LoginExtras';
import LoginSubmit from './LoginSubmit';
import LoginRegisterLink from './LoginRegisterLink';
import FloatingError from '@/components/FloatingError';
import {
	formWrapperStyle,
	formMobileLandscapeStyle,
	formUltralSmallLandscapeStyle,
	formTabletStyle,
} from '@/styles/loginPageStyles';

/**
 * Handles user login functionality.
 *
 * Features:
 * - Accepts a user identifier (email, phone, or username) and password.
 * - Determines the correct field type for login based on the identifier format.
 * - Redirects the user to the `/clocks` page upon successful login.
 * - Includes a "Remember Me" toggle (currently shows a placeholder alert).
 * - Displays password visibility toggle, error messages, and a registration link.
 * 
 * Redux:
 * - Reads `loading` and `accessToken` from the `auth` slice.
 * - Dispatches the `login` thunk action with credentials and rememberMe option.
 * 
 * @component
 * @returns {React.ReactElement} A styled login form with inputs and auxiliary options.
 */
const LoginForm = (): React.ReactElement => {
	const dispatch = useAppDispatch();
	const { loading, accessToken } = useAppSelector((state: AppRootState) => state.auth);
	const navigate = useNavigate();

	const [identifier, setIdentifier] = useState('');
	const [password, setPassword] = useState('');
	const [rememberMe, setRememberMe] = useState(false);
	const [showPassword, setShowPassword] = useState(false);

	useEffect(() => {
		if (accessToken) {
			navigate('/clocks'); // Redirect to clocks page once authenticated
		}
	}, [accessToken, navigate]);

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		const inputType = detectInputType(identifier);

		// Construct credentials payload based on identifier type
		const credentials =
			inputType === 'email'
				? { email: identifier, password }
				: inputType === 'phone'
					? { phone: identifier, password }
					: { username: identifier, password };

		dispatch(login({ credentials, rememberMe })); // Dispatch login action
	};

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setRememberMe(e.target.checked);
		alert('coming soon'); // Placeholder for "remember me" behavior
	};

	return (
		<form css={[formWrapperStyle, formMobileLandscapeStyle, formUltralSmallLandscapeStyle, formTabletStyle]} onSubmit={handleSubmit}>
			<LoginIdentifierField identifier={identifier} setIdentifier={setIdentifier} loading={loading} />
			<LoginPasswordField password={password} setPassword={setPassword} showPassword={showPassword} setShowPassword={setShowPassword} loading={loading} />
			<LoginExtras checked={rememberMe} onChange={handleChange} />
			<LoginSubmit loading={loading} />
			<LoginRegisterLink />
			<FloatingError />
		</form>
	);
};

export default LoginForm;
