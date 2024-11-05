import { usersApi } from "../../config/index";

/* eslint-disable @typescript-eslint/no-explicit-any */
const baseURL = '/status';

interface Status {
  id_status: string,
  name: string,
  status: boolean
}

const statusService = {
  getAllStatus: async (query: Record<string, any>) => {
    try {
      const params = new URLSearchParams(query).toString();
      const response = await usersApi.get(`/status?${params}`);
      return response.data
    } catch (error) {
      console.error('Error getting status:', error);
      throw error;
    }
  },

  async createStatus(statusData: Partial<Status>): Promise<Status> {
    try {
      const response = await usersApi.post<Status>(baseURL, statusData);
      return response.data;
    } catch (error) {
      console.error('Error creating status:', error);
      throw error;
    }
  },

  async updateStatus(id: string, statusData: Partial<Status>): Promise<Status> {
    try {
      const response = await usersApi.put<Status>(`${baseURL}/${id}`, statusData);
      return response.data;
    } catch (error) {
      console.error('Error updating status:', error);
      throw error;
    }
  },

  async deleteStatus(id: string): Promise<void> {
    try {
      await usersApi.delete(`${baseURL}/${id}`);
    } catch (error) {
      console.error('Error deleting status:', error);
      throw error;
    }
  },
};

export default statusService;
