import { useEffect } from 'react';
import { useAppDispatch } from '@/redux/storeHooks';
import { initializeZoneDateScheduling, stopMidnightUpdater } from '@/redux/dateReducer';

/**
 * Hook to auto-sync formatted date per time zone via Redux and keep it up-to-date daily.
 * @param timeZones List of IANA time zone strings (e.g., ['Asia/Taipei', 'America/Los_Angeles'])
 */
const useZoneDateSync = (timeZones: string[]) => {
	const dispatch = useAppDispatch();

	useEffect(() => {
		initializeZoneDateScheduling(dispatch, timeZones);
		return () => {
			stopMidnightUpdater(); // clean up on unmount
		};
	}, [dispatch, timeZones]);
};

export default useZoneDateSync;
