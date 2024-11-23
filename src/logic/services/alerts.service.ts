import { usersApi } from "../../config/axiosConfig";

const baseURL = '/alerts';

const alertsService = {
  getAllAlertsByTrips: async (query: Record<string, any>) => {
    try {
      const params = new URLSearchParams(query).toString();
      const response = await usersApi.get(baseURL +`/trips?${params}`);

      return response.data
    } catch (error: any) {
      if (error.response) {
        throw new Error(error.response.data.message);
      }

      throw error;
    }
  },

  getAllAlerts: async (query: Record<string, any>) => {
    try {
      const params = new URLSearchParams(query).toString();
      const response = await usersApi.get(`/alerts?${params}`);

      return response.data
    } catch (error: any) {
      if (error.response) {
        throw new Error(error.response.data.message);
      }

      throw error;
    }
  },
};

export default alertsService;
