/* eslint-disable @typescript-eslint/no-explicit-any */

import { usersApi } from "../../config/axiosConfig";
import { Carrier } from "../../utils/interfaces/TripInterface";

const baseURL = '/carriers';

const carriersService = {
  getAllCarriers: async (query: Record<string, any>) => {
    try {
      const params = new URLSearchParams(query).toString();
      const response = await usersApi.get(`${baseURL}?${params}`);
      return response.data
    } catch (error) {
      console.error('Error getting carriers:', error);
      throw error;
    }
  },

  async createCarrier(carriersData: Partial<Carrier>): Promise<Carrier> {
    try {
      const response = await usersApi.post<Carrier>(baseURL, carriersData);
      return response.data;
    } catch (error) {
      console.error('Error creating carriers:', error);
      throw error;
    }
  },

  async updateCarrier(id: string, carriersData: Partial<Carrier>): Promise<Carrier> {
    try {
      const response = await usersApi.put<Carrier>(`${baseURL}/${id}`, carriersData);
      return response.data;
    } catch (error) {
      console.error('Error updating carriers:', error);
      throw error;
    }
  },

  async deleteCarrier(id: string): Promise<void> {
    try {
      await usersApi.delete(`${baseURL}/${id}`);
    } catch (error) {
      console.error('Error deleting carriers:', error);
      throw error;
    }
  },
};

export default carriersService;
