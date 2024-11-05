/* eslint-disable @typescript-eslint/no-explicit-any */

import { adminsApi, usersApi } from "../../config/axiosConfig";
import { Client } from "../../utils/interfaces/ClientInterface";

const baseURL = '/clients';

const USERS_clientService = {
  getAllClients: async (query: Record<string, any>) => {
    try {
      const params = new URLSearchParams(query).toString();
      const response = await usersApi.get(`${baseURL}?${params}`);
      return response.data
    } catch (error) {
      console.error('Error getting client:', error);
      throw error;
    }
  },

  async createClient(clientData: Partial<Client>): Promise<Client> {
    try {
      const response = await usersApi.post<Client>(baseURL, clientData);
      return response.data;
    } catch (error) {
      console.error('Error creating client:', error);
      throw error;
    }
  },

  async updateClient(id: string, clientData: Partial<Client>): Promise<Client> {
    try {
      const response = await usersApi.put<Client>(`${baseURL}/${id}`, clientData);
      return response.data;
    } catch (error) {
      console.error('Error updating client:', error);
      throw error;
    }
  },

  async deleteClient(id: string): Promise<void> {
    try {
      await usersApi.delete(`${baseURL}/${id}`);
    } catch (error) {
      console.error('Error deleting client:', error);
      throw error;
    }
  },
};

const ADMON_clientService = {
  getAllClients: async (query: Record<string, any>) => {
    try {
      const params = new URLSearchParams(query).toString();
      const response = await adminsApi.get(`${baseURL}?${params}`);
      return response.data
    } catch (error: any) {
      if (error.response) {
        throw new Error(error.response.data.message);
      }

      throw error;
    }
  },

  async createClient(clientData: Partial<Client>): Promise<Client> {
    try {
      const response = await adminsApi.post<Client>(baseURL, clientData);
      return response.data;
    } catch (error: any) {
      if (error.response) {
        throw new Error(error.response.data.message);
      }

      throw error;
    }
  },

  async updateClient(id: string, clientData: Partial<Client>): Promise<Client> {
    try {
      const response = await adminsApi.put<Client>(`${baseURL}/${id}`, clientData);
      return response.data;
    } catch (error) {
      console.error('Error updating client:', error);
      throw error;
    }
  },

  async deleteClient(id: string): Promise<void> {
    try {
      await usersApi.delete(`${baseURL}/${id}`);
    } catch (error) {
      console.error('Error deleting client:', error);
      throw error;
    }
  },
};
export { USERS_clientService, ADMON_clientService };