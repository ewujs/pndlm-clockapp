/** @jsxImportSource @emotion/react */
import React from 'react';
import type { IdentifierInputProps } from '@/types/commonTypes';
import {
	formFieldWrapperStyle,
	labelStyle,
	inputBaseStyle,
	inputTabletStyle,
	inputDesktopStyle,
} from '@/styles/loginPageStyles';

/**
 * Renders the input field for the login identifier (email, phone number, or username).
 *
 * @component
 * @param {IdentifierInputProps} props - The props for the identifier input field.
 * @param {string} props.identifier - The current identifier value entered by the user.
 * @param {(v: string) => void} props.setIdentifier - Function to update the identifier state.
 * @param {boolean} props.loading - Whether the form is in a loading state (disables input).
 * @returns {React.ReactElement} The rendered identifier input field component.
 */
const LoginIdentifierField = ({
	identifier,
	setIdentifier,
	loading
}: IdentifierInputProps): React.ReactElement => {
	return (
		<div css={formFieldWrapperStyle}>
			<label css={labelStyle} htmlFor="identifier">Email, Phone or Username</label>
			<input
				css={[inputBaseStyle, inputTabletStyle, inputDesktopStyle]}
				id="identifier"
				value={identifier}
				onChange={(e) => setIdentifier(e.target.value)}
				required
				disabled={loading}
			/>
		</div>
	);
};

export default LoginIdentifierField;
