/** @jsxImportSource @emotion/react */
import React from 'react';
import { menuToggleStyle } from '@/styles/clocksPageStyles';
import CloseIcon from './icons/CloseIcon';

/**
 * Renders a span that toggles between a close icon and a hamburger menu icon based on the `isOpen` prop.
 * The `aria-hidden="true"` attribute is used to ensure that the icon does not interfere with screen readers,
 * as it serves as a visual cue only.
 * 
 * @component
 * @param {object} props - The component's props.
 * @param {boolean} props.isOpen - A boolean indicating whether the menu is open (true) or closed (false).
 * @returns {React.ReactElement} - A span element containing either a close icon (`<CloseIcon />`) or a hamburger menu icon ('☰').
 */
const MenuToggle = ({ isOpen }: { isOpen: boolean }): React.ReactElement => (
	<span
		css={menuToggleStyle(isOpen)}
		aria-hidden="true"
	>
		{isOpen ? <CloseIcon /> : '☰'}
	</span>
);

export default MenuToggle;
