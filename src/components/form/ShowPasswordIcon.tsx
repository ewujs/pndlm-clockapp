/** @jsxImportSource @emotion/react */
import React from 'react';
import type { EyeIconProps } from '@/types/commonTypes';
import eyeSlash from '@/assets/svg/eye-slash-regular.svg';
import eye from '@/assets/svg/eye-regular.svg';
import { eyeIconContainerStyle, eyeIconContainerTabletStyle, eyeIconStyle } from '@/styles/loginPageStyles';

/**
 * A component that toggles the visibility of the password input.
 *
 * @component
 * @param {EyeIconProps} props - The props for the component.
 * @returns {React.ReactElement} The rendered icon component.
 */
const ShowPasswordIcon = ({
	showPassword,
	toggleShowPassword
}: EyeIconProps): React.ReactElement => {
	return (
		<span css={[eyeIconContainerStyle, eyeIconContainerTabletStyle]} onClick={toggleShowPassword}>
			<img css={eyeIconStyle} src={showPassword ? eye : eyeSlash} alt='Toggle Password Visibility' />
		</span>
	);
};

export default ShowPasswordIcon;
