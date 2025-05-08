/** @jsxImportSource @emotion/react */
import React from 'react';
import { ellipsesWrapperStyle } from '@/styles/loginPageStyles';
import Ellipse from './Ellipse';

/**
 * Renders a series of layered ellipse shapes positioned absolutely within a wrapper.
 * These ellipses are intended to create a visually appealing background effect.
 *
 * @component
 * @returns {React.ReactElement} The rendered background element containing three styled Ellipse components within a wrapper.
 */
const BackgroundEllipses = (): React.ReactElement => {
	return (
		<div css={ellipsesWrapperStyle}>
			<Ellipse
				widthVW={210}
				aspectRatio={826 / 824}
				topVW={-32}
				leftVW={-81}
			/>
			<Ellipse
				widthVW={154}
				aspectRatio={605 / 604}
				topVW={-27}
				leftVW={-64}
			/>
			<Ellipse
				widthVW={94}
				aspectRatio={370 / 369}
				topVW={-14}
				leftVW={-42}
			/>
		</div>
	);
};

export default BackgroundEllipses;
