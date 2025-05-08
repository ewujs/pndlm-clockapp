import BackgroundEllipses from '@/components/BackgroundEllipses';
import ThemeSlideButton from '@/components/buttons/ThemeSlideButton';
import ClocksGrid from '@/layouts/clocks/ClocksGrid';

/**
 * Layout wrapper for the clocks page.
 * Includes decorative background ellipses, a theme toggle button, and a responsive grid layout.
 * 
 * @component
 * @param {React.HTMLAttributes<HTMLDivElement>} props - Standard HTML div attributes.
 * @returns {React.ReactElement} The composed layout with children rendered in a grid.
 */
const ClocksLayout = ({ children }: React.HTMLAttributes<HTMLDivElement>): React.ReactElement => {
	return (
		<>
			<BackgroundEllipses />
			<ThemeSlideButton />
			<ClocksGrid>
				{children}
			</ClocksGrid>
		</>
	);
};

export default ClocksLayout;
