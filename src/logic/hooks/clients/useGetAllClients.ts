/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery } from '@tanstack/react-query';
import { ADMON_clientService, USERS_clientService } from '../../services/clients.service';
import mock from '../../../utils/mocks/clients-user.mock.json';
import { useSelector } from 'react-redux';
import { RootState } from 'src/logic/redux/store';

interface ClientQuery {
  [key: string]: any;
}

const useGetAllClients = (query: ClientQuery) => {
  const isOffline = useSelector((state: RootState) => state.offline.offline);

  return useQuery({
    queryKey: ['client', query],
    queryFn: async () => {
      const data = isOffline ? mock : await USERS_clientService.getAllClients(query);
      return data;
    },
    staleTime: 5000,
    retry: (failureCount) => {
      return failureCount < 0;
    },
  });
};

const useGetAllClients_ADMON = (query: ClientQuery) => {
  return useQuery({
    queryKey: ['client', query],
    queryFn: async () => {
      const data = await ADMON_clientService.getAllClients(query);
      return data;
    },
    staleTime: 5000,
    retry: (failureCount) => {
      return failureCount < 0;
    },
  });
};

export { useGetAllClients, useGetAllClients_ADMON };
