import React from 'react';
import Button from './Button';
import type { ButtonProps } from '@/types/commonTypes';

/**
 * Renders a styled logout button.
 *
 * @component
 * @param {ButtonProps} props - The props extending standard button attributes.
 * @param {('submit' | 'reset' | 'button')} [props.type] - The button type (defaults to 'submit' if not specified).
 * @param {() => void} [props.onClick] - Optional click handler for the logout button.
 * @returns {React.ReactElement} A button labeled "Logout".
 */
const LogoutButton = ({ type, onClick }: ButtonProps): React.ReactElement => {
	return (
		<Button type={type} onClick={onClick}>
			Logout
		</Button>
	);
};

export default LogoutButton;
