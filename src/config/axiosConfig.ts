import axios from 'axios';
import { envs } from './envs';

export const usersApi = axios.create({
  baseURL: envs.usersApiBaseUrl,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoiZXlKaGJHY2lPaUprYVhJaUxDSmxibU1pT2lKQk1qVTJSME5OSW4wLi5SMHhCM1FOV2hkQzRlZHk4LlVqUmZOaTI5ZDRBNGZHdF9HQ0haWXJqa2ZGOU5wdl9NVXAyQ1p4RG41YVVBaGZpeHhrUlhSTm5sazNDTjkydndfdjFnc0U4UVBTQ3FGWlZ6Mk4tQWt1SVlFZWxtLUEuYlRzQ25SUmMzVGg2OXhEVEV4VUxQZyIsImlhdCI6MTczMjMxODI3OH0.TzDB2BwTCWilkJgQAvNzE5j5-J76C_i11858DK__znA`,
    'Access-Control-Allow-Origin': '*',
  },
});

export const adminsApi = axios.create({
  baseURL: envs.adminApiBaseUrl,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});