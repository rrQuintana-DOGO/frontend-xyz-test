/* eslint-disable @typescript-eslint/no-explicit-any */

import { usersApi } from "../../config/axiosConfig";
import { Place } from "../interfaces/TripInterface";

const baseURL = '/places';

const clientService = {
  getAllPlaces: async (query: Record<string, any>) => {
    try {
      const params = new URLSearchParams(query).toString();
      const response = await usersApi.get(`${baseURL}?${params}`);
      return response.data
    } catch (error) {
      console.error('Error getting client:', error);
      throw error;
    }
  },

  async createPlace(clientData: Partial<Place>): Promise<Place> {
    try {
      const response = await usersApi.post<Place>(baseURL, clientData);
      return response.data;
    } catch (error) {
      console.error('Error creating client:', error);
      throw error;
    }
  },

  async updatePlace(id: string, clientData: Partial<Place>): Promise<Place> {
    try {
      const response = await usersApi.put<Place>(`${baseURL}/${id}`, clientData);
      return response.data;
    } catch (error) {
      console.error('Error updating client:', error);
      throw error;
    }
  },

  async deletePlace(id: string): Promise<void> {
    try {
      await usersApi.delete(`${baseURL}/${id}`);
    } catch (error) {
      console.error('Error deleting client:', error);
      throw error;
    }
  },
};

export default clientService;
