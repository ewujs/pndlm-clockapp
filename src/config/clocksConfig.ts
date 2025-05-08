import { getFormattedDate } from '@/utils';

/**
 * Static configuration for supported clock zones.
 */
export const CLOCKS_CONFIG = {
	tpe: {
		timeZone: 'Asia/Taipei',
		label: 'Taipei',
		formattedDate: getFormattedDate('Asia/Taipei', new Date()),
	},
	lv: {
		timeZone: 'America/Los_Angeles',
		label: 'Las Vegas',
		formattedDate: getFormattedDate('America/Los_Angeles', new Date()),
	},
};

/**
 * A list of available clock face options for the clock display.
 */
export const CLOCK_FACE_OPTIONS = [
	{
		label: 'minimalist',
		emoji: '🕑',
	},
	{
		label: 'classic',
		emoji: '🔢',
	},
	{
		label: 'luxury',
		emoji: '🕰️',
	},
];
