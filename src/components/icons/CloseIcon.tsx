/** @jsxImportSource @emotion/react */
import React from 'react';

/**
 * Renders an SVG representing a close icon.
 * The icon consists of two lines crossing each other, forming an "X".
 *
 * @component
 * @returns {React.ReactElement} The rendered SVG icon element.
 */
const CloseIcon = ({ size = 24, color = 'currentColor', ...props }): React.ReactElement => {
	return (
		<svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
	);
};

export default CloseIcon;
