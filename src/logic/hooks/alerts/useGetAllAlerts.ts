/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery } from '@tanstack/react-query';
import alertsService from '../../services/alerts.service';
import { useSelector } from 'react-redux';
import { RootState } from 'src/logic/redux/store';
import mock from '../../../utils/mocks/trips.mock.json';

interface AlertsQuery {
  [key: string]: any;
}

const useGetAllTrips = (query: AlertsQuery) => {
  const isOffline = useSelector((state: RootState) => state.offline.offline);

  return useQuery({
    queryKey: ['alerts', query],
    queryFn: async () => {
        const data = [];
        
        const alerts_by_trip = isOffline ? mock : await alertsService.getAllAlertsByTrips(query);
        
        data.push(...alerts_by_trip.data);

        const alerts = isOffline ? mock : await alertsService.getAllAlerts(query);

        data.push(...alerts.data);
        
        return data;
    },
    staleTime: 5000,
    retry: (failureCount) => {
      return failureCount < 0;
    },
  });
};

export default useGetAllTrips;
