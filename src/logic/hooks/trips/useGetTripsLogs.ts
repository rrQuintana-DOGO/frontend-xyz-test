/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery } from '@tanstack/react-query';
import tripsService from '../../services/trips.service';
import { useSelector } from 'react-redux';
import { RootState } from 'src/logic/redux/store';
import mock from '@utils/mocks/trip-logs.json';

interface TripsLogsQuery {
  [key: string]: any;
}

const useGetTripsLogs = (id:string, query: TripsLogsQuery) => {
  const isOffline = useSelector((state: RootState) => state.offline.offline);

  return useQuery({
    queryKey: ['tripsLogs', query],
    queryFn: async () => {
      const data = isOffline ? mock : await tripsService.getTripsLogs(id, query);
      return data;
    },
    staleTime: 5000,
    retry: (failureCount) => {
      return failureCount < 0;
    },
  });
};

export default useGetTripsLogs
