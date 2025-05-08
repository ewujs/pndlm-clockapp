/**
 * Extended fetch options for making HTTP requests.
 * Inherits from the standard `RequestInit` interface and allows optional headers.
 *
 * @property headers - Optional headers to include with the request.
 */
export interface FetchOptions extends RequestInit {
	headers?: HeadersInit;
}

/**
 * Props for a custom Button component.
 *
 * Extends the native `HTMLButtonElement` attributes to allow for standard button behavior,
 * and includes a `loading` flag to indicate submission state.
 */
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	loading?: boolean;
}

/** 
 * Define the props for the Ellipse component.
 * All values are based on viewport width (vw) units to allow responsive positioning and sizing.
 */
export interface EllipseProps {
	widthVW: number;
	aspectRatio: number; // Aspect ratio used to calculate height (width / aspectRatio)
	topVW: number;
	leftVW: number;
}

/**
 * Props for the Grid component.
 */
export interface GridProps {
	children: React.ReactNode; // The content to be rendered inside the grid layout
}

/**
 * Props for the Identifier input field used in the login form.
 * This input allows users to enter their email, phone number, or username.
 */
export interface IdentifierInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
	identifier: string;
	setIdentifier: (v: string) => void;
	loading: boolean;
}

/**
 * Props for the password input field component.
 */
export interface PasswordFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
	password: string;
	setPassword: (v: string) => void;
	showPassword: boolean;
	setShowPassword: (v: boolean) => void;
	loading: boolean;
}

/**
 * Props for the EyeIcon component.
 */
export interface EyeIconProps {
	showPassword: boolean;
	toggleShowPassword: () => void;
}
