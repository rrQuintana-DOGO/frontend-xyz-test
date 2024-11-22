/* eslint-disable @typescript-eslint/no-explicit-any */
import { usersApi } from "../../config/axiosConfig";

const baseURL = '/trip_types';

const tripTypesService = {
  getAllTripTypes: async (query: Record<string, any>) => {
    try {
      const params = new URLSearchParams(query).toString();
      const response = await usersApi.get(`${baseURL}?${params}`);

      return response.data
    } catch (error: any) {
      if (error.response) {
        throw new Error(error.response.data.message);
      }

      throw error;
    }
  },
};

export default tripTypesService;
