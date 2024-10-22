/* eslint-disable @typescript-eslint/no-explicit-any */
import axiosInstance from '../../config/axiosConfig';

const baseURL = '/status';

interface Status {
  id_status: string,
  name: string,
  status: boolean
}

const statusService = {
  getStatus: async (query: Record<string, any>) => {
    try {
      const params = new URLSearchParams(query).toString();
      const response = await axiosInstance.get(`/status?${params}`);
      return response.data
    } catch (error) {
      console.error('Error getting status:', error);
      throw error;
    }
  },

  async createStatus(statusData: Partial<Status>): Promise<Status> {
    try {
      const response = await axiosInstance.post<Status>(baseURL, statusData);
      return response.data;
    } catch (error) {
      console.error('Error creating status:', error);
      throw error;
    }
  },

  async updateStatus(id: string, statusData: Partial<Status>): Promise<Status> {
    try {
      const response = await axiosInstance.put<Status>(`${baseURL}/${id}`, statusData);
      return response.data;
    } catch (error) {
      console.error('Error updating status:', error);
      throw error;
    }
  },

  async deleteStatus(id: string): Promise<void> {
    try {
      await axiosInstance.delete(`${baseURL}/${id}`);
    } catch (error) {
      console.error('Error deleting status:', error);
      throw error;
    }
  },
};

export default statusService;
