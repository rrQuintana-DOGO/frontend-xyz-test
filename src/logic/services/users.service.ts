/* eslint-disable @typescript-eslint/no-explicit-any */
import { usersApi } from "../../config/axiosConfig";

const baseURL = '/users';

const usersTypesService = {
  getAllUsers: async (query: Record<string, any>) => {
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

  createUser: async (userData: Record<string, any>) => {
    try {
      const response = await usersApi.post(`${baseURL}`, userData);

      return response.data
    } catch (error: any) {
      if (error.response) {
        throw new Error(error.response.data.message);
      }

      throw error;
    }
  }
};

export default usersTypesService;
