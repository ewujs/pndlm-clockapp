/** @jsxImportSource @emotion/react */
import React from 'react';
import useClocksInit from '@/hooks/useClocksInit';
import useZoneDateSync from '@/hooks/useZoneDateSync';
import ClocksPageLayout from '@/layouts/clocks/ClocksPageLayout';
import ClocksItems from '@/layouts/clocks/ClocksItems';
import FloatingCollapseSelector from '@/components/FloatingCollapseSelector';

/**
 * The main page component that displays two analog clocks (Las Vegas and Taipei),
 * a logout section, and a background with decorative ellipses.
 * 
 * - Initializes clock logic using the `useClocksInit` hook.
 * - Displays a theme toggle button.
 * - Arranges clock components responsively using `ClocksGrid`.
 *
 * @component
 * @returns {React.ReactElement} The rendered clocks page.
 */
const ClocksPage = (): React.ReactElement => {
	useClocksInit();
	useZoneDateSync(['Asia/Taipei', 'America/Los_Angeles']);

	return (
		<>
			<ClocksPageLayout>
				<ClocksItems />
			</ClocksPageLayout>
			<FloatingCollapseSelector />
		</>
	);
};

export default ClocksPage;
