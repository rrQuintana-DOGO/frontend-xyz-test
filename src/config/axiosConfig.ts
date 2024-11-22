import axios from 'axios';
import { envs } from './envs';

export const usersApi = axios.create({
  baseURL: envs.usersApiBaseUrl,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoiZXlKaGJHY2lPaUprYVhJaUxDSmxibU1pT2lKQk1qVTJSME5OSW4wLi5FRUJEWThBVEZHUkZlcXVTLmI3ZkJkN2tKbkd0MlZIaXNEX2Vhd0MtV0k2a0VQdUQ1MlFUOVdyb191UDFxN1JGSVpRcnNFaGNpMXVmLWZqazFWclF5c3dFWlBEcDlnYjZxOE96c3FLdFUuTzl1S0ZjWXBsLXBPV0IyeVREWTZQQSIsImlhdCI6MTczMjEyNTk4N30.g9foER3nOCVci3kxSeamZ16HwlAVUU02SaNiHJIrOLI`,
  },
});

export const adminsApi = axios.create({
  baseURL: envs.adminApiBaseUrl,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});
