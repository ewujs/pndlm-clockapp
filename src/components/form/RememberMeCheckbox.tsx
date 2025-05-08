/** @jsxImportSource @emotion/react */
import React from 'react';
import { checkboxLabelStyle, checkboxInputStyle, checkmarkStyle } from '@/styles/loginPageStyles';

/**
 * A checkbox component specifically for "Remember me" functionality, 
 * which is styled and used for user authentication forms.
 * 
 * @component
 * @param {React.InputHTMLAttributes<HTMLInputElement>} props - The props for the component.
 * @returns {React.ReactElement} The rendered checkbox component.
 */
const RememberMeCheckbox = ({
	checked,
	onChange
}: React.InputHTMLAttributes<HTMLInputElement>): React.ReactElement => {
	return (
		<label css={checkboxLabelStyle}>
			<input css={checkboxInputStyle} type="checkbox" checked={checked} onChange={onChange} />
			<span css={checkmarkStyle} className="checkmark" />
			<span>Remember me for 30 days</span>
		</label>
	);
};

export default RememberMeCheckbox;
