/** @jsxImportSource @emotion/react */
import React from 'react';
import { buttonBaseStyle } from '@/styles/loginPageStyles';
import { defaultTheme } from '@/style';

/**
 * A reusable button component that supports styling and theming.
 *
 * This button uses Emotion CSS-in-JS for styling and accepts all native
 * HTML button attributes.
 *
 * @component
 * @returns {React.ReactElement} The rendered button component.
 */
const Button = ({
	type = 'submit',
	onClick,
	disabled,
	children,
}: React.ButtonHTMLAttributes<HTMLButtonElement>): React.ReactElement => {
	return (
		<button
			css={buttonBaseStyle}
			style={
				{
					'--_hover-bg': defaultTheme.colors.darkRed,
				} as React.CSSProperties
			}
			type={type}
			onClick={onClick}
			disabled={disabled}
		>
			{children}
		</button>
	);
};

export default Button;
