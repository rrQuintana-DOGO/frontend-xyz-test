/* eslint-disable @typescript-eslint/no-explicit-any */
import { usersApi } from "../../config/axiosConfig";

const baseURL = '/trips';

interface Trip {
  id_trip: string;
  id_ext: string;
  description: string;
}

const tripsService = {
  getAllTrips: async (query: Record<string, any>) => {
    try {
      const params = new URLSearchParams(query).toString();
      const response = await usersApi.get(`/trips?${params}`);

      return response.data
    } catch (error: any) {
      if (error.response) {
        throw new Error(error.response.data.message);
      }

      throw error;
    }
  },

  async createTrip(tripData: Partial<Trip>): Promise<Trip> {
    try {
      const response = await usersApi.post<Trip>(baseURL, tripData);
      return response.data;
    } catch (error) {
      console.error('Error creating trip:', error);
      throw error;
    }
  },

  async updateTrip(id: string, tripData: Partial<Trip>): Promise<Trip> {
    try {
      const response = await usersApi.put<Trip>(`${baseURL}/${id}`, tripData);
      return response.data;
    } catch (error) {
      console.error('Error updating trip:', error);
      throw error;
    }
  },

  async deleteTrip(id: string): Promise<void> {
    try {
      await usersApi.delete(`${baseURL}/${id}`);
    } catch (error) {
      console.error('Error deleting trip:', error);
      throw error;
    }
  },
};

export default tripsService;
