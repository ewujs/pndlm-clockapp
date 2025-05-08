/** @jsxImportSource @emotion/react */
import React from 'react';
import type { PasswordFieldProps } from '@/types/commonTypes';
import {
	formFieldWrapperStyle,
	labelStyle,
	inputBaseStyle,
	inputTabletStyle,
	inputDesktopStyle,
} from '@/styles/loginPageStyles';
import ShowPasswordIcon from './ShowPasswordIcon';

/**
 * A form field component for entering a password, with toggle visibility functionality.
 *
 * @component
 * @param {PasswordFieldProps} props - The props for the password field component.
 * @param {string} props.password - The current password value.
 * @param {(v: string) => void} props.setPassword - Callback to update the password state.
 * @param {boolean} props.showPassword - Determines whether the password is visible or hidden.
 * @param {(v: boolean) => void} props.setShowPassword - Callback to toggle password visibility.
 * @param {boolean} [props.disabled] - Optional flag to disable the input during loading or submission.
 * @returns {React.ReactElement} A styled input field with a visibility toggle for passwords.
 */
const LoginPasswordField = ({
	password,
	setPassword,
	showPassword,
	setShowPassword,
	disabled,
}: PasswordFieldProps): React.ReactElement => {
	return (
		<div css={formFieldWrapperStyle}>
			<label css={labelStyle} htmlFor='password'>Password</label>
			<input
				css={[inputBaseStyle, inputTabletStyle, inputDesktopStyle]}
				id='password'
				type={showPassword ? 'text' : 'password'}
				value={password}
				onChange={(e) => setPassword(e.target.value)}
				required
				disabled={disabled}
			/>
			<ShowPasswordIcon showPassword={showPassword} toggleShowPassword={() => setShowPassword(!showPassword)} />
		</div>
	);
};

export default LoginPasswordField;
