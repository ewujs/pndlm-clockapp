/** @jsxImportSource @emotion/react */
import React from 'react';
import type { EllipseProps } from '@/types/commonTypes';
import { ellipseStyle } from '@/styles/loginPageStyles';

/**
 * Renders a responsive ellipse shape using absolute positioning
 * based on viewport width (`vw`) units and an aspect ratio.
 *
 * @component
 * @param {EllipseProps} props - The props for the Ellipse component.
 * @param {number} props.widthVW - The width of the ellipse in `vw` units.
 * @param {number} props.aspectRatio - The aspect ratio of the ellipse (width / height).
 * @param {number} props.topVW - The top offset in `vw` units.
 * @param {number} props.leftVW - The left offset in `vw` units.
 *
 * @returns {React.ReactElement} The rendered ellipse.
 */
const Ellipse = ({
	widthVW,
	aspectRatio,
	topVW,
	leftVW
}: EllipseProps): React.ReactElement => {
	return (
		<div css={ellipseStyle({ widthVW, aspectRatio, topVW, leftVW })} />
	);
};

export default Ellipse;
