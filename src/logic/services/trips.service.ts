/* eslint-disable @typescript-eslint/no-explicit-any */
import axiosInstance from '../../config/axiosConfig';

const baseURL = '/trips';

interface Trip {
  id_trip: string;
  id_ext: string;
  description: string;
}

const tripsService = {
  getTrips: async (query: Record<string, any>) => {
    try {
      const params = new URLSearchParams(query).toString();
      const response = await axiosInstance.get(`/trips?${params}`);
      console.log('response', response);
      return response.data
    } catch (error) {
      console.error('Error getting trips:', error);
      throw error;
    }
  },

  async createTrip(tripData: Partial<Trip>): Promise<Trip> {
    try {
      const response = await axiosInstance.post<Trip>(baseURL, tripData);
      return response.data;
    } catch (error) {
      console.error('Error creating trip:', error);
      throw error;
    }
  },

  async updateTrip(id: string, tripData: Partial<Trip>): Promise<Trip> {
    try {
      const response = await axiosInstance.put<Trip>(`${baseURL}/${id}`, tripData);
      return response.data;
    } catch (error) {
      console.error('Error updating trip:', error);
      throw error;
    }
  },

  async deleteTrip(id: string): Promise<void> {
    try {
      await axiosInstance.delete(`${baseURL}/${id}`);
    } catch (error) {
      console.error('Error deleting trip:', error);
      throw error;
    }
  },
};

export default tripsService;
