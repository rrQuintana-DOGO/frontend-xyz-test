import axios from 'axios';
import { envs } from './envs';

export const usersApi = axios.create({
  baseURL: envs.usersApiBaseUrl,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const adminsApi = axios.create({
  baseURL: envs.adminApiBaseUrl,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});
