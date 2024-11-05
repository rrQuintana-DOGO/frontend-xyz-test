/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery } from '@tanstack/react-query';
import statusService from '../../services/status.service';
import mock from '../../../utils/mocks/status.mock.json';
import { useSelector } from 'react-redux';
import { RootState } from 'src/logic/redux/store';
interface StatusQuery {
  [key: string]: any;
}

const useGetAllStatus = (query: StatusQuery) => {
  const isOffline = useSelector((state: RootState) => state.offline.offline);

  return useQuery({
    queryKey: ['status', query],
    queryFn: async () => {
      const data = isOffline ? mock : await statusService.getAllStatus(query);
      return data;
    },
    staleTime: 5000,
    retry: (failureCount) => {
      return failureCount < 0;
    },
  });
};

export default useGetAllStatus;
