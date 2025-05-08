import { updateClocks } from '@/redux/clockReducer';
import { useAppDispatch, useAppSelector } from '@/redux/storeHooks';
import { AppRootState } from '@/redux/store';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CLOCKS_CONFIG } from '@/config/clocksConfig';

/**
 * Custom hook to initialize clocks state and handle authentication redirection.
 * 
 * - Redirects to login if no access token is found (unauthenticated user).
 * - Dispatches initial clock data (current time and timezone info for supported cities).
 */
const useClocksInit = () => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const { accessToken } = useAppSelector((state: AppRootState) => state.auth);

	useEffect(() => {
		// Redirect to login if not authenticated
		if (!accessToken) {
			navigate('/');
		}
	}, [accessToken, navigate]);

	useEffect(() => {
		// Initialize clocks with the current timestamp and static timezone config
		dispatch(updateClocks({
			now: Date.now(),
			...CLOCKS_CONFIG,
		}));
	}, [dispatch]);
};

export default useClocksInit;
