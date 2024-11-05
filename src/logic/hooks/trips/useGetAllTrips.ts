/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery } from '@tanstack/react-query';
import tripsService from '../../services/trips.service';
import { useSelector } from 'react-redux';
import { RootState } from 'src/logic/redux/store';
import mock from '../../../utils/mocks/trips.mock.json';

interface TripsQuery {
  [key: string]: any;
}

const useGetAllTrips = (query: TripsQuery) => {
  const isOffline = useSelector((state: RootState) => state.offline.offline);

  return useQuery({
    queryKey: ['trips', query],
    queryFn: async () => {
      const data = isOffline ? mock : await tripsService.getAllTrips(query);
      return data;
    },
    staleTime: 5000,
    retry: (failureCount) => {
      return failureCount < 0;
    },
  });
};

export default useGetAllTrips;
