import ClockItem from '@/components/clock/ClockItem';
import LogoutSection from './LogoutButtonSection';

/**
 * Renders all clock-related items inside the grid.
 * Includes clocks for Las Vegas and Taipei, and the logout button section.
 * 
 * @component
 * @returns {React.ReactElement} The rendered clock items section.
 */
const ClocksItems = (): React.ReactElement => {
	return (
		<>
			<ClockItem city="lv" />
			<ClockItem city="tpe" />
			<LogoutSection />
		</>
	);
};

export default ClocksItems;
