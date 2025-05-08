import { ThemeMode } from '@/types/themeTypes';

/**
 * Supported city keys for clock rendering.
 */
export type SupportedCity = 'lv' | 'tpe';

/**
 * Props for the clock components.
 *
 * @property {string} city - A supported city key (e.g., 'tpe', 'lv').
 */
export interface ClockProps {
	city: SupportedCity;
}

/**
 * Represents a single city's timezone configuration.
 */
export interface CityClockConfig {
	timeZone: string;
	label: string;
}

/**
 * Configuration object mapping supported cities to their respective
 * IANA time zone identifiers and display labels for the clock UI.
 */
export type ClockZoneConfig = {
	[key in SupportedCity]: CityClockConfig
};

/**
 * Defines the structure of the Redux clock state.
 * - `now` is a Unix timestamp.
 * - `tpe` and `lv` hold their respective timezone configs.
 * - `formattedDate` is a string representation of the date.
 */
export interface ClockState {
	[key: string]: CityClockConfig | number;
}

/**
 * Props for customizing the style of clock numerals.
 */
export interface ClockNumeralStyleProps {
	mode: ThemeMode;
	deg: number;
}

/**
 * Props for customizing the style of clock markers (hour or minute marks).
 */
export interface ClockMarkerStyleProps {
	percentage: string;
	mode: ThemeMode;
	isHourMark: boolean;
}

/**
 * Represents a mapping of time zones to their current formatted dates.
 * @example { 'Asia/Taipei': '2025-04-30', 'America/Los_Angeles': '2025-04-29' }
 */
export interface ZoneDateState {
	[tz: string]: string;
}

/**
 * A function that cleans up or cancels scheduled asynchronous operations,
 * such as timeouts or intervals.
 *
 * Typically returned by scheduling utilities to allow consumers to stop
 * background tasks or clear memory.
 */
export type CleanupFn = () => void;

/**
 * Props for the ClockDateDay component.
 */
export type ClockDateDayProps = Pick<CityClockConfig, 'timeZone'>;
