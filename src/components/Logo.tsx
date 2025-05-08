/** @jsxImportSource @emotion/react */
import React from 'react';
import { logoContainerStyle, logoStyle } from '@/styles/loginPageStyles';
import logo from '/LOGO.svg';

/**
 * Renders the Clock App logo.
 *
 * @component
 * @param {React.ImgHTMLAttributes<HTMLImageElement>} props - Standard <img> element props.
 * @returns {React.ReactElement} The rendered logo component.
 */
const Logo = ({
	...props
}: React.ImgHTMLAttributes<HTMLImageElement>): React.ReactElement => {
	return (
		<div css={logoContainerStyle}>
			<img css={logoStyle} src={logo} alt="Clock App" {...props} />
		</div>
	);
};

export default Logo;
